import { gql } from "@apollo/client";

export const SERVICE_QUESTION_FRAGMENT = gql`
  fragment serviceQuestionFragment on ServiceQuestion {
    id
    question
    isDefault
  }
`;

export const CREATE_SERVICE_QUESTION_MUTATION = gql`
  mutation createServiceQuestionMutation($input: CreateServiceQuestionInput!) {
    createServiceQuestion(input: $input) {
      serviceQuestion {
        ...serviceQuestionFragment
      }
    }
  }
  ${SERVICE_QUESTION_FRAGMENT}
`;

export const DELETE_SERVICE_QUESTION_MUTATION = gql`
  mutation deleteServiceQuestionMutation($input: DeleteServiceQuestionInput!) {
    deleteServiceQuestion(input: $input) {
      serviceQuestion {
        ...serviceQuestionFragment
      }
    }
  }
  ${SERVICE_QUESTION_FRAGMENT}
`;

export const UPDATE_SERVICE_QUESTION_MUTATION = gql`
  mutation updateServiceQuestionMutation($input: UpdateServiceQuestionInput!) {
    updateServiceQuestion(input: $input) {
      serviceQuestion {
        ...serviceQuestionFragment
      }
    }
  }
  ${SERVICE_QUESTION_FRAGMENT}
`;
