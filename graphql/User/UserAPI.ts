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
import { GET_CURRENT_USER_BOOKINGS_QUERY } from "../Booking/booking";
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
  requestEarlyAccessMutation,
  requestEarlyAccessMutationVariables,
  exchangeOnboardingTokenMutation,
  exchangeOnboardingTokenMutationVariables,
  changeUserPasswordMutation,
  changeUserPasswordMutationVariables,
  getCurrentUserOnboardingQuery,
  updateUserMutation,
  updateUserMutationVariables,
  getCurrentUserBookingsQuery,
  getCurrentUserBookingsQueryVariables,
  getCurrentUserSimpleQuery,
  updateUserAvailabilityMutation,
  updateUserAvailabilityMutationVariables,
  getCurrentUserAvailabilityQuery,
} from "../generated";

export const getCurrentUserSimple = (
  options?: QueryHookOptions<getCurrentUserSimpleQuery>
) =>
  useQuery<getCurrentUserSimpleQuery>(
    User.GET_CURRENT_USER_SIMPLE_QUERY,
    options
  );

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

export const getCurrentUserOnboarding = (
  options?: QueryHookOptions<getCurrentUserOnboardingQuery>
) =>
  useQuery<getCurrentUserOnboardingQuery>(
    User.GET_CURRENT_USER_ONBOARDING_QUERY,
    options
  );

export const useUser = () => useQuery(User.GET_CURRENT_USER_QUERY);

export const createUser = (
  options?: MutationHookOptions<createUserMutation, createUserMutationVariables>
) =>
  useMutation<createUserMutation, createUserMutationVariables>(
    User.CREATE_USER_MUTATION,
    options
  );

export const createHostUser = () =>
  useMutation<createHostUserMutation, createHostUserMutationVariables>(
    User.CREATE_HOST_USER_MUTATION
  );
export const loginUser = () =>
  useMutation<loginUserMutation, loginUserMutationVariables>(
    User.LOGIN_USER_MUTATION
  );

export const requestEarlyAccess = (
  options?: MutationHookOptions<
    requestEarlyAccessMutation,
    requestEarlyAccessMutationVariables
  >
) =>
  useMutation<requestEarlyAccessMutation, requestEarlyAccessMutationVariables>(
    User.REQUEST_EARLY_ACCESS_MUTATION,
    options
  );

export const exchangeOnboardingToken = (
  options?: MutationHookOptions<
    exchangeOnboardingTokenMutation,
    exchangeOnboardingTokenMutationVariables
  >
) =>
  useMutation<
    exchangeOnboardingTokenMutation,
    exchangeOnboardingTokenMutationVariables
  >(User.EXCHANGE_ONBOARDING_TOKEN_MUTATION, options);

export const changeUserPassword = (
  options?: MutationHookOptions<
    changeUserPasswordMutation,
    changeUserPasswordMutationVariables
  >
) =>
  useMutation<changeUserPasswordMutation, changeUserPasswordMutationVariables>(
    User.CHANGE_USER_PASSWORD_MUTATION,
    options
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

export const updateUser = (
  options?: MutationHookOptions<updateUserMutation, updateUserMutationVariables>
) =>
  useMutation<updateUserMutation, updateUserMutationVariables>(
    User.UPDATE_USER_MUTATION,
    options
  );

export const getCurrentUserBookings = (
  options?: QueryHookOptions<
    getCurrentUserBookingsQuery,
    getCurrentUserBookingsQueryVariables
  >
) =>
  useQuery<getCurrentUserBookingsQuery, getCurrentUserBookingsQueryVariables>(
    GET_CURRENT_USER_BOOKINGS_QUERY,
    options
  );

export const updateUserAvailability = (
  options?: MutationHookOptions<
    updateUserAvailabilityMutation,
    updateUserAvailabilityMutationVariables
  >
) =>
  useMutation<
    updateUserAvailabilityMutation,
    updateUserAvailabilityMutationVariables
  >(User.UPDATE_USER_AVAILABILITY_MUTATION, options);

export const getCurrentUserAvailability = (
  options?: QueryHookOptions<getCurrentUserAvailabilityQuery>
) =>
  useQuery<getCurrentUserAvailabilityQuery>(
    User.GET_CURRENT_USER_AVAILABILITY_QUERY,
    options
  );
