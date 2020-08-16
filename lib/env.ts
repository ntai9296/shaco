export default {
  GOOGLE_OAUTH_CLIENT_ID:
    "283085095373-d4ufram84a0oidt4ochf29h5u04jsqbo.apps.googleusercontent.com",
  GOOGLE_OAUTH_API_KEY: "AIzaSyCkQFrny8t1RYUBCX6ubmUFCKNsxYZj2LU",
  STRIPE_CONNECT_CLIENT_ID:
    process.env.NODE_ENV === "development"
      ? "ca_HqHauXEdo8FW8zOtYIwpw9RKncjRSCpE"
      : "ca_HqHaf021TfYDKhEJREaAVz6TRNVMPbbd",
  STRIPE_PUBLISHABLE_KEY:
    process.env.NODE_ENV === "development"
      ? "pk_test_51H7IbuBct9MOftuNbrgLsG5IdJVoJTSjuOgnfXDrsXJYqzdUxK3oRn77AciWA51yfD0qZhXq22XWwDuoY8aSs4FD00QAnax5Vb"
      : "pk_live_51H7IbuBct9MOftuNfF5RdO22sxJLnIoRJsRQ0fSBgXFlRm5Q3JeD0yYotJF2ZRtbkJondIQJloQGmI8s4i1qoq1O00T1k7g3OF",
};
