import { gql } from "@apollo/client";

export const GET_CURRENT_USER_QUERY = gql`
  query getCurrentUserQuery {
    currentUser {
      id
      email
      roles
      timezone
      profile {
        id
        firstName
        lastName
        profilePhotoUrl
      }
    }
  }
`;

export const GET_CURRENT_USER_PROFILE_QUERY = gql`
  query getCurrentUserProfileQuery {
    currentUser {
      id
      email
      roles
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
        profilePhotoThumbUrl
        coverPhotoUrl
        coverPhotoThumbUrl
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
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation createUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      accessToken
      user {
        id
        email
        roles
      }
    }
  }
`;

export const CREATE_HOST_USER_MUTATION = gql`
  mutation createHostUserMutation($input: CreateHostUserInput!) {
    createHostUser(input: $input) {
      accessToken
      user {
        id
        email
        roles
      }
    }
  }
`;

export const LOGIN_USER_MUTATION = gql`
  mutation loginUserMutation($input: LoginUserInput!) {
    loginUser(input: $input) {
      accessToken
      user {
        id
        email
        roles
      }
    }
  }
`;

export const GET_CURRENT_USER_CALENDER_EVENTS_QUERY = gql`
  query getCurrentUserCalendarEventsQuery(
    $beforeEnding: DateTime
    $atOrAfterStarting: DateTime
  ) {
    currentUser {
      id
      timezone
      calendarEventsConnection(
        beforeEnding: $beforeEnding
        atOrAfterStarting: $atOrAfterStarting
      ) {
        edges {
          node {
            id
            starting
            ending
            availability
            integrationType
            title
          }
        }
      }
    }
  }
`;
