import {
  useQuery,
  useMutation,
  useLazyQuery,
  OperationVariables,
  QueryHookOptions,
  MutationHookOptions,
} from "@apollo/client";
import cookie from "js-cookie";
import * as User from "./user";
import {
  getCurrentUserQuery,
  createUserMutation,
  createUserMutationVariables,
  createHostUserMutation,
  createHostUserMutationVariables,
  loginUserMutation,
  loginUserMutationVariables,
  getCurrentUserProfileQuery,
  getCurrentUserCalendarEventsQuery,
  getCurrentUserCalendarEventsQueryVariables,
  resetPasswordMutation,
  resetPasswordMutationVariables,
  forgotPasswordMutation,
  forgotPasswordMutationVariables,
  getCurrentUserWithConnectAccountsQuery,
  getCurrentUserProfileServicesQuery,
} from "../generated";

export const getCurrentUser = (
  options?:
    | QueryHookOptions<getCurrentUserQuery, Record<string, any>>
    | undefined
) => useQuery<getCurrentUserQuery>(User.GET_CURRENT_USER_QUERY, options);

export const getCurrentUserLazy = (
  options?:
    | QueryHookOptions<getCurrentUserQuery, Record<string, any>>
    | undefined
) => useLazyQuery<getCurrentUserQuery>(User.GET_CURRENT_USER_QUERY, options);

export const getCurrentUserProfile = (
  options?: QueryHookOptions<getCurrentUserProfileQuery>
) =>
  useQuery<getCurrentUserProfileQuery>(
    User.GET_CURRENT_USER_PROFILE_QUERY,
    options
  );

export const getCurrentUserProfileServices = (
  options?: QueryHookOptions<getCurrentUserProfileServicesQuery>
) =>
  useQuery<getCurrentUserProfileServicesQuery>(
    User.GET_CURRENT_USER_PROFILE_SERVICES_QUERY,
    options
  );

export const useUser = () => useQuery(User.GET_CURRENT_USER_QUERY);
export const createUser = () =>
  useMutation<createUserMutation, createUserMutationVariables>(
    User.CREATE_USER_MUTATION
  );
export const createHostUser = () =>
  useMutation<createHostUserMutation, createHostUserMutationVariables>(
    User.CREATE_HOST_USER_MUTATION
  );
export const loginUser = () =>
  useMutation<loginUserMutation, loginUserMutationVariables>(
    User.LOGIN_USER_MUTATION
  );
export const logoutUser = () => {
  cookie.remove("token");
  window.location.reload();
};
export const getCurrentUserCalendarEvents = (
  variables: getCurrentUserCalendarEventsQueryVariables
) =>
  useQuery<
    getCurrentUserCalendarEventsQuery,
    getCurrentUserCalendarEventsQueryVariables
  >(User.GET_CURRENT_USER_CALENDER_EVENTS_QUERY, {
    variables,
  });
export const getCurrentUserCalendarEventsLazy = (
  variables: OperationVariables
) =>
  useLazyQuery<
    getCurrentUserCalendarEventsQuery,
    getCurrentUserCalendarEventsQueryVariables
  >(User.GET_CURRENT_USER_CALENDER_EVENTS_QUERY, variables);

export const forgotPassword = (
  options: MutationHookOptions<
    forgotPasswordMutation,
    forgotPasswordMutationVariables
  >
) =>
  useMutation<forgotPasswordMutation, forgotPasswordMutationVariables>(
    User.FORGOT_PASSWORD_MUTATION,
    options
  );

export const resetPassword = (
  options?: MutationHookOptions<
    resetPasswordMutation,
    resetPasswordMutationVariables
  >
) =>
  useMutation<resetPasswordMutation, resetPasswordMutationVariables>(
    User.RESET_PASSWORD_MUTATION,
    options
  );

export const getCurrentUserWithConnectAccounts = (
  options?: QueryHookOptions<
    getCurrentUserWithConnectAccountsQuery,
    Record<string, any>
  >
) =>
  useQuery<getCurrentUserWithConnectAccountsQuery>(
    User.GET_CURRENT_USER_WITH_CONNECT_ACCOUNTS_QUERY,
    options
  );
