import { gql } from "@apollo/client";

export const CREATE_CONNECT_ACCOUNT_MUTATION = gql`
  mutation createConnectAccountMutation($input: CreateConnectAccountInput!) {
    createConnectAccount(input: $input) {
      connectAccount {
        id
        email
        integrationType
      }
    }
  }
`;

export const DELETE_CONNECT_ACCOUNT_MUTATION = gql`
  mutation deleteConnectAccountMutation($input: DeleteConnectAccountInput!) {
    deleteConnectAccount(input: $input) {
      connectAccount {
        id
      }
    }
  }
`;
