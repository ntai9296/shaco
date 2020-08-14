import { useMutation, MutationHookOptions } from "@apollo/client";
import {
  UPDATE_AVAILABILITY_MUTATION,
  DELETE_AVAILABILITY_MUTATION,
  CREATE_AVAILABILITY_MUTATION,
} from "./availability";
import {
  updateAvailabilityMutation,
  updateAvailabilityMutationVariables,
  deleteAvailabilityMutation,
  deleteAvailabilityMutationVariables,
  createAvailabilityMutation,
  createAvailabilityMutationVariables,
} from "../generated";

export const updateAvailability = (
  options?: MutationHookOptions<
    updateAvailabilityMutation,
    updateAvailabilityMutationVariables
  >
) =>
  useMutation<updateAvailabilityMutation, updateAvailabilityMutationVariables>(
    UPDATE_AVAILABILITY_MUTATION,
    options
  );

export const deleteAvailability = (
  options?: MutationHookOptions<
    deleteAvailabilityMutation,
    deleteAvailabilityMutationVariables
  >
) =>
  useMutation<deleteAvailabilityMutation, deleteAvailabilityMutationVariables>(
    DELETE_AVAILABILITY_MUTATION,
    options
  );

export const createAvailability = (
  options?: MutationHookOptions<
    createAvailabilityMutation,
    createAvailabilityMutationVariables
  >
) =>
  useMutation<createAvailabilityMutation, createAvailabilityMutationVariables>(
    CREATE_AVAILABILITY_MUTATION,
    options
  );
