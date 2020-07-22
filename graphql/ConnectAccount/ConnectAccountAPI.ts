import { useMutation, MutationHookOptions } from "@apollo/client";
import * as Calendar from "./connect_account";
import {
  createConnectAccountMutation,
  createConnectAccountMutationVariables,
  deleteConnectAccountMutation,
  deleteConnectAccountMutationVariables,
} from "../generated";

export const createConnectAccount = (
  options?: MutationHookOptions<
    createConnectAccountMutation,
    createConnectAccountMutationVariables
  >
) =>
  useMutation<
    createConnectAccountMutation,
    createConnectAccountMutationVariables
  >(Calendar.CREATE_CONNECT_ACCOUNT_MUTATION, options);

export const deleteConnectAccount = (
  options?: MutationHookOptions<
    deleteConnectAccountMutation,
    deleteConnectAccountMutationVariables
  >
) =>
  useMutation<
    deleteConnectAccountMutation,
    deleteConnectAccountMutationVariables
  >(Calendar.DELETE_CONNECT_ACCOUNT_MUTATION, options);
