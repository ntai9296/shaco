import {
  useQuery,
  useMutation,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
} from "@apollo/client";
import * as Profile from "./profile";
import {
  getPublicProfileQuery,
  getPublicProfileQueryVariables,
  updateProfileMutation,
  updateProfileMutationVariables,
  checkProfileSlugAvailabilityQuery,
  checkProfileSlugAvailabilityQueryVariables,
} from "../generated";

export const getPublicProfileBySlug = (slug: string) =>
  useQuery<getPublicProfileQuery, getPublicProfileQueryVariables>(
    Profile.GET_PUBLIC_PROFILE_QUERY,
    { variables: { slug } }
  );

export const checkProfileSlugAvailabilityLazy = (
  options?: QueryHookOptions<
    checkProfileSlugAvailabilityQuery,
    checkProfileSlugAvailabilityQueryVariables
  >
) =>
  useLazyQuery<
    checkProfileSlugAvailabilityQuery,
    checkProfileSlugAvailabilityQueryVariables
  >(Profile.CHECK_PROFILE_SLUG_AVAILABILITY_QUERY, options);

export const updateProfile = (
  options?: MutationHookOptions<
    updateProfileMutation,
    updateProfileMutationVariables
  >
) =>
  useMutation<updateProfileMutation, updateProfileMutationVariables>(
    Profile.UPDATE_PROFILE,
    options
  );
