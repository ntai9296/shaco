import { useQuery, useMutation } from "@apollo/client";
import * as Profile from "./profile";
import {
  getProfileQuery,
  getProfileQueryVariables,
  updateProfileMutation,
  updateProfileMutationVariables,
} from "../generated";

export const getProfileBySlug = (slug: string) =>
  useQuery<getProfileQuery, getProfileQueryVariables>(Profile.GET_PROFILE, { variables: { slug } });
export const updateProfile = () =>
  useMutation<updateProfileMutation, updateProfileMutationVariables>(Profile.UPDATE_PROFILE);
