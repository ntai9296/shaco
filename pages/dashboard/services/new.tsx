import React, { useState, useRef } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import Head from "next/head";
import update from "immutability-helper";
import DashboardLayout from "../../../src/common/Layout/DashboardLayout";
import * as UserAPI from "../../../graphql/User/UserAPI";
import * as S from "../../../src/Dashboard/Service/Service.styled";
import { ArrowLeft, Trash } from "react-feather";
import Select from "../../../src/common/Select";
import Input from "../../../src/common/Input";
import NumberFormatInput from "../../../src/common/NumberFormatInput";
import Textarea from "../../../src/common/Textarea";
import * as Utility from "../../../src/common/utility";
import * as ServiceAPI from "../../../graphql/Service/ServiceAPI";
import Button from "../../../src/common/Button";
import {
  ServiceProvidableTypeEnum,
  CreateServiceInput,
  ServicePricingTypeEnum,
  ServiceTypeEnum,
} from "../../../graphql/generated";
import Notification from "../../../src/common/Notification";
import { ServiceItem } from "../../../src/PublicProfile/Service/ServiceList";

const Availability = dynamic(
  () => import("../../../src/Dashboard/Service/Availability"),
  { ssr: false }
);

export default () => {
  const { data: userData, loading } = UserAPI.getCurrentUserProfileServices();
  const imageRef = useRef<any>();

  const [service, setService] = useState<CreateServiceInput>({
    profileId: "",
    name: "",
    price: 0,
    buttonText: "Select",
    imageUrl: "",
    description: "",
    pricingType: ServicePricingTypeEnum.SIMPLE,
    serviceType: ServiceTypeEnum.VIRTUAL_ONE_ON_ONE,
    providableData: {
      duration: 30,
    },
    quantity: 100,
    serviceQuestions: [],
  });
  const [errors, setErrors] = useState<string[]>([]);

  const [
    createService,
    { loading: createServiceLoading },
  ] = ServiceAPI.createService({
    onError: (error) => {
      setErrors([error.message]);
    },
    update: (cache, { data }) => {
      cache.modify({
        id: cache.identify(userData?.currentUser?.profile as any),
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
    },
    onCompleted: () => {
      if (!userData?.currentUser?.onboarded) {
        return Router.push("/onboarding?step=three");
      }
      Router.push("/dashboard/services");
    },
  });

  const onCreate = () => {
    setErrors([]);

    // Validation
    if (!service.name) {
      return setErrors(["Title is missing text"]);
    }
    if (!service.buttonText) {
      return setErrors(["Call to acton text is missing"]);
    }

    if (
      service.pricingType === ServicePricingTypeEnum.SIMPLE &&
      (service.price || 0) <= 1
    ) {
      return setErrors(["Price must be equal or greater than 1"]);
    }

    createService({
      variables: {
        input: {
          profileId: userData?.currentUser?.profile?.id as string,
          name: service.name,
          price: Math.round((service.price || 0) * 100),
          buttonText: service.buttonText,
          imageUrl: service.imageUrl,
          description: service.description,
          providableData: service.providableData,
          serviceType: service.serviceType,
          serviceQuestions: service.serviceQuestions,
          pricingType: service.pricingType,
          quantity: service.quantity,
        },
      },
    });
  };

  const onChangeService = (field: string, value: any) =>
    setService({ ...service, [field]: value });

  const onUploadImage = async () => {
    Utility.showWorkingOverlay();
    try {
      const result = await Utility.uploadToS3(imageRef?.current?.files[0]);
      onChangeService("imageUrl", result.Location);
    } finally {
      Utility.hideWorkingOverlay();
    }
  };

  if (loading) {
    return null;
  }

  const currentUser = userData?.currentUser;

  if (!currentUser) {
    Router.replace("/login");
    return null;
  }

  return (
    <DashboardLayout skipUser hideSidebar redirectOnboard={false}>
      <Head>
        <script src="https://sdk.amazonaws.com/js/aws-sdk-2.713.0.min.js"></script>
      </Head>
      <S.PageContainer>
        <S.ServiceContainer>
          <S.ServiceLeftContainer>
            <S.HeadingContainer onClick={Router.back}>
              <S.Heading>
                <ArrowLeft />
                Back
              </S.Heading>
            </S.HeadingContainer>

            <S.NewServiceContainer>
              <S.NewServiceHeaderContainer>
                <S.Step>1</S.Step>
                <span>General</span>
              </S.NewServiceHeaderContainer>
              <S.Row>
                <S.FieldGroup>
                  <Select
                    value={service.serviceType}
                    onChange={(e) =>
                      onChangeService("serviceType", e.target.value)
                    }
                    label="What kind of service are you listing?"
                  >
                    <option value={ServiceTypeEnum.SIMPLE_SUPPORT}>
                      Simple Support/Donation
                    </option>
                    <option value={ServiceTypeEnum.QUESTION_ANSWER}>
                      Answering Questions & Providing Advice
                    </option>
                    <option value={ServiceTypeEnum.VIRTUAL_ONE_ON_ONE}>
                      Virtual 1:1 Video Calls
                    </option>
                    {/* <option value={ServiceTypeEnum.VIRTUAL_GROUP_MEET_UP}>
                      Virtual Group Video Calls
                    </option> */}
                    <option value={ServiceTypeEnum.SOCIAL_MEDIA_SHOUT_OUT}>
                      Social Media & Video Shoutouts
                    </option>
                    <option value={ServiceTypeEnum.SELLING_MERCH}>
                      Selling Merch or Shipping related
                    </option>
                    <option value={ServiceTypeEnum.CUSTOMIZE_YOUR_OWN}>
                      Customize Your Own
                    </option>
                  </Select>
                </S.FieldGroup>
              </S.Row>

              <S.Row>
                <S.FieldGroup>
                  <Input
                    placeholder="E.g: 1-on-1 video call"
                    label="Service title"
                    value={service.name}
                    onChange={(e) => onChangeService("name", e.target.value)}
                  />
                </S.FieldGroup>
              </S.Row>

              <S.Row>
                <S.FieldGroup>
                  <Textarea
                    value={service.description || ""}
                    onChange={(e) =>
                      onChangeService("description", e.target.value)
                    }
                    placeholder="Optional"
                    rows={4}
                    label="Description"
                  />
                </S.FieldGroup>
              </S.Row>

              <S.Row>
                <S.FieldGroup>
                  {service.imageUrl ? (
                    <S.ServiceImageContainer src={service.imageUrl}>
                      <S.ServiceItemImageHover
                        onClick={() => imageRef.current.click()}
                      >
                        Click to change image
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
                    </S.ServiceImageContainer>
                  ) : (
                    <S.ImagePlaceholder
                      onClick={() => imageRef.current.click()}
                    >
                      <b>Service image (optional)</b>
                      <div>Recommended size: 460 by 200 pixels</div>
                    </S.ImagePlaceholder>
                  )}
                </S.FieldGroup>
                <input
                  onChange={onUploadImage}
                  accept="image/*"
                  ref={imageRef}
                  style={{ display: "none " }}
                  type="file"
                  value=""
                />
              </S.Row>

              {/* <S.Row>
                <S.FieldGroup>
                  <Input
                    value={service.buttonText || ""}
                    onChange={(e) =>
                      onChangeService("buttonText", e.target.value)
                    }
                    placeholder="E.g: Select"
                    label="Call to action text"
                  />
                </S.FieldGroup>
              </S.Row> */}
            </S.NewServiceContainer>

            <S.NewServiceContainer>
              <S.NewServiceHeaderContainer>
                <S.Step>2</S.Step>
                <span>Pricing</span>
              </S.NewServiceHeaderContainer>
              <S.Row>
                <S.FieldGroup>
                  <Select
                    onChange={(e) =>
                      onChangeService("pricingType", e.target.value)
                    }
                    value={service.pricingType}
                    label="What kind of pricing model do you want to use?"
                  >
                    <option value={ServicePricingTypeEnum.SIMPLE}>
                      Simple
                    </option>
                    <option value={ServicePricingTypeEnum.FREE}>Free</option>
                    <option value={ServicePricingTypeEnum.FLEXIBLE}>
                      Flexible (User will name their price)
                    </option>
                  </Select>
                </S.FieldGroup>
              </S.Row>

              {service.pricingType === ServicePricingTypeEnum.SIMPLE && (
                <S.Row>
                  <S.FieldGroup>
                    <NumberFormatInput
                      value={service.price || ""}
                      onValueChange={({ floatValue }) =>
                        onChangeService("price", floatValue)
                      }
                      allowNegative={false}
                      placeholder="E.g: $0.00"
                      label="Price"
                      decimalScale={2}
                      thousandSeparator
                      prefix="$"
                    />
                  </S.FieldGroup>
                </S.Row>
              )}

              {/* {[
                ServiceTypeEnum.SELLING_MERCH,
                ServiceTypeEnum.CUSTOMIZE_YOUR_OWN,
              ].includes(service.serviceType) && (
                <S.Row>
                  <S.FieldGroup>
                    <NumberFormatInput
                      value={service.quantity || ""}
                      onValueChange={({ floatValue }) =>
                        onChangeService("quantity", floatValue)
                      }
                      allowNegative={false}
                      placeholder="E.g: 100 available"
                      label="Available quantity"
                      decimalScale={0}
                      thousandSeparator
                    />
                  </S.FieldGroup>
                </S.Row>
              )} */}

              {[
                ServiceTypeEnum.VIRTUAL_ONE_ON_ONE,
                ServiceTypeEnum.VIRTUAL_GROUP_MEET_UP,
              ].includes(service.serviceType) && (
                <S.Row>
                  <S.FieldGroup>
                    <Select
                      value={service.providableData.duration}
                      onChange={(e) =>
                        onChangeService("providableData", {
                          ...service.providableData,
                          duration: parseInt(e.target.value),
                        })
                      }
                      placeholder="E.g: $0.00"
                      label="Duration"
                    >
                      <option value={15}>15 mins</option>
                      <option value={30}>30 mins</option>
                      <option value={45}>45 mins</option>
                      <option value={60}>60 mins</option>
                      <option value={90}>90 mins</option>
                      <option value={120}>120 mins</option>
                    </Select>
                  </S.FieldGroup>
                </S.Row>
              )}
            </S.NewServiceContainer>

            <S.NewServiceContainer>
              <S.NewServiceHeaderContainer>
                <S.Step>3</S.Step>
                <span>Screening Questions</span>
              </S.NewServiceHeaderContainer>

              <p>Users will answer these questions before they checkout.</p>

              <S.ScreeningQuestionList>
                <S.ScreeningQuestionItem>
                  <b>Default</b>
                  <input defaultValue="Full name & Email address" readOnly />
                </S.ScreeningQuestionItem>
                {service.serviceType === ServiceTypeEnum.VIRTUAL_ONE_ON_ONE && (
                  <S.ScreeningQuestionItem>
                    <b>Default</b>
                    <input
                      defaultValue="What would you like the call to be about?"
                      readOnly
                    />
                  </S.ScreeningQuestionItem>
                )}
                {service.serviceQuestions.map((question, qIdx) => (
                  <S.ScreeningQuestionItem key={qIdx}>
                    <b>{qIdx + 1}.</b>
                    <input
                      placeholder="Your question"
                      value={question.question}
                      onChange={(e) =>
                        onChangeService(
                          "serviceQuestions",
                          update(service.serviceQuestions, {
                            [qIdx]: {
                              question: {
                                $set: e.target.value,
                              },
                            },
                          })
                        )
                      }
                    />
                    <a
                      onClick={() =>
                        onChangeService(
                          "serviceQuestions",
                          update(service.serviceQuestions, {
                            $splice: [[qIdx, 1]],
                          })
                        )
                      }
                    >
                      <Trash size={17} />
                    </a>
                  </S.ScreeningQuestionItem>
                ))}
                <S.AddScreeningQuestion
                  onClick={() =>
                    onChangeService("serviceQuestions", [
                      ...service.serviceQuestions,
                      { question: "" },
                    ])
                  }
                >
                  Add question +
                </S.AddScreeningQuestion>
              </S.ScreeningQuestionList>
            </S.NewServiceContainer>

            {ServiceTypeEnum.VIRTUAL_ONE_ON_ONE === service.serviceType && (
              <S.NewServiceContainer>
                <S.NewServiceHeaderContainer>
                  <S.Step>4</S.Step>
                  <span>Availability</span>
                </S.NewServiceHeaderContainer>
                <p>
                  Set your available hours when people can schedule calls with
                  you.
                </p>
                <Availability />
              </S.NewServiceContainer>
            )}

            {errors.length > 0 && (
              <S.Row>
                <Notification
                  type="error"
                  onClose={() => setErrors([])}
                  notifications={errors}
                />
              </S.Row>
            )}
            <Button
              flex={false}
              isLoading={createServiceLoading}
              onClick={onCreate}
            >
              Create
            </Button>
          </S.ServiceLeftContainer>
          <S.ServiceRightContainer>
            <S.ServicePreviewContainer>
              <h3>Preview</h3>
              <ServiceItem
                previewMode
                service={{
                  id: "1",
                  name: service.name || "Service title",
                  description: service.description || "",
                  price: Math.round((service.price || 9.99) * 100),
                  buttonText: service.buttonText || "",
                  imageUrl: service.imageUrl || "",
                  introVideoUrl: "",
                  providable: service.providableData,
                  pricingType: service.pricingType,
                  serviceType: service.serviceType,
                  quantity: service.quantity || 100,
                  providableType:
                    service.serviceType === ServiceTypeEnum.VIRTUAL_ONE_ON_ONE
                      ? ServiceProvidableTypeEnum.VIDEO_CALL_SERVICE
                      : ServiceProvidableTypeEnum.GENERAL_SERVICE,
                }}
              />
            </S.ServicePreviewContainer>
          </S.ServiceRightContainer>
        </S.ServiceContainer>
      </S.PageContainer>
    </DashboardLayout>
  );
};
