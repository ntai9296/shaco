import { gql } from "@apollo/client";

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
          id
          name
          description
          price
          imageUrl
          introVideoUrl
          buttonText
          providableType
          providable {
            ... on VideoCallService {
              id
              duration
            }
          }
        }
      }
    }
  }
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
