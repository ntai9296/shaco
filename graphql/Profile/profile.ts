import { gql } from "@apollo/client";
import { SERVICE_FRAGMENT } from "../Service/service";

export const PROFILE_FRAGMENT = gql`
  fragment profileFragment on Profile {
    id
    name
    shortDescription
    about
    slug
    firstName
    lastName
    introVideoUrl
    brandColor
    currencyType
    status
    profilePhotoUrl
    coverPhotoUrl

    facebookUrl
    twitterUrl
    instagramUrl
    youtubeUrl
    twitchUrl
  }
`;

export const GET_PUBLIC_PROFILE_QUERY = gql`
  query getPublicProfileQuery($slug: String!) {
    profile(slug: $slug) {
      id
      name
      shortDescription
      about
      slug
      introVideoUrl
      brandColor
      currencyType
      status
      profilePhotoUrl
      coverPhotoUrl

      facebookUrl
      twitterUrl
      instagramUrl
      youtubeUrl
      twitchUrl

      servicesConnection {
        nodes {
          ...serviceFragment
        }
      }
    }
  }
  ${SERVICE_FRAGMENT}
`;

export const UPDATE_PROFILE = gql`
  mutation updateProfileMutation($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      profile {
        id
        name
        shortDescription
        about
        slug
        firstName
        lastName
        introVideoUrl
        brandColor
        currencyType
        status
        profilePhotoUrl
        coverPhotoUrl
      }
    }
  }
`;

export const CHECK_PROFILE_SLUG_AVAILABILITY_QUERY = gql`
  query checkProfileSlugAvailabilityQuery($slug: String!) {
    profile(slug: $slug) {
      id
    }
  }
`;
