import React, { useState } from "react";
import update from "immutability-helper";
import arrayMove from "array-move";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import * as S from "./ServiceList.styled";
import ServiceCard from "../../Service/ServiceCard";
import {
  serviceFragment,
  getCurrentUserProfileServicesQuery_currentUser_profile_servicesConnection_nodes,
  ServiceStatusEnum,
} from "../../../graphql/generated";
import { Move, Edit2, Share } from "react-feather";
import Switch from "../../common/Switch";
import Link from "next/link";
import { getCurrentUserProfileServices } from "../../../graphql/User/UserAPI";
import { updateService } from "../../../graphql/Service/ServiceAPI";

export default () => {
  const [services, setServices] = useState<
    getCurrentUserProfileServicesQuery_currentUser_profile_servicesConnection_nodes[]
  >([]);

  const { refetch } = getCurrentUserProfileServices({
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      const serviceItems = (data?.currentUser?.profile?.servicesConnection
        ?.nodes ||
        []) as getCurrentUserProfileServicesQuery_currentUser_profile_servicesConnection_nodes[];
      setServices(serviceItems);
    },
  });

  const [submitUpdateService] = updateService({
    onCompleted: () => {
      refetch();
    },
  });

  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    const current = services[oldIndex];
    const destination = services[newIndex];
    setServices((services) => arrayMove(services, oldIndex, newIndex));
    submitUpdateService({
      variables: {
        input: {
          serviceId: current.id,
          name: current.name || "",
          price: current.price,
          position: destination.position,
        },
      },
    });
  };

  const onUpdateService = (index: number, field: string, value: any) => {
    const newServices = update(services, {
      [index]: {
        [field]: {
          $set: value,
        },
      },
    });
    const changedService = newServices[index];
    setServices(newServices);
    submitUpdateService({
      variables: {
        input: {
          serviceId: changedService.id,
          name: changedService.name || "",
          price: changedService.price,
          [field]: value,
        },
      },
    });
  };

  return (
    <SortableList
      pressDelay={100}
      axis="xy"
      services={services}
      onSortEnd={onSortEnd}
      useDragHandle
      onUpdateService={onUpdateService}
      helperClass="sortableHelper"
    />
  );
};

const SortableList = SortableContainer(
  ({
    services,
    onUpdateService,
  }: {
    services: serviceFragment[];
    onUpdateService: (index: number, field: string, value: any) => void;
  }) => {
    return (
      <S.List>
        {services.map((service, index) => (
          <SortableItem
            key={service.id}
            index={index}
            service={service}
            onChange={(field, value) => onUpdateService(index, field, value)}
          />
        ))}
      </S.List>
    );
  }
);

const SortableItem = SortableElement(
  ({
    service,
    onChange,
  }: {
    service: serviceFragment;
    onChange: (field: string, value: any) => void;
  }) => (
    <S.ListItem>
      <ServiceCard isPreview service={service} />
      <S.ListItemPreview>
        <S.PreviewAction>
          <SortableIcon />
          {/* <Link href="/services/[serviceId]" as={`/services/${service.id}`}>
            <S.DragIcon>
              <Share size={16} />
            </S.DragIcon>
          </Link> */}
          <Link
            href="/dashboard/services/[serviceId]"
            as={`/dashboard/services/${service.id}`}
          >
            <S.EditIcon>
              <Edit2 size={16} />
            </S.EditIcon>
          </Link>
        </S.PreviewAction>
        <S.PreviewStatus>
          <Switch
            checked={service.status === ServiceStatusEnum.ACTIVE}
            onChange={() =>
              onChange(
                "status",
                service.status === ServiceStatusEnum.ACTIVE
                  ? ServiceStatusEnum.INACTIVE
                  : ServiceStatusEnum.ACTIVE
              )
            }
          />{" "}
          <div>
            {service.status === ServiceStatusEnum.ACTIVE
              ? "Active"
              : "Inactive"}
          </div>
        </S.PreviewStatus>
      </S.ListItemPreview>
    </S.ListItem>
  )
);

const SortableIcon = SortableHandle(() => (
  <S.DragIcon>
    <Move size={16} />
  </S.DragIcon>
));
