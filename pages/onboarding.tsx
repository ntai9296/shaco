import React from "react";
import Router from "next/router";
import SimpleNavigation from "../src/common/TopNav/SimpleNavigation";
import { getCurrentUser } from "../graphql/User/UserAPI";
import { initializeApollo } from "../lib/withApollo";

export default () => {
  const { data: userData, loading } = getCurrentUser();

  if (loading) {
    return null;
  }

  if (!userData?.currentUser?.id) {
    Router.replace('/');
    return null;
  }
  console.log(userData);

  return (
    <div>
      <SimpleNavigation />
    </div>
  );
};

export async function getServerSideProps(context: any) {
    const apolloClient = initializeApollo(null, context.req);

    const token = context.req.url.replace("/onboarding?tok=", "");
    console.log(token)
  
    // await apolloClient.query({
    //   query: GET_PUBLIC_PROFILE_QUERY,
    //   variables: {
    //     slug: context.query.profileSlug,
    //   },
    // });
  
    return {
      props: {
        // initialApolloState: apolloClient.cache.extract(),
      },
    };
  }