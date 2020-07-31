import { gql } from "@apollo/client";
import { SERVICE_FRAGMENT } from "../Service/service";
import { PROFILE_FRAGMENT } from "../Profile/profile";

export const GET_CURRENT_USER_QUERY = gql`
  query getCurrentUserQuery {
    currentUser {
      id
      email
      roles
      timezone
      profile {
        id
        name
        firstName
        lastName
        profilePhotoUrl
        slug
        brandColor
      }
    }
  }
`;

export const GET_CURRENT_USER_WITH_CONNECT_ACCOUNTS_QUERY = gql`
  query getCurrentUserWithConnectAccountsQuery {
    currentUser {
      id
      email
      connectAccountsConnection {
        nodes {
          id
          email
          integrationType
        }
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
        ...profileFragment
      }
    }
  }
  ${PROFILE_FRAGMENT}
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
      googleCalendarEvents
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

export const RESET_PASSWORD_MUTATION = gql`
  mutation resetPasswordMutation($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      accessToken
      user {
        id
        email
        roles
      }
    }
  }
`;

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation forgotPasswordMutation($input: ForgotPasswordInput!) {
    forgotPassword(input: $input) {
      message
    }
  }
`;

export const GET_CURRENT_USER_PROFILE_SERVICES_QUERY = gql`
  query getCurrentUserProfileServicesQuery {
    currentUser {
      id
      email
      profile {
        id
        brandColor
        servicesConnection {
          nodes {
            ...serviceFragment
          }
        }
      }
    }
  }
  ${SERVICE_FRAGMENT}
`;

export const REQUEST_EARLY_ACCESS_MUTATION = gql`
  mutation requestEarlyAccessMutation($input: RequestEarlyAccessInput!) {
    requestEarlyAccess(input: $input) {
      message
    }
  }
`;
