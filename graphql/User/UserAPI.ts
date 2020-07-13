import { useQuery, useMutation, useLazyQuery, OperationVariables } from "@apollo/client";
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
} from "../generated";

export const getCurrentUser = () => useQuery<getCurrentUserQuery>(User.GET_CURRENT_USER_QUERY, { ssr: false });
export const getCurrentUserProfile = () =>
  useQuery<getCurrentUserProfileQuery>(User.GET_CURRENT_USER_PROFILE_QUERY);
export const useUser = () => useQuery(User.GET_CURRENT_USER_QUERY);
export const createUser = () =>
  useMutation<createUserMutation, createUserMutationVariables>(User.CREATE_USER_MUTATION);
export const createHostUser = () =>
  useMutation<createHostUserMutation, createHostUserMutationVariables>(
    User.CREATE_HOST_USER_MUTATION,
  );
export const loginUser = () =>
  useMutation<loginUserMutation, loginUserMutationVariables>(User.LOGIN_USER_MUTATION);
export const logoutUser = () => {
  cookie.remove("token");
  window.location.reload();
};
export const getCurrentUserCalendarEvents = (
  variables: getCurrentUserCalendarEventsQueryVariables,
) =>
  useQuery<getCurrentUserCalendarEventsQuery, getCurrentUserCalendarEventsQueryVariables>(
    User.GET_CURRENT_USER_CALENDER_EVENTS_QUERY,
    {
      variables,
    },
  );
export const getCurrentUserCalendarEventsLazy = (variables: OperationVariables) =>
  useLazyQuery<getCurrentUserCalendarEventsQuery, getCurrentUserCalendarEventsQueryVariables>(
    User.GET_CURRENT_USER_CALENDER_EVENTS_QUERY,
    variables,
  );
