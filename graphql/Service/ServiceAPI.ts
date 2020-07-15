import { useMutation, MutationHookOptions } from "@apollo/client";
import * as Service from "./service";
import {
  createServiceMutation,
  createServiceMutationVariables,
  updateServiceMutation,
  updateServiceMutationVariables,
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
