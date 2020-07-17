import React, { useState, useEffect, useRef } from "react";
import _ from "lodash";
import { Edit, Plus, Trash } from "react-feather";
import * as S from "./Services.styled";
import * as UserAPI from "../../graphql/User/UserAPI";
import * as ServiceAPI from "../../graphql/Service/ServiceAPI";
import * as Utility from "../../src/common/utility";
import {
  getCurrentUserProfileQuery_currentUser_profile,
  getCurrentUserProfileQuery_currentUser_profile_servicesConnection_nodes,
  ServiceProvidableTypeEnum,
  CreateServiceInput,
  UpdateServiceInput,
} from "../../graphql/generated";
import Select from "../common/Select";
import Notification from "../common/Notification";

export default () => {
  const { data } = UserAPI.getCurrentUserProfile();

  const [profile, setProfile] = useState<
    getCurrentUserProfileQuery_currentUser_profile | undefined
  >(undefined);
  const [showAddService, setShowAddService] = useState(false);
  const [editService, setEditService] = useState<
    | getCurrentUserProfileQuery_currentUser_profile_servicesConnection_nodes
    | undefined
    | null
  >(undefined);

  useEffect(() => {
    if (data?.currentUser?.profile) {
      setProfile(data.currentUser.profile);
    }
  }, [data]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showAddService, editService]);

  if (!profile) {
    return null;
  }

  const services = profile?.servicesConnection?.nodes || [];

  return (
    <S.Body>
      {!showAddService && !editService && (
        <S.ServiceList>
          {services.map((node) => {
            if (node?.id) {
              return (
                <ServiceItem
                  onEditService={() => setEditService(node)}
                  service={node}
                  key={node?.id}
                />
              );
            }
          })}
          <S.ServicePlaceholder onClick={() => setShowAddService(true)}>
            <Plus />
            Add service
          </S.ServicePlaceholder>
        </S.ServiceList>
      )}
      {showAddService && (
        <ServiceItemForm
          profile={profile}
          onCancel={() => setShowAddService(false)}
        />
      )}
      {editService && (
        <ServiceItemForm
          profile={profile}
          onCancel={() => setEditService(undefined)}
          service={editService}
        />
      )}
    </S.Body>
  );
};

const ServiceItemForm = ({
  onCancel,
  profile,
  service: initService,
}: {
  onCancel: () => void;
  profile: getCurrentUserProfileQuery_currentUser_profile;
  service?: getCurrentUserProfileQuery_currentUser_profile_servicesConnection_nodes;
}) => {
  const imageRef = useRef<any>();
  const [
    updateService,
    { loading: updateLoading, error: updateError },
  ] = ServiceAPI.updateService({
    onCompleted: () => onCancel(),
  });

  const [
    deleteService,
    { loading: deleteLoading, error: deleteError },
  ] = ServiceAPI.deleteService({
    onCompleted: () => {
      onCancel();
    },
    update: (cache, { data }) => {
      if (data?.deleteService?.service?.id) {
        cache.modify({
          id: cache.identify(profile as any),
          fields: {
            servicesConnection(existingConnection, { readField }) {
              return {
                ...existingConnection,
                nodes: existingConnection.nodes.filter(
                  (node: any) =>
                    readField("id", node) !== data?.deleteService?.service?.id
                ),
              };
            },
          },
        });
      }
    },
  });

  const [createService, { loading, error }] = ServiceAPI.createService({
    onCompleted: () => {
      onCancel();
    },
    update: (cache, { data }) => {
      if (data?.createService?.service?.id) {
        cache.modify({
          id: cache.identify(profile as any),
          fields: {
            servicesConnection(existingConnection) {
              return {
                ...existingConnection,
                nodes: [
                  ...existingConnection.nodes,
                  data?.createService?.service,
                ],
              };
            },
          },
        });
      }
    },
  });

  const [createServiceState, setCreateServiceState] = useState<
    CreateServiceInput
  >({
    profileId: profile.id,
    providableType: ServiceProvidableTypeEnum.VIDEO_CALL_SERVICE,
    imageUrl: "",
    providableData: {
      duration: 30,
    },
    name: "",
    buttonText: "",
    price: 0,
    description: "",
  });

  const [editServiceState, setEditServiceState] = useState<UpdateServiceInput>({
    serviceId: initService?.id || "",
    imageUrl: initService?.imageUrl || "",
    providableData: {
      duration: initService?.providable?.duration || 30,
    },
    name: initService?.name || "",
    buttonText: initService?.buttonText || "",
    price: (initService?.price || 0) / 100,
    description: initService?.description || "",
  });

  const onChangeService = (field: string, value: any) =>
    initService
      ? setEditServiceState({ ...editServiceState, [field]: value })
      : setCreateServiceState({ ...createServiceState, [field]: value });

  const onSaveService = () => {
    updateService({
      variables: {
        input: {
          ...editServiceState,
          price: editServiceState.price * 100,
        },
      },
    });
  };

  const onCreateService = () => {
    createService({
      variables: {
        input: {
          ...createServiceState,
          price: createServiceState.price * 100,
        },
      },
    });
  };

  const onUploadImage = async () => {
    Utility.showWorkingOverlay();
    try {
      const result = await Utility.uploadToS3(imageRef.current.files[0]);
      onChangeService("imageUrl", result.Location);
    } catch (error) {
      console.log(error.message);
    } finally {
      Utility.hideWorkingOverlay();
    }
  };

  const service = initService ? editServiceState : createServiceState;

  return (
    <S.AddServiceItem>
      {!initService && (
        <S.ServiceItemHeader>
          <Select
            onChange={(e) => onChangeService("providableType", e.target.value)}
            value={createServiceState.providableType}
            label="Service type"
          >
            <option value={ServiceProvidableTypeEnum.GENERAL_SERVICE}>
              General
            </option>
            <option value={ServiceProvidableTypeEnum.VIDEO_CALL_SERVICE}>
              Video call
            </option>
          </Select>
        </S.ServiceItemHeader>
      )}
      <S.ServiceItem>
        <S.ServiceItemTitle>
          <S.ServiceItemTitleInput
            onChange={(e) => onChangeService("name", e.target.value)}
            value={service.name}
            placeholder="Enter service title"
          />
        </S.ServiceItemTitle>
        <S.ServiceItemImage>
          {service.imageUrl ? (
            <>
              <S.ServiceItemImageContent src={service.imageUrl} />
              <S.ServiceItemImageHover onClick={() => imageRef.current.click()}>
                Change image
                <S.DeleteImageButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onChangeService("imageUrl", "");
                  }}
                >
                  <Trash
                    width={15}
                    height={15}
                    color={Utility.Styling.dangerColor}
                  />
                </S.DeleteImageButton>
              </S.ServiceItemImageHover>
            </>
          ) : (
            <S.ServiceItemImagePlaceholder
              onClick={() => imageRef.current.click()}
            >
              Choose image
              <br />
              Recommended size: 460 by 200 pixels
            </S.ServiceItemImagePlaceholder>
          )}
          <input
            onChange={onUploadImage}
            accept="image/*"
            ref={imageRef}
            style={{ display: "none " }}
            type="file"
            value=""
          />
        </S.ServiceItemImage>
        <S.ServiceItemPricing>
          <S.ServiceItemCost>
            <S.ServiceItemCostInput
              allowNegative={false}
              value={service.price || ""}
              onValueChange={({ floatValue }: any) =>
                onChangeService("price", floatValue || 0)
              }
              prefix="$"
              thousandSeparator
              placeholder="Enter price"
              decimalScale={2}
            />
          </S.ServiceItemCost>
          <S.ServiceItemDuration>
            Duration:
            <S.ServiceItemDurationSelect
              onChange={(e) =>
                onChangeService("providableData", {
                  ...service.providableData,
                  duration: e.target.value,
                })
              }
              value={service.providableData.duration}
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={45}>45 minutes</option>
              <option value={60}>60 minutes</option>
            </S.ServiceItemDurationSelect>
          </S.ServiceItemDuration>
          <S.ServiceItemAction>
            <S.ServiceItemButton>
              <S.ServiceItemButtonTextInput
                onChange={(e) => onChangeService("buttonText", e.target.value)}
                value={service.buttonText}
                placeholder="Your button text"
              />
            </S.ServiceItemButton>
          </S.ServiceItemAction>
        </S.ServiceItemPricing>
        <S.ServiceItemDescriptionBox>
          <S.ServiceItemDescriptionTextarea
            placeholder="Enter description"
            onChange={(e) => onChangeService("description", e.target.value)}
            value={service.description || ""}
            rows={8}
          />
        </S.ServiceItemDescriptionBox>
      </S.ServiceItem>
      {error && (
        <S.ErrorMessage>
          <Notification
            notifications={error.graphQLErrors.map((e) => e.message)}
            type="error"
          />
        </S.ErrorMessage>
      )}
      {updateError && (
        <S.ErrorMessage>
          <Notification
            notifications={updateError.graphQLErrors.map((e) => e.message)}
            type="error"
          />
        </S.ErrorMessage>
      )}
      {deleteError && (
        <S.ErrorMessage>
          <Notification
            notifications={deleteError.graphQLErrors.map((e) => e.message)}
            type="error"
          />
        </S.ErrorMessage>
      )}
      <S.AddServiceItemActions>
        <div>
          {initService ? (
            <S.CreateButton onClick={onSaveService} isLoading={updateLoading}>
              Save
            </S.CreateButton>
          ) : (
            <S.CreateButton onClick={onCreateService} isLoading={loading}>
              Create
            </S.CreateButton>
          )}
          <S.CancelButton onClick={onCancel}>Cancel</S.CancelButton>
        </div>
        {initService && (
          <div>
            <S.CancelButton
              isLoading={deleteLoading}
              onClick={() =>
                deleteService({
                  variables: { input: { serviceId: initService.id } },
                })
              }
            >
              Delete
            </S.CancelButton>
          </div>
        )}
      </S.AddServiceItemActions>
    </S.AddServiceItem>
  );
};

const ServiceItem = ({
  service,
  onEditService,
}: {
  onEditService: () => void;
  service: getCurrentUserProfileQuery_currentUser_profile_servicesConnection_nodes;
}) => {
  const [showMore, setShowMore] = useState(false);
  const paragraphRef = useRef<any>(null);
  useEffect(() => {
    if (paragraphRef.current && paragraphRef.current.clientHeight > 120) {
      setShowMore(true);
    }
  }, [paragraphRef.current]);
  return (
    <S.ServiceItem>
      <S.ServiceItemType>
        <S.ServiceItemTypeEdit onClick={onEditService}>
          <Edit width={20} height={20} />
        </S.ServiceItemTypeEdit>
      </S.ServiceItemType>
      <S.ServiceItemTitle>{service.name}</S.ServiceItemTitle>
      <S.ServiceItemImage>
        {service.imageUrl && (
          <S.ServiceItemImageContent src={service.imageUrl} />
        )}
      </S.ServiceItemImage>
      <S.ServiceItemPricing>
        <S.ServiceItemCost>
          {service.price <= 0 ? "Free" : `$${service.price / 100}`}
        </S.ServiceItemCost>
        {service.providableType ===
          ServiceProvidableTypeEnum.VIDEO_CALL_SERVICE && (
          <S.ServiceItemDuration>
            Duration: {service?.providable.duration} minutes
          </S.ServiceItemDuration>
        )}
        <S.ServiceItemAction>
          <S.ServiceItemButton>
            {service.buttonText || "Go"}
          </S.ServiceItemButton>
        </S.ServiceItemAction>
      </S.ServiceItemPricing>
      {service.description && (
        <S.ServiceItemDescriptionBox maxHeight={showMore}>
          <p ref={paragraphRef}>{service.description}</p>
        </S.ServiceItemDescriptionBox>
      )}
      {showMore && (
        <S.ServiceItemDescriptionShowMore>
          <a onClick={() => setShowMore(false)}>Show more</a>
        </S.ServiceItemDescriptionShowMore>
      )}
    </S.ServiceItem>
  );
};
