/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createBookingMutation
// ====================================================

export interface createBookingMutation_createBooking_booking {
  id: string;
}

export interface createBookingMutation_createBooking {
  booking: createBookingMutation_createBooking_booking | null;
}

export interface createBookingMutation {
  createBooking: createBookingMutation_createBooking | null;
}

export interface createBookingMutationVariables {
  input: CreateBookingInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getBookingConfirmationQuery
// ====================================================

export interface getBookingConfirmationQuery_node_CalendarEvent {}

export interface getBookingConfirmationQuery_node_Booking_hostProfile {
  id: string;
  name: string;
  profilePhotoUrl: string | null;
  slug: string | null;
}

export interface getBookingConfirmationQuery_node_Booking {
  id: string;
  price: number | null;
  bookingDate: any;
  userEmail: string;
  hostProfile: getBookingConfirmationQuery_node_Booking_hostProfile;
}

export type getBookingConfirmationQuery_node = getBookingConfirmationQuery_node_CalendarEvent | getBookingConfirmationQuery_node_Booking;

export interface getBookingConfirmationQuery {
  /**
   * Fetches an object given its ID.
   */
  node: getBookingConfirmationQuery_node | null;
}

export interface getBookingConfirmationQueryVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createCalendarEventMutation
// ====================================================

export interface createCalendarEventMutation_createCalendarEvent_calendarEvent {
  id: string;
  starting: any;
  ending: any;
  availability: CalendarEventAvailabilityEnum;
  integrationType: CalendarEventIntegrationTypeEnum;
  title: string | null;
}

export interface createCalendarEventMutation_createCalendarEvent {
  calendarEvent: createCalendarEventMutation_createCalendarEvent_calendarEvent | null;
}

export interface createCalendarEventMutation {
  createCalendarEvent: createCalendarEventMutation_createCalendarEvent | null;
}

export interface createCalendarEventMutationVariables {
  input: CreateCalendarEventInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateCalendarEventMutation
// ====================================================

export interface updateCalendarEventMutation_updateCalendarEvent_calendarEvent {
  id: string;
  starting: any;
  ending: any;
  availability: CalendarEventAvailabilityEnum;
  integrationType: CalendarEventIntegrationTypeEnum;
  title: string | null;
}

export interface updateCalendarEventMutation_updateCalendarEvent {
  calendarEvent: updateCalendarEventMutation_updateCalendarEvent_calendarEvent | null;
}

export interface updateCalendarEventMutation {
  updateCalendarEvent: updateCalendarEventMutation_updateCalendarEvent | null;
}

export interface updateCalendarEventMutationVariables {
  input: UpdateCalendarEventInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteCalendarEventMutation
// ====================================================

export interface deleteCalendarEventMutation_deleteCalendarEvent_calendarEvent {
  id: string;
  starting: any;
  ending: any;
  availability: CalendarEventAvailabilityEnum;
  integrationType: CalendarEventIntegrationTypeEnum;
  title: string | null;
}

export interface deleteCalendarEventMutation_deleteCalendarEvent {
  calendarEvent: deleteCalendarEventMutation_deleteCalendarEvent_calendarEvent;
}

export interface deleteCalendarEventMutation {
  deleteCalendarEvent: deleteCalendarEventMutation_deleteCalendarEvent | null;
}

export interface deleteCalendarEventMutationVariables {
  input: DeleteCalendarEventInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPublicProfileQuery
// ====================================================

export interface getPublicProfileQuery_profile_servicesConnection_nodes_providable {
  id: string;
  duration: number;
}

export interface getPublicProfileQuery_profile_servicesConnection_nodes {
  id: string;
  name: string | null;
  description: string | null;
  price: number;
  imageUrl: string | null;
  introVideoUrl: string | null;
  buttonText: string | null;
  providableType: ServiceProvidableTypeEnum;
  providable: getPublicProfileQuery_profile_servicesConnection_nodes_providable;
}

export interface getPublicProfileQuery_profile_servicesConnection {
  /**
   * A list of nodes.
   */
  nodes: (getPublicProfileQuery_profile_servicesConnection_nodes | null)[] | null;
}

export interface getPublicProfileQuery_profile {
  id: string;
  name: string;
  shortDescription: string;
  about: string;
  slug: string | null;
  introVideoUrl: string | null;
  brandColor: string | null;
  currencyType: string;
  status: number;
  profilePhotoUrl: string | null;
  coverPhotoUrl: string | null;
  facebookUrl: string | null;
  twitterUrl: string | null;
  instagramUrl: string | null;
  youtubeUrl: string | null;
  twitchUrl: string | null;
  servicesConnection: getPublicProfileQuery_profile_servicesConnection;
}

export interface getPublicProfileQuery {
  /**
   * Get profile based on slug
   */
  profile: getPublicProfileQuery_profile | null;
}

export interface getPublicProfileQueryVariables {
  slug: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateProfileMutation
// ====================================================

export interface updateProfileMutation_updateProfile_profile {
  id: string;
  name: string;
  shortDescription: string;
  about: string;
  slug: string | null;
  firstName: string;
  lastName: string;
  introVideoUrl: string | null;
  brandColor: string | null;
  currencyType: string;
  status: number;
  profilePhotoUrl: string | null;
  coverPhotoUrl: string | null;
}

export interface updateProfileMutation_updateProfile {
  profile: updateProfileMutation_updateProfile_profile | null;
}

export interface updateProfileMutation {
  updateProfile: updateProfileMutation_updateProfile | null;
}

export interface updateProfileMutationVariables {
  input: UpdateProfileInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createServiceMutation
// ====================================================

export interface createServiceMutation_createService_service_providable {
  id: string;
  duration: number;
}

export interface createServiceMutation_createService_service {
  id: string;
  name: string | null;
  imageUrl: string | null;
  introVideoUrl: string | null;
  description: string | null;
  price: number;
  buttonText: string | null;
  providableType: ServiceProvidableTypeEnum;
  providable: createServiceMutation_createService_service_providable;
}

export interface createServiceMutation_createService {
  service: createServiceMutation_createService_service | null;
}

export interface createServiceMutation {
  createService: createServiceMutation_createService | null;
}

export interface createServiceMutationVariables {
  input: CreateServiceInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateServiceMutation
// ====================================================

export interface updateServiceMutation_updateService_service_providable {
  id: string;
  duration: number;
}

export interface updateServiceMutation_updateService_service {
  id: string;
  name: string | null;
  imageUrl: string | null;
  introVideoUrl: string | null;
  description: string | null;
  price: number;
  buttonText: string | null;
  providableType: ServiceProvidableTypeEnum;
  providable: updateServiceMutation_updateService_service_providable;
}

export interface updateServiceMutation_updateService {
  service: updateServiceMutation_updateService_service | null;
}

export interface updateServiceMutation {
  updateService: updateServiceMutation_updateService | null;
}

export interface updateServiceMutationVariables {
  input: UpdateServiceInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteServiceMutation
// ====================================================

export interface deleteServiceMutation_deleteService_service_providable {
  id: string;
  duration: number;
}

export interface deleteServiceMutation_deleteService_service {
  id: string;
  name: string | null;
  imageUrl: string | null;
  introVideoUrl: string | null;
  description: string | null;
  price: number;
  buttonText: string | null;
  providableType: ServiceProvidableTypeEnum;
  providable: deleteServiceMutation_deleteService_service_providable;
}

export interface deleteServiceMutation_deleteService {
  service: deleteServiceMutation_deleteService_service | null;
}

export interface deleteServiceMutation {
  deleteService: deleteServiceMutation_deleteService | null;
}

export interface deleteServiceMutationVariables {
  input: DeleteServiceInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getServiceQuery
// ====================================================

export interface getServiceQuery_node_Booking {}

export interface getServiceQuery_node_Service_providable {
  id: string;
  duration: number;
}

export interface getServiceQuery_node_Service_serviceQuestionsConnection_nodes {
  id: string;
  question: string | null;
}

export interface getServiceQuery_node_Service_serviceQuestionsConnection {
  /**
   * A list of nodes.
   */
  nodes: (getServiceQuery_node_Service_serviceQuestionsConnection_nodes | null)[] | null;
}

export interface getServiceQuery_node_Service {
  id: string;
  name: string | null;
  imageUrl: string | null;
  introVideoUrl: string | null;
  description: string | null;
  price: number;
  buttonText: string | null;
  providableType: ServiceProvidableTypeEnum;
  providable: getServiceQuery_node_Service_providable;
  serviceQuestionsConnection: getServiceQuery_node_Service_serviceQuestionsConnection;
}

export type getServiceQuery_node = getServiceQuery_node_Booking | getServiceQuery_node_Service;

export interface getServiceQuery {
  /**
   * Fetches an object given its ID.
   */
  node: getServiceQuery_node | null;
}

export interface getServiceQueryVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getServiceAvailabilityQuery
// ====================================================

export interface getServiceAvailabilityQuery_node_Booking {}

export interface getServiceAvailabilityQuery_node_Service_profile {
  id: string;
  availabilities: any | null;
}

export interface getServiceAvailabilityQuery_node_Service {
  id: string;
  profile: getServiceAvailabilityQuery_node_Service_profile | null;
}

export type getServiceAvailabilityQuery_node = getServiceAvailabilityQuery_node_Booking | getServiceAvailabilityQuery_node_Service;

export interface getServiceAvailabilityQuery {
  /**
   * Fetches an object given its ID.
   */
  node: getServiceAvailabilityQuery_node | null;
}

export interface getServiceAvailabilityQueryVariables {
  id: string;
  atOrAfterStarting?: any | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCurrentUserQuery
// ====================================================

export interface getCurrentUserQuery_currentUser_profile {
  id: string;
  firstName: string;
  lastName: string;
  profilePhotoUrl: string | null;
}

export interface getCurrentUserQuery_currentUser {
  id: string;
  email: string;
  roles: string[];
  timezone: string;
  profile: getCurrentUserQuery_currentUser_profile | null;
}

export interface getCurrentUserQuery {
  /**
   * Get current user based on jwt token in header
   */
  currentUser: getCurrentUserQuery_currentUser | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCurrentUserProfileQuery
// ====================================================

export interface getCurrentUserProfileQuery_currentUser_profile_servicesConnection_nodes_providable {
  id: string;
  duration: number;
}

export interface getCurrentUserProfileQuery_currentUser_profile_servicesConnection_nodes {
  id: string;
  name: string | null;
  description: string | null;
  price: number;
  imageUrl: string | null;
  introVideoUrl: string | null;
  buttonText: string | null;
  providableType: ServiceProvidableTypeEnum;
  providable: getCurrentUserProfileQuery_currentUser_profile_servicesConnection_nodes_providable;
}

export interface getCurrentUserProfileQuery_currentUser_profile_servicesConnection {
  /**
   * A list of nodes.
   */
  nodes: (getCurrentUserProfileQuery_currentUser_profile_servicesConnection_nodes | null)[] | null;
}

export interface getCurrentUserProfileQuery_currentUser_profile {
  id: string;
  name: string;
  shortDescription: string;
  about: string;
  slug: string | null;
  firstName: string;
  lastName: string;
  introVideoUrl: string | null;
  brandColor: string | null;
  currencyType: string;
  status: number;
  profilePhotoUrl: string | null;
  coverPhotoUrl: string | null;
  servicesConnection: getCurrentUserProfileQuery_currentUser_profile_servicesConnection | null;
}

export interface getCurrentUserProfileQuery_currentUser {
  id: string;
  email: string;
  roles: string[];
  profile: getCurrentUserProfileQuery_currentUser_profile | null;
}

export interface getCurrentUserProfileQuery {
  /**
   * Get current user based on jwt token in header
   */
  currentUser: getCurrentUserProfileQuery_currentUser | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createUserMutation
// ====================================================

export interface createUserMutation_createUser_user {
  id: string;
  email: string;
  roles: string[];
}

export interface createUserMutation_createUser {
  /**
   * Access token to access user right away
   */
  accessToken: string | null;
  user: createUserMutation_createUser_user;
}

export interface createUserMutation {
  createUser: createUserMutation_createUser | null;
}

export interface createUserMutationVariables {
  input: CreateUserInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createHostUserMutation
// ====================================================

export interface createHostUserMutation_createHostUser_user {
  id: string;
  email: string;
  roles: string[];
}

export interface createHostUserMutation_createHostUser {
  /**
   * Access token to access user right away
   */
  accessToken: string | null;
  user: createHostUserMutation_createHostUser_user;
}

export interface createHostUserMutation {
  createHostUser: createHostUserMutation_createHostUser | null;
}

export interface createHostUserMutationVariables {
  input: CreateHostUserInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: loginUserMutation
// ====================================================

export interface loginUserMutation_loginUser_user {
  id: string;
  email: string;
  roles: string[];
}

export interface loginUserMutation_loginUser {
  accessToken: string | null;
  user: loginUserMutation_loginUser_user;
}

export interface loginUserMutation {
  loginUser: loginUserMutation_loginUser | null;
}

export interface loginUserMutationVariables {
  input: LoginUserInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCurrentUserCalendarEventsQuery
// ====================================================

export interface getCurrentUserCalendarEventsQuery_currentUser_calendarEventsConnection_edges_node {
  id: string;
  starting: any;
  ending: any;
  availability: CalendarEventAvailabilityEnum;
  integrationType: CalendarEventIntegrationTypeEnum;
  title: string | null;
}

export interface getCurrentUserCalendarEventsQuery_currentUser_calendarEventsConnection_edges {
  /**
   * The item at the end of the edge.
   */
  node: getCurrentUserCalendarEventsQuery_currentUser_calendarEventsConnection_edges_node | null;
}

export interface getCurrentUserCalendarEventsQuery_currentUser_calendarEventsConnection {
  /**
   * A list of edges.
   */
  edges: (getCurrentUserCalendarEventsQuery_currentUser_calendarEventsConnection_edges | null)[] | null;
}

export interface getCurrentUserCalendarEventsQuery_currentUser {
  id: string;
  timezone: string;
  calendarEventsConnection: getCurrentUserCalendarEventsQuery_currentUser_calendarEventsConnection;
}

export interface getCurrentUserCalendarEventsQuery {
  /**
   * Get current user based on jwt token in header
   */
  currentUser: getCurrentUserCalendarEventsQuery_currentUser | null;
}

export interface getCurrentUserCalendarEventsQueryVariables {
  beforeEnding?: any | null;
  atOrAfterStarting?: any | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: bookingFragment
// ====================================================

export interface bookingFragment {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: serviceFragment
// ====================================================

export interface serviceFragment_providable {
  id: string;
  duration: number;
}

export interface serviceFragment {
  id: string;
  name: string | null;
  imageUrl: string | null;
  introVideoUrl: string | null;
  description: string | null;
  price: number;
  buttonText: string | null;
  providableType: ServiceProvidableTypeEnum;
  providable: serviceFragment_providable;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum CalendarEventAvailabilityEnum {
  BUSY = "BUSY",
  FREE = "FREE",
}

export enum CalendarEventIntegrationTypeEnum {
  GOOGLE_CALENDAR = "GOOGLE_CALENDAR",
  INTERNAL = "INTERNAL",
}

export enum ServiceProvidableTypeEnum {
  GENERAL_SERVICE = "GENERAL_SERVICE",
  VIDEO_CALL_SERVICE = "VIDEO_CALL_SERVICE",
}

/**
 * Attributes for creating booking questions
 */
export interface BookingQuestionInput {
  question: string;
  answer: string;
  serviceQuestionId: string;
}

/**
 * Autogenerated input type of CreateBooking
 */
export interface CreateBookingInput {
  serviceId: string;
  bookingDate: any;
  tokenId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string | null;
  timezone?: string | null;
  bookingQuestions?: BookingQuestionInput[] | null;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of CreateCalendarEvent
 */
export interface CreateCalendarEventInput {
  starting: any;
  ending: any;
  availability: CalendarEventAvailabilityEnum;
  integrationType: CalendarEventIntegrationTypeEnum;
  title?: string | null;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of CreateHostUser
 */
export interface CreateHostUserInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of CreateService
 */
export interface CreateServiceInput {
  profileId: string;
  name: string;
  price: number;
  buttonText: string;
  imageUrl?: string | null;
  description?: string | null;
  providableType: ServiceProvidableTypeEnum;
  providableData: any;
  customQuestions?: string[] | null;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of CreateUser
 */
export interface CreateUserInput {
  email: string;
  password: string;
  timezone?: string | null;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of DeleteCalendarEvent
 */
export interface DeleteCalendarEventInput {
  calendarEventId: string;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of DeleteService
 */
export interface DeleteServiceInput {
  serviceId: string;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of LoginUser
 */
export interface LoginUserInput {
  email: string;
  password: string;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of UpdateCalendarEvent
 */
export interface UpdateCalendarEventInput {
  calendarEventId: string;
  starting?: any | null;
  ending?: any | null;
  availability?: CalendarEventAvailabilityEnum | null;
  integrationType?: CalendarEventIntegrationTypeEnum | null;
  title?: string | null;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of UpdateProfile
 */
export interface UpdateProfileInput {
  profileId: string;
  slug?: string | null;
  name?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  about?: string | null;
  shortDescription?: string | null;
  profilePhotoUrl?: string | null;
  coverPhotoUrl?: string | null;
  introVideoUrl?: string | null;
  brandColor?: string | null;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  twitchUrl?: string | null;
  twitterUrl?: string | null;
  youtubeUrl?: string | null;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of UpdateService
 */
export interface UpdateServiceInput {
  serviceId: string;
  name: string;
  price: number;
  buttonText: string;
  imageUrl?: string | null;
  description?: string | null;
  providableData?: any | null;
  clientMutationId?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
