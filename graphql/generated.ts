/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createBookingMutation
// ====================================================

export interface createBookingMutation_createBooking_booking {
  id: string;
  status: BookingStatusEnum;
  updatedAt: any;
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
// GraphQL mutation operation: cancelBookingMutation
// ====================================================

export interface cancelBookingMutation_cancelBooking_booking {
  id: string;
  status: BookingStatusEnum;
  updatedAt: any;
}

export interface cancelBookingMutation_cancelBooking {
  booking: cancelBookingMutation_cancelBooking_booking | null;
}

export interface cancelBookingMutation {
  cancelBooking: cancelBookingMutation_cancelBooking | null;
}

export interface cancelBookingMutationVariables {
  input: CancelBookingInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: rescheduleBookingMutation
// ====================================================

export interface rescheduleBookingMutation_rescheduleBooking_booking {
  id: string;
  status: BookingStatusEnum;
  updatedAt: any;
}

export interface rescheduleBookingMutation_rescheduleBooking {
  booking: rescheduleBookingMutation_rescheduleBooking_booking | null;
}

export interface rescheduleBookingMutation {
  rescheduleBooking: rescheduleBookingMutation_rescheduleBooking | null;
}

export interface rescheduleBookingMutationVariables {
  input: RescheduleBookingInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getBookingConfirmationQuery
// ====================================================

export interface getBookingConfirmationQuery_node_BookingComplete {}

export interface getBookingConfirmationQuery_node_Booking_providable {
  id: string;
  duration: number;
}

export interface getBookingConfirmationQuery_node_Booking_hostProfile {
  id: string;
  name: string;
  profilePhotoUrl: string | null;
  slug: string | null;
}

export interface getBookingConfirmationQuery_node_Booking_service {
  id: string;
  name: string | null;
  imageUrl: string | null;
  description: string | null;
}

export interface getBookingConfirmationQuery_node_Booking {
  id: string;
  status: BookingStatusEnum;
  updatedAt: any;
  price: number;
  bookingDate: any;
  userEmail: string;
  providableType: string | null;
  providable: getBookingConfirmationQuery_node_Booking_providable | null;
  hostProfile: getBookingConfirmationQuery_node_Booking_hostProfile;
  service: getBookingConfirmationQuery_node_Booking_service | null;
}

export type getBookingConfirmationQuery_node = getBookingConfirmationQuery_node_BookingComplete | getBookingConfirmationQuery_node_Booking;

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
// GraphQL query operation: getBookingRescheduleQuery
// ====================================================

export interface getBookingRescheduleQuery_node_BookingComplete {}

export interface getBookingRescheduleQuery_node_Booking_providable {
  id: string;
  duration: number;
}

export interface getBookingRescheduleQuery_node_Booking_hostProfile {
  id: string;
  name: string;
  profilePhotoUrl: string | null;
  slug: string | null;
  availabilities: any | null;
}

export interface getBookingRescheduleQuery_node_Booking_service_providable_GeneralService {}

export interface getBookingRescheduleQuery_node_Booking_service_providable_VideoCallService {
  id: string;
  duration: number;
}

export type getBookingRescheduleQuery_node_Booking_service_providable = getBookingRescheduleQuery_node_Booking_service_providable_GeneralService | getBookingRescheduleQuery_node_Booking_service_providable_VideoCallService;

export interface getBookingRescheduleQuery_node_Booking_service {
  id: string;
  providable: getBookingRescheduleQuery_node_Booking_service_providable | null;
}

export interface getBookingRescheduleQuery_node_Booking {
  id: string;
  status: BookingStatusEnum;
  updatedAt: any;
  price: number;
  bookingDate: any;
  userEmail: string;
  providableType: string | null;
  providable: getBookingRescheduleQuery_node_Booking_providable | null;
  hostProfile: getBookingRescheduleQuery_node_Booking_hostProfile;
  service: getBookingRescheduleQuery_node_Booking_service | null;
}

export type getBookingRescheduleQuery_node = getBookingRescheduleQuery_node_BookingComplete | getBookingRescheduleQuery_node_Booking;

export interface getBookingRescheduleQuery {
  /**
   * Fetches an object given its ID.
   */
  node: getBookingRescheduleQuery_node | null;
}

export interface getBookingRescheduleQueryVariables {
  id: string;
  atOrAfterStarting?: any | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCurrentUserBookingsQuery
// ====================================================

export interface getCurrentUserBookingsQuery_currentUser_bookingsConnection_nodes_providable {
  id: string;
  duration: number;
}

export interface getCurrentUserBookingsQuery_currentUser_bookingsConnection_nodes_bookingQuestionsConnection_nodes {
  id: string;
  question: string;
  answer: string;
}

export interface getCurrentUserBookingsQuery_currentUser_bookingsConnection_nodes_bookingQuestionsConnection {
  /**
   * A list of nodes.
   */
  nodes: (getCurrentUserBookingsQuery_currentUser_bookingsConnection_nodes_bookingQuestionsConnection_nodes | null)[] | null;
}

export interface getCurrentUserBookingsQuery_currentUser_bookingsConnection_nodes_service {
  id: string;
  name: string | null;
  serviceType: ServiceTypeEnum;
}

export interface getCurrentUserBookingsQuery_currentUser_bookingsConnection_nodes_bookingComplete {
  id: string;
  message: string;
  attachments: string[];
}

export interface getCurrentUserBookingsQuery_currentUser_bookingsConnection_nodes {
  id: string;
  status: BookingStatusEnum;
  updatedAt: any;
  price: number;
  bookingDate: any;
  userEmail: string;
  userFullName: string;
  providableType: string | null;
  providable: getCurrentUserBookingsQuery_currentUser_bookingsConnection_nodes_providable | null;
  bookingQuestionsConnection: getCurrentUserBookingsQuery_currentUser_bookingsConnection_nodes_bookingQuestionsConnection;
  service: getCurrentUserBookingsQuery_currentUser_bookingsConnection_nodes_service | null;
  bookingComplete: getCurrentUserBookingsQuery_currentUser_bookingsConnection_nodes_bookingComplete | null;
}

export interface getCurrentUserBookingsQuery_currentUser_bookingsConnection {
  /**
   * A list of nodes.
   */
  nodes: (getCurrentUserBookingsQuery_currentUser_bookingsConnection_nodes | null)[] | null;
}

export interface getCurrentUserBookingsQuery_currentUser {
  id: string;
  bookingsConnection: getCurrentUserBookingsQuery_currentUser_bookingsConnection;
}

export interface getCurrentUserBookingsQuery {
  /**
   * Get current user based on jwt token in header
   */
  currentUser: getCurrentUserBookingsQuery_currentUser | null;
}

export interface getCurrentUserBookingsQueryVariables {
  isHost?: boolean | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getHostBookingQuery
// ====================================================

export interface getHostBookingQuery_node_BookingComplete {}

export interface getHostBookingQuery_node_Booking_providable {
  id: string;
  duration: number;
}

export interface getHostBookingQuery_node_Booking_bookingQuestionsConnection_nodes {
  id: string;
  question: string;
  answer: string;
}

export interface getHostBookingQuery_node_Booking_bookingQuestionsConnection {
  /**
   * A list of nodes.
   */
  nodes: (getHostBookingQuery_node_Booking_bookingQuestionsConnection_nodes | null)[] | null;
}

export interface getHostBookingQuery_node_Booking_service {
  id: string;
  name: string | null;
  serviceType: ServiceTypeEnum;
}

export interface getHostBookingQuery_node_Booking_bookingComplete {
  id: string;
  message: string;
  attachments: string[];
}

export interface getHostBookingQuery_node_Booking {
  id: string;
  status: BookingStatusEnum;
  updatedAt: any;
  price: number;
  bookingDate: any;
  userEmail: string;
  userFullName: string;
  providableType: string | null;
  providable: getHostBookingQuery_node_Booking_providable | null;
  bookingQuestionsConnection: getHostBookingQuery_node_Booking_bookingQuestionsConnection;
  service: getHostBookingQuery_node_Booking_service | null;
  bookingComplete: getHostBookingQuery_node_Booking_bookingComplete | null;
}

export type getHostBookingQuery_node = getHostBookingQuery_node_BookingComplete | getHostBookingQuery_node_Booking;

export interface getHostBookingQuery {
  /**
   * Fetches an object given its ID.
   */
  node: getHostBookingQuery_node | null;
}

export interface getHostBookingQueryVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getHostBookingZoomStartUrlQuery
// ====================================================

export interface getHostBookingZoomStartUrlQuery_node_BookingComplete {}

export interface getHostBookingZoomStartUrlQuery_node_Booking_providable {
  id: string;
  duration: number;
  zoomStartUrl: string;
}

export interface getHostBookingZoomStartUrlQuery_node_Booking {
  id: string;
  status: BookingStatusEnum;
  updatedAt: any;
  providable: getHostBookingZoomStartUrlQuery_node_Booking_providable | null;
}

export type getHostBookingZoomStartUrlQuery_node = getHostBookingZoomStartUrlQuery_node_BookingComplete | getHostBookingZoomStartUrlQuery_node_Booking;

export interface getHostBookingZoomStartUrlQuery {
  /**
   * Fetches an object given its ID.
   */
  node: getHostBookingZoomStartUrlQuery_node | null;
}

export interface getHostBookingZoomStartUrlQueryVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: requestRescheduleBookingMutation
// ====================================================

export interface requestRescheduleBookingMutation_requestRescheduleBooking_booking_providable {
  id: string;
  duration: number;
}

export interface requestRescheduleBookingMutation_requestRescheduleBooking_booking_bookingQuestionsConnection_nodes {
  id: string;
  question: string;
  answer: string;
}

export interface requestRescheduleBookingMutation_requestRescheduleBooking_booking_bookingQuestionsConnection {
  /**
   * A list of nodes.
   */
  nodes: (requestRescheduleBookingMutation_requestRescheduleBooking_booking_bookingQuestionsConnection_nodes | null)[] | null;
}

export interface requestRescheduleBookingMutation_requestRescheduleBooking_booking_service {
  id: string;
  name: string | null;
  serviceType: ServiceTypeEnum;
}

export interface requestRescheduleBookingMutation_requestRescheduleBooking_booking_bookingComplete {
  id: string;
  message: string;
  attachments: string[];
}

export interface requestRescheduleBookingMutation_requestRescheduleBooking_booking {
  id: string;
  status: BookingStatusEnum;
  updatedAt: any;
  price: number;
  bookingDate: any;
  userEmail: string;
  userFullName: string;
  providableType: string | null;
  providable: requestRescheduleBookingMutation_requestRescheduleBooking_booking_providable | null;
  bookingQuestionsConnection: requestRescheduleBookingMutation_requestRescheduleBooking_booking_bookingQuestionsConnection;
  service: requestRescheduleBookingMutation_requestRescheduleBooking_booking_service | null;
  bookingComplete: requestRescheduleBookingMutation_requestRescheduleBooking_booking_bookingComplete | null;
}

export interface requestRescheduleBookingMutation_requestRescheduleBooking {
  booking: requestRescheduleBookingMutation_requestRescheduleBooking_booking | null;
}

export interface requestRescheduleBookingMutation {
  requestRescheduleBooking: requestRescheduleBookingMutation_requestRescheduleBooking | null;
}

export interface requestRescheduleBookingMutationVariables {
  input: RequestRescheduleBookingInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createBookingCompleteMutation
// ====================================================

export interface createBookingCompleteMutation_createBookingComplete_booking_providable {
  id: string;
  duration: number;
}

export interface createBookingCompleteMutation_createBookingComplete_booking_bookingQuestionsConnection_nodes {
  id: string;
  question: string;
  answer: string;
}

export interface createBookingCompleteMutation_createBookingComplete_booking_bookingQuestionsConnection {
  /**
   * A list of nodes.
   */
  nodes: (createBookingCompleteMutation_createBookingComplete_booking_bookingQuestionsConnection_nodes | null)[] | null;
}

export interface createBookingCompleteMutation_createBookingComplete_booking_service {
  id: string;
  name: string | null;
  serviceType: ServiceTypeEnum;
}

export interface createBookingCompleteMutation_createBookingComplete_booking_bookingComplete {
  id: string;
  message: string;
  attachments: string[];
}

export interface createBookingCompleteMutation_createBookingComplete_booking {
  id: string;
  status: BookingStatusEnum;
  updatedAt: any;
  price: number;
  bookingDate: any;
  userEmail: string;
  userFullName: string;
  providableType: string | null;
  providable: createBookingCompleteMutation_createBookingComplete_booking_providable | null;
  bookingQuestionsConnection: createBookingCompleteMutation_createBookingComplete_booking_bookingQuestionsConnection;
  service: createBookingCompleteMutation_createBookingComplete_booking_service | null;
  bookingComplete: createBookingCompleteMutation_createBookingComplete_booking_bookingComplete | null;
}

export interface createBookingCompleteMutation_createBookingComplete_bookingComplete {
  id: string;
  message: string;
  attachments: string[];
}

export interface createBookingCompleteMutation_createBookingComplete {
  booking: createBookingCompleteMutation_createBookingComplete_booking | null;
  bookingComplete: createBookingCompleteMutation_createBookingComplete_bookingComplete | null;
}

export interface createBookingCompleteMutation {
  createBookingComplete: createBookingCompleteMutation_createBookingComplete | null;
}

export interface createBookingCompleteMutationVariables {
  input: CreateBookingCompleteInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getBookingCompleteQuery
// ====================================================

export interface getBookingCompleteQuery_node_Booking {}

export interface getBookingCompleteQuery_node_BookingComplete_booking_service {
  id: string;
  name: string | null;
  imageUrl: string | null;
}

export interface getBookingCompleteQuery_node_BookingComplete_booking_hostProfile {
  id: string;
  name: string;
  profilePhotoUrl: string | null;
}

export interface getBookingCompleteQuery_node_BookingComplete_booking {
  id: string;
  service: getBookingCompleteQuery_node_BookingComplete_booking_service | null;
  hostProfile: getBookingCompleteQuery_node_BookingComplete_booking_hostProfile;
}

export interface getBookingCompleteQuery_node_BookingComplete {
  id: string;
  message: string;
  attachments: string[];
  booking: getBookingCompleteQuery_node_BookingComplete_booking | null;
}

export type getBookingCompleteQuery_node = getBookingCompleteQuery_node_Booking | getBookingCompleteQuery_node_BookingComplete;

export interface getBookingCompleteQuery {
  /**
   * Fetches an object given its ID.
   */
  node: getBookingCompleteQuery_node | null;
}

export interface getBookingCompleteQueryVariables {
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
// GraphQL mutation operation: createConnectAccountMutation
// ====================================================

export interface createConnectAccountMutation_createConnectAccount_connectAccount {
  id: string;
  email: string | null;
  integrationType: ConnectAccountIntegrationTypeEnum;
}

export interface createConnectAccountMutation_createConnectAccount {
  connectAccount: createConnectAccountMutation_createConnectAccount_connectAccount | null;
}

export interface createConnectAccountMutation {
  createConnectAccount: createConnectAccountMutation_createConnectAccount | null;
}

export interface createConnectAccountMutationVariables {
  input: CreateConnectAccountInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteConnectAccountMutation
// ====================================================

export interface deleteConnectAccountMutation_deleteConnectAccount_connectAccount {
  id: string;
}

export interface deleteConnectAccountMutation_deleteConnectAccount {
  connectAccount: deleteConnectAccountMutation_deleteConnectAccount_connectAccount | null;
}

export interface deleteConnectAccountMutation {
  deleteConnectAccount: deleteConnectAccountMutation_deleteConnectAccount | null;
}

export interface deleteConnectAccountMutationVariables {
  input: DeleteConnectAccountInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPublicProfileQuery
// ====================================================

export interface getPublicProfileQuery_profile_servicesConnection_nodes_providable_VideoCallService {
  id: string;
  duration: number;
}

export interface getPublicProfileQuery_profile_servicesConnection_nodes_providable_GeneralService {
  id: string;
}

export type getPublicProfileQuery_profile_servicesConnection_nodes_providable = getPublicProfileQuery_profile_servicesConnection_nodes_providable_VideoCallService | getPublicProfileQuery_profile_servicesConnection_nodes_providable_GeneralService;

export interface getPublicProfileQuery_profile_servicesConnection_nodes {
  id: string;
  name: string | null;
  imageUrl: string | null;
  introVideoUrl: string | null;
  description: string | null;
  price: number;
  buttonText: string | null;
  quantity: number;
  providableType: ServiceProvidableTypeEnum | null;
  serviceType: ServiceTypeEnum;
  pricingType: ServicePricingTypeEnum;
  providable: getPublicProfileQuery_profile_servicesConnection_nodes_providable | null;
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
// GraphQL query operation: checkProfileSlugAvailabilityQuery
// ====================================================

export interface checkProfileSlugAvailabilityQuery_profile {
  id: string;
}

export interface checkProfileSlugAvailabilityQuery {
  /**
   * Get profile based on slug
   */
  profile: checkProfileSlugAvailabilityQuery_profile | null;
}

export interface checkProfileSlugAvailabilityQueryVariables {
  slug: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createServiceMutation
// ====================================================

export interface createServiceMutation_createService_service_providable_VideoCallService {
  id: string;
  duration: number;
}

export interface createServiceMutation_createService_service_providable_GeneralService {
  id: string;
}

export type createServiceMutation_createService_service_providable = createServiceMutation_createService_service_providable_VideoCallService | createServiceMutation_createService_service_providable_GeneralService;

export interface createServiceMutation_createService_service {
  id: string;
  name: string | null;
  imageUrl: string | null;
  introVideoUrl: string | null;
  description: string | null;
  price: number;
  buttonText: string | null;
  quantity: number;
  providableType: ServiceProvidableTypeEnum | null;
  serviceType: ServiceTypeEnum;
  pricingType: ServicePricingTypeEnum;
  providable: createServiceMutation_createService_service_providable | null;
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

export interface updateServiceMutation_updateService_service_providable_VideoCallService {
  id: string;
  duration: number;
}

export interface updateServiceMutation_updateService_service_providable_GeneralService {
  id: string;
}

export type updateServiceMutation_updateService_service_providable = updateServiceMutation_updateService_service_providable_VideoCallService | updateServiceMutation_updateService_service_providable_GeneralService;

export interface updateServiceMutation_updateService_service {
  id: string;
  name: string | null;
  imageUrl: string | null;
  introVideoUrl: string | null;
  description: string | null;
  price: number;
  buttonText: string | null;
  quantity: number;
  providableType: ServiceProvidableTypeEnum | null;
  serviceType: ServiceTypeEnum;
  pricingType: ServicePricingTypeEnum;
  providable: updateServiceMutation_updateService_service_providable | null;
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

export interface deleteServiceMutation_deleteService_service {
  id: string;
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

export interface getServiceQuery_node_Service_providable_VideoCallService {
  id: string;
  duration: number;
}

export interface getServiceQuery_node_Service_providable_GeneralService {
  id: string;
}

export type getServiceQuery_node_Service_providable = getServiceQuery_node_Service_providable_VideoCallService | getServiceQuery_node_Service_providable_GeneralService;

export interface getServiceQuery_node_Service_serviceQuestionsConnection_nodes {
  id: string;
  question: string | null;
  isDefault: number;
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
  quantity: number;
  providableType: ServiceProvidableTypeEnum | null;
  serviceType: ServiceTypeEnum;
  pricingType: ServicePricingTypeEnum;
  providable: getServiceQuery_node_Service_providable | null;
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
// GraphQL mutation operation: createServiceQuestionMutation
// ====================================================

export interface createServiceQuestionMutation_createServiceQuestion_serviceQuestion {
  id: string;
  question: string | null;
  isDefault: number;
}

export interface createServiceQuestionMutation_createServiceQuestion {
  serviceQuestion: createServiceQuestionMutation_createServiceQuestion_serviceQuestion | null;
}

export interface createServiceQuestionMutation {
  createServiceQuestion: createServiceQuestionMutation_createServiceQuestion | null;
}

export interface createServiceQuestionMutationVariables {
  input: CreateServiceQuestionInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteServiceQuestionMutation
// ====================================================

export interface deleteServiceQuestionMutation_deleteServiceQuestion_serviceQuestion {
  id: string;
  question: string | null;
  isDefault: number;
}

export interface deleteServiceQuestionMutation_deleteServiceQuestion {
  serviceQuestion: deleteServiceQuestionMutation_deleteServiceQuestion_serviceQuestion | null;
}

export interface deleteServiceQuestionMutation {
  deleteServiceQuestion: deleteServiceQuestionMutation_deleteServiceQuestion | null;
}

export interface deleteServiceQuestionMutationVariables {
  input: DeleteServiceQuestionInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateServiceQuestionMutation
// ====================================================

export interface updateServiceQuestionMutation_updateServiceQuestion_serviceQuestion {
  id: string;
  question: string | null;
  isDefault: number;
}

export interface updateServiceQuestionMutation_updateServiceQuestion {
  serviceQuestion: updateServiceQuestionMutation_updateServiceQuestion_serviceQuestion | null;
}

export interface updateServiceQuestionMutation {
  updateServiceQuestion: updateServiceQuestionMutation_updateServiceQuestion | null;
}

export interface updateServiceQuestionMutationVariables {
  input: UpdateServiceQuestionInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCurrentUserSimpleQuery
// ====================================================

export interface getCurrentUserSimpleQuery_currentUser {
  id: string;
  email: string;
  roles: string[];
  timezone: string;
  waitlisted: boolean;
  onboarded: boolean;
}

export interface getCurrentUserSimpleQuery {
  /**
   * Get current user based on jwt token in header
   */
  currentUser: getCurrentUserSimpleQuery_currentUser | null;
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
  name: string;
  firstName: string;
  lastName: string;
  profilePhotoUrl: string | null;
  slug: string | null;
  brandColor: string | null;
}

export interface getCurrentUserQuery_currentUser {
  id: string;
  email: string;
  roles: string[];
  timezone: string;
  waitlisted: boolean;
  onboarded: boolean;
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
// GraphQL mutation operation: exchangeOnboardingTokenMutation
// ====================================================

export interface exchangeOnboardingTokenMutation_exchangeOnboardingToken {
  accessToken: string | null;
}

export interface exchangeOnboardingTokenMutation {
  exchangeOnboardingToken: exchangeOnboardingTokenMutation_exchangeOnboardingToken | null;
}

export interface exchangeOnboardingTokenMutationVariables {
  input: ExchangeOnboardingTokenInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCurrentUserWithConnectAccountsQuery
// ====================================================

export interface getCurrentUserWithConnectAccountsQuery_currentUser_connectAccountsConnection_nodes {
  id: string;
  email: string | null;
  integrationType: ConnectAccountIntegrationTypeEnum;
}

export interface getCurrentUserWithConnectAccountsQuery_currentUser_connectAccountsConnection {
  /**
   * A list of nodes.
   */
  nodes: (getCurrentUserWithConnectAccountsQuery_currentUser_connectAccountsConnection_nodes | null)[] | null;
}

export interface getCurrentUserWithConnectAccountsQuery_currentUser {
  id: string;
  email: string;
  connectAccountsConnection: getCurrentUserWithConnectAccountsQuery_currentUser_connectAccountsConnection;
}

export interface getCurrentUserWithConnectAccountsQuery {
  /**
   * Get current user based on jwt token in header
   */
  currentUser: getCurrentUserWithConnectAccountsQuery_currentUser | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCurrentUserProfileQuery
// ====================================================

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
  facebookUrl: string | null;
  twitterUrl: string | null;
  instagramUrl: string | null;
  youtubeUrl: string | null;
  twitchUrl: string | null;
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
  googleCalendarEvents: any[];
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
// GraphQL mutation operation: resetPasswordMutation
// ====================================================

export interface resetPasswordMutation_resetPassword_user {
  id: string;
  email: string;
  roles: string[];
}

export interface resetPasswordMutation_resetPassword {
  accessToken: string | null;
  user: resetPasswordMutation_resetPassword_user | null;
}

export interface resetPasswordMutation {
  resetPassword: resetPasswordMutation_resetPassword | null;
}

export interface resetPasswordMutationVariables {
  input: ResetPasswordInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: forgotPasswordMutation
// ====================================================

export interface forgotPasswordMutation_forgotPassword {
  message: string;
}

export interface forgotPasswordMutation {
  forgotPassword: forgotPasswordMutation_forgotPassword | null;
}

export interface forgotPasswordMutationVariables {
  input: ForgotPasswordInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCurrentUserProfileServicesQuery
// ====================================================

export interface getCurrentUserProfileServicesQuery_currentUser_profile_servicesConnection_nodes_providable_VideoCallService {
  id: string;
  duration: number;
}

export interface getCurrentUserProfileServicesQuery_currentUser_profile_servicesConnection_nodes_providable_GeneralService {
  id: string;
}

export type getCurrentUserProfileServicesQuery_currentUser_profile_servicesConnection_nodes_providable = getCurrentUserProfileServicesQuery_currentUser_profile_servicesConnection_nodes_providable_VideoCallService | getCurrentUserProfileServicesQuery_currentUser_profile_servicesConnection_nodes_providable_GeneralService;

export interface getCurrentUserProfileServicesQuery_currentUser_profile_servicesConnection_nodes {
  id: string;
  name: string | null;
  imageUrl: string | null;
  introVideoUrl: string | null;
  description: string | null;
  price: number;
  buttonText: string | null;
  quantity: number;
  providableType: ServiceProvidableTypeEnum | null;
  serviceType: ServiceTypeEnum;
  pricingType: ServicePricingTypeEnum;
  providable: getCurrentUserProfileServicesQuery_currentUser_profile_servicesConnection_nodes_providable | null;
}

export interface getCurrentUserProfileServicesQuery_currentUser_profile_servicesConnection {
  /**
   * A list of nodes.
   */
  nodes: (getCurrentUserProfileServicesQuery_currentUser_profile_servicesConnection_nodes | null)[] | null;
}

export interface getCurrentUserProfileServicesQuery_currentUser_profile {
  id: string;
  brandColor: string | null;
  servicesConnection: getCurrentUserProfileServicesQuery_currentUser_profile_servicesConnection | null;
}

export interface getCurrentUserProfileServicesQuery_currentUser {
  id: string;
  email: string;
  onboarded: boolean;
  profile: getCurrentUserProfileServicesQuery_currentUser_profile | null;
}

export interface getCurrentUserProfileServicesQuery {
  /**
   * Get current user based on jwt token in header
   */
  currentUser: getCurrentUserProfileServicesQuery_currentUser | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: requestEarlyAccessMutation
// ====================================================

export interface requestEarlyAccessMutation_requestEarlyAccess {
  message: string;
}

export interface requestEarlyAccessMutation {
  requestEarlyAccess: requestEarlyAccessMutation_requestEarlyAccess | null;
}

export interface requestEarlyAccessMutationVariables {
  input: RequestEarlyAccessInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: changeUserPasswordMutation
// ====================================================

export interface changeUserPasswordMutation_changeUserPassword_user {
  id: string;
}

export interface changeUserPasswordMutation_changeUserPassword {
  user: changeUserPasswordMutation_changeUserPassword_user | null;
}

export interface changeUserPasswordMutation {
  changeUserPassword: changeUserPasswordMutation_changeUserPassword | null;
}

export interface changeUserPasswordMutationVariables {
  input: ChangeUserPasswordInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCurrentUserOnboardingQuery
// ====================================================

export interface getCurrentUserOnboardingQuery_currentUser_profile_servicesConnection_nodes_providable_VideoCallService {
  id: string;
  duration: number;
}

export interface getCurrentUserOnboardingQuery_currentUser_profile_servicesConnection_nodes_providable_GeneralService {
  id: string;
}

export type getCurrentUserOnboardingQuery_currentUser_profile_servicesConnection_nodes_providable = getCurrentUserOnboardingQuery_currentUser_profile_servicesConnection_nodes_providable_VideoCallService | getCurrentUserOnboardingQuery_currentUser_profile_servicesConnection_nodes_providable_GeneralService;

export interface getCurrentUserOnboardingQuery_currentUser_profile_servicesConnection_nodes {
  id: string;
  name: string | null;
  imageUrl: string | null;
  introVideoUrl: string | null;
  description: string | null;
  price: number;
  buttonText: string | null;
  quantity: number;
  providableType: ServiceProvidableTypeEnum | null;
  serviceType: ServiceTypeEnum;
  pricingType: ServicePricingTypeEnum;
  providable: getCurrentUserOnboardingQuery_currentUser_profile_servicesConnection_nodes_providable | null;
}

export interface getCurrentUserOnboardingQuery_currentUser_profile_servicesConnection {
  /**
   * A list of nodes.
   */
  nodes: (getCurrentUserOnboardingQuery_currentUser_profile_servicesConnection_nodes | null)[] | null;
}

export interface getCurrentUserOnboardingQuery_currentUser_profile {
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
  facebookUrl: string | null;
  twitterUrl: string | null;
  instagramUrl: string | null;
  youtubeUrl: string | null;
  twitchUrl: string | null;
  servicesConnection: getCurrentUserOnboardingQuery_currentUser_profile_servicesConnection | null;
}

export interface getCurrentUserOnboardingQuery_currentUser {
  id: string;
  email: string;
  roles: string[];
  guest: boolean;
  onboarded: boolean;
  profile: getCurrentUserOnboardingQuery_currentUser_profile | null;
}

export interface getCurrentUserOnboardingQuery {
  /**
   * Get current user based on jwt token in header
   */
  currentUser: getCurrentUserOnboardingQuery_currentUser | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateUserMutation
// ====================================================

export interface updateUserMutation_updateUser_user {
  id: string;
  onboarded: boolean;
}

export interface updateUserMutation_updateUser {
  user: updateUserMutation_updateUser_user | null;
}

export interface updateUserMutation {
  updateUser: updateUserMutation_updateUser | null;
}

export interface updateUserMutationVariables {
  input: UpdateUserInput;
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
  status: BookingStatusEnum;
  updatedAt: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: hostBookingFragment
// ====================================================

export interface hostBookingFragment_providable {
  id: string;
  duration: number;
}

export interface hostBookingFragment_bookingQuestionsConnection_nodes {
  id: string;
  question: string;
  answer: string;
}

export interface hostBookingFragment_bookingQuestionsConnection {
  /**
   * A list of nodes.
   */
  nodes: (hostBookingFragment_bookingQuestionsConnection_nodes | null)[] | null;
}

export interface hostBookingFragment_service {
  id: string;
  name: string | null;
  serviceType: ServiceTypeEnum;
}

export interface hostBookingFragment_bookingComplete {
  id: string;
  message: string;
  attachments: string[];
}

export interface hostBookingFragment {
  price: number;
  bookingDate: any;
  userEmail: string;
  userFullName: string;
  providableType: string | null;
  providable: hostBookingFragment_providable | null;
  bookingQuestionsConnection: hostBookingFragment_bookingQuestionsConnection;
  service: hostBookingFragment_service | null;
  bookingComplete: hostBookingFragment_bookingComplete | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: bookingCompleteFragment
// ====================================================

export interface bookingCompleteFragment {
  id: string;
  message: string;
  attachments: string[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: profileFragment
// ====================================================

export interface profileFragment {
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
  facebookUrl: string | null;
  twitterUrl: string | null;
  instagramUrl: string | null;
  youtubeUrl: string | null;
  twitchUrl: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: serviceFragment
// ====================================================

export interface serviceFragment_providable_VideoCallService {
  id: string;
  duration: number;
}

export interface serviceFragment_providable_GeneralService {
  id: string;
}

export type serviceFragment_providable = serviceFragment_providable_VideoCallService | serviceFragment_providable_GeneralService;

export interface serviceFragment {
  id: string;
  name: string | null;
  imageUrl: string | null;
  introVideoUrl: string | null;
  description: string | null;
  price: number;
  buttonText: string | null;
  quantity: number;
  providableType: ServiceProvidableTypeEnum | null;
  serviceType: ServiceTypeEnum;
  pricingType: ServicePricingTypeEnum;
  providable: serviceFragment_providable | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: serviceQuestionFragment
// ====================================================

export interface serviceQuestionFragment {
  id: string;
  question: string | null;
  isDefault: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum BookingStatusEnum {
  Active = "Active",
  Cancelled = "Cancelled",
  Completed = "Completed",
  RESCHEDULE_REQUESTED = "RESCHEDULE_REQUESTED",
  Requested = "Requested",
}

export enum CalendarEventAvailabilityEnum {
  BUSY = "BUSY",
  FREE = "FREE",
}

export enum CalendarEventIntegrationTypeEnum {
  BOOKING = "BOOKING",
  GOOGLE_CALENDAR = "GOOGLE_CALENDAR",
  INTERNAL = "INTERNAL",
}

export enum ConnectAccountIntegrationTypeEnum {
  GOOGLE_CALENDAR = "GOOGLE_CALENDAR",
}

export enum ServicePricingTypeEnum {
  FLEXIBLE = "FLEXIBLE",
  FREE = "FREE",
  SIMPLE = "SIMPLE",
}

export enum ServiceProvidableTypeEnum {
  GENERAL_SERVICE = "GENERAL_SERVICE",
  VIDEO_CALL_SERVICE = "VIDEO_CALL_SERVICE",
}

export enum ServiceTypeEnum {
  CUSTOMIZE_YOUR_OWN = "CUSTOMIZE_YOUR_OWN",
  QUESTION_ANSWER = "QUESTION_ANSWER",
  SELLING_MERCH = "SELLING_MERCH",
  SIMPLE_SUPPORT = "SIMPLE_SUPPORT",
  SOCIAL_MEDIA_SHOUT_OUT = "SOCIAL_MEDIA_SHOUT_OUT",
  VIRTUAL_GROUP_MEET_UP = "VIRTUAL_GROUP_MEET_UP",
  VIRTUAL_ONE_ON_ONE = "VIRTUAL_ONE_ON_ONE",
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
 * Autogenerated input type of CancelBooking
 */
export interface CancelBookingInput {
  bookingId: string;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of ChangeUserPassword
 */
export interface ChangeUserPasswordInput {
  currentPassword?: string | null;
  newPassword: string;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of CreateBookingComplete
 */
export interface CreateBookingCompleteInput {
  bookingId: string;
  message: string;
  attachments: string[];
  clientMutationId?: string | null;
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
  price?: number | null;
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
 * Autogenerated input type of CreateConnectAccount
 */
export interface CreateConnectAccountInput {
  code: string;
  integrationType: ConnectAccountIntegrationTypeEnum;
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
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
  price?: number | null;
  buttonText: string;
  imageUrl?: string | null;
  description?: string | null;
  quantity?: number | null;
  pricingType: ServicePricingTypeEnum;
  serviceType: ServiceTypeEnum;
  providableData: any;
  serviceQuestions: any[];
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of CreateServiceQuestion
 */
export interface CreateServiceQuestionInput {
  serviceId: string;
  question: string;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of CreateUser
 */
export interface CreateUserInput {
  firstName: string;
  lastName: string;
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
 * Autogenerated input type of DeleteConnectAccount
 */
export interface DeleteConnectAccountInput {
  connectAccountId: string;
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
 * Autogenerated input type of DeleteServiceQuestion
 */
export interface DeleteServiceQuestionInput {
  serviceQuestionId: string;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of ExchangeOnboardingToken
 */
export interface ExchangeOnboardingTokenInput {
  token: string;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of ForgotPassword
 */
export interface ForgotPasswordInput {
  email: string;
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
 * Autogenerated input type of RequestEarlyAccess
 */
export interface RequestEarlyAccessInput {
  email: string;
  firstName: string;
  lastName: string;
  socialMediaAccounts: string;
  timezone?: string | null;
  referCode?: string | null;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of RequestRescheduleBooking
 */
export interface RequestRescheduleBookingInput {
  bookingId: string;
  messageToUser?: string | null;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of RescheduleBooking
 */
export interface RescheduleBookingInput {
  bookingId: string;
  bookingDate: any;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of ResetPassword
 */
export interface ResetPasswordInput {
  token: string;
  newPassword: string;
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
  quantity?: number | null;
  pricingType?: ServicePricingTypeEnum | null;
  providableData?: any | null;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of UpdateServiceQuestion
 */
export interface UpdateServiceQuestionInput {
  serviceQuestionId: string;
  question: string;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of UpdateUser
 */
export interface UpdateUserInput {
  onboarded?: boolean | null;
  clientMutationId?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
