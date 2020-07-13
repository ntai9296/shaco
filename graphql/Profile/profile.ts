import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
  query getProfileQuery($slug: String!) {
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
      profilePhotoThumbUrl
      coverPhotoUrl
      coverPhotoThumbUrl
      servicesConnection {
        edges {
          node {
            id
            name
            description
            price
            imageUrl
            introVideoUrl
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
        introVideoUrl
        brandColor
        currencyType
        status
        profilePhotoUrl
        profilePhotoThumbUrl
        coverPhotoUrl
        coverPhotoThumbUrl
      }
    }
  }
`;
