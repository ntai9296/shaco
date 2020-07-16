import { useQuery, useMutation } from "@apollo/client";
import * as Profile from "./profile";
import {
  getPublicProfileQuery,
  getPublicProfileQueryVariables,
  updateProfileMutation,
  updateProfileMutationVariables,
} from "../generated";

export const getPublicProfileBySlug = (slug: string) =>
  useQuery<getPublicProfileQuery, getPublicProfileQueryVariables>(
    Profile.GET_PUBLIC_PROFILE_QUERY,
    { variables: { slug } }
  );

export const updateProfile = () =>
  useMutation<updateProfileMutation, updateProfileMutationVariables>(
    Profile.UPDATE_PROFILE
  );
