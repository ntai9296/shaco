import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
  query getProfileQuery($slug: String!) {
    profile(slug: $slug) {
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
