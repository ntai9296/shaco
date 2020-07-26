import { useMutation, MutationHookOptions } from "@apollo/client";
import * as ServiceQuestion from "./service_question";
import {
  createServiceQuestionMutation,
  createServiceQuestionMutationVariables,
  updateServiceQuestionMutation,
  updateServiceQuestionMutationVariables,
  deleteServiceQuestionMutation,
  deleteServiceQuestionMutationVariables,
} from "../generated";

export const createServiceQuestion = (
  options?:
    | MutationHookOptions<
        createServiceQuestionMutation,
        createServiceQuestionMutationVariables
      >
    | undefined
) =>
  useMutation<
    createServiceQuestionMutation,
    createServiceQuestionMutationVariables
  >(ServiceQuestion.CREATE_SERVICE_QUESTION_MUTATION, options);

export const updateServiceQuestion = (
  options?:
    | MutationHookOptions<
        updateServiceQuestionMutation,
        updateServiceQuestionMutationVariables
      >
    | undefined
) =>
  useMutation<
    updateServiceQuestionMutation,
    updateServiceQuestionMutationVariables
  >(ServiceQuestion.UPDATE_SERVICE_QUESTION_MUTATION, options);

export const deleteServiceQuestion = (
  options?:
    | MutationHookOptions<
        deleteServiceQuestionMutation,
        deleteServiceQuestionMutationVariables
      >
    | undefined
) =>
  useMutation<
    deleteServiceQuestionMutation,
    deleteServiceQuestionMutationVariables
  >(ServiceQuestion.DELETE_SERVICE_QUESTION_MUTATION, options);
