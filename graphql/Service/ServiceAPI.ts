import { useMutation, MutationHookOptions } from "@apollo/client";
import * as Service from "./service";
import {
  createServiceMutation,
  createServiceMutationVariables,
  updateServiceMutation,
  updateServiceMutationVariables,
  deleteServiceMutation,
  deleteServiceMutationVariables,
} from "../generated";

export const createService = (
  options?:
    | MutationHookOptions<createServiceMutation, createServiceMutationVariables>
    | undefined
) =>
  useMutation<createServiceMutation, createServiceMutationVariables>(
    Service.CREATE_SERVICE_MUTATION,
    options
  );

export const updateService = (
  options?:
    | MutationHookOptions<updateServiceMutation, updateServiceMutationVariables>
    | undefined
) =>
  useMutation<updateServiceMutation, updateServiceMutationVariables>(
    Service.UPDATE_SERVICE_MUTATION,
    options
  );

export const deleteService = (
  options?:
    | MutationHookOptions<deleteServiceMutation, deleteServiceMutationVariables>
    | undefined
) =>
  useMutation<deleteServiceMutation, deleteServiceMutationVariables>(
    Service.DELETE_SERVICE_MUTATION,
    options
  );
