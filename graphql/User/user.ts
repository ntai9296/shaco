import { gql } from "@apollo/client";
import { SERVICE_FRAGMENT } from "../Service/service";
import { PROFILE_FRAGMENT } from "../Profile/profile";
import { AVAILABILITY_FRAGMENT } from "../Availability/availability";

export const BASE_DASHBOARD_USER_FRAGMENT = gql`
  fragment baseDashboardUserFragment on User {
    id
    email
    roles
    timezone
    waitlisted
    onboarded
    firstName
    lastName
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
`;

export const USER_AVAILABILITY_FRAGMENT = gql`
  fragment userAvailabilityFragment on UserAvailability {
    id
    mondayActive
    tuesdayActive
    wednesdayActive
    thursdayActive
    fridayActive
    saturdayActive
    sundayActive
    unavailableActive

    availabilitiesConnection {
      nodes {
        ...availabilityFragment
      }
    }
  }
  ${AVAILABILITY_FRAGMENT}
`;

export const GET_CURRENT_USER_SIMPLE_QUERY = gql`
  query getCurrentUserSimpleQuery {
    currentUser {
      id
      email
      roles
      timezone
      waitlisted
      onboarded
    }
  }
`;

export const GET_CURRENT_USER_QUERY = gql`
  query getCurrentUserQuery {
    currentUser {
      ...baseDashboardUserFragment
    }
  }
  ${BASE_DASHBOARD_USER_FRAGMENT}
`;

export const EXCHANGE_ONBOARDING_TOKEN_MUTATION = gql`
  mutation exchangeOnboardingTokenMutation(
    $input: ExchangeOnboardingTokenInput!
  ) {
    exchangeOnboardingToken(input: $input) {
      accessToken
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
      timezone
      onboarded
      profile {
        id
        brandColor
        servicesConnection {
          nodes {
            ...serviceFragment
          }
        }
      }
      userAvailability {
        ...userAvailabilityFragment
      }
    }
  }
  ${SERVICE_FRAGMENT}
  ${USER_AVAILABILITY_FRAGMENT}
`;

export const REQUEST_EARLY_ACCESS_MUTATION = gql`
  mutation requestEarlyAccessMutation($input: RequestEarlyAccessInput!) {
    requestEarlyAccess(input: $input) {
      message
    }
  }
`;

export const CHANGE_USER_PASSWORD_MUTATION = gql`
  mutation changeUserPasswordMutation($input: ChangeUserPasswordInput!) {
    changeUserPassword(input: $input) {
      user {
        id
      }
    }
  }
`;

export const GET_CURRENT_USER_ONBOARDING_QUERY = gql`
  query getCurrentUserOnboardingQuery {
    currentUser {
      id
      email
      roles
      guest
      onboarded
      profile {
        ...profileFragment
        servicesConnection {
          nodes {
            ...serviceFragment
          }
        }
      }
    }
  }
  ${PROFILE_FRAGMENT}
  ${SERVICE_FRAGMENT}
`;

export const UPDATE_USER_MUTATION = gql`
  mutation updateUserMutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      user {
        ...baseDashboardUserFragment
      }
    }
  }
  ${BASE_DASHBOARD_USER_FRAGMENT}
`;

export const UPDATE_USER_AVAILABILITY_MUTATION = gql`
  mutation updateUserAvailabilityMutation(
    $input: UpdateUserAvailabilityInput!
  ) {
    updateUserAvailability(input: $input) {
      userAvailability {
        ...userAvailabilityFragment
      }
    }
  }
  ${USER_AVAILABILITY_FRAGMENT}
`;

export const GET_CURRENT_USER_AVAILABILITY_QUERY = gql`
  query getCurrentUserAvailabilityQuery {
    currentUser {
      id
      timezone
      userAvailability {
        ...userAvailabilityFragment
      }
    }
  }
  ${USER_AVAILABILITY_FRAGMENT}
`;

export const GET_CURRENT_USER_STRIPE_ACCOUNT_QUERY = gql`
  query getCurrentUserStripeAccountQuery($isHost: Boolean, $sortBy: String) {
    currentUser {
      id
      email
      firstName
      lastName
      stripeAccount {
        id
        payoutsEnabled
        requirements
        chargesEnabled
        balance
        name
        automaticTransfer
        payouts {
          id
          status
          amount
          arrivalDate
          createdAt
        }
      }
      bookingCompletesConnection(isHost: $isHost, sortBy: $sortBy) {
        nodes {
          id
          status
          createdAt
          booking {
            id
            price
            payoutPrice
          }
        }
      }
    }
  }
`;

export const CURRENT_USER_AUTHORIZE_CONNECT_STRIPE_ACCOUNT_MUTATION = gql`
  mutation authorizeConnectStripeAccountMutation(
    $input: AuthorizeConnectStripeAccountInput!
  ) {
    authorizeConnectStripeAccount(input: $input) {
      stripeAccount {
        id
        payoutsEnabled
        requirements
        chargesEnabled
        balance
      }
    }
  }
`;

export const GET_CURRENT_USER_STRIPE_ACCOUNT_LOGIN_LINK_QUERY = gql`
  query getCurrentUserStripeAccountLoginLinkQuery {
    currentUser {
      id
      stripeAccount {
        id
        loginLink
      }
    }
  }
`;

export const CURRENT_USER_REQUEST_PAYOUT_MUTATION = gql`
  mutation currentUserRequestPayoutMutation($input: RequestPayoutInput!) {
    requestPayout(input: $input) {
      stripeAccount {
        id
        balance
        payouts {
          id
          status
          amount
          arrivalDate
          createdAt
        }
      }
    }
  }
`;
