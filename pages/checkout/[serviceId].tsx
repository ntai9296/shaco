import React from "react";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { initializeApollo } from "../../lib/withApollo";
import { GET_SERVICE_QUERY } from "../../graphql/Service/service";
import { getServiceById } from "../../graphql/Service/ServiceAPI";
import { useRouter } from "next/router";
import {
  getServiceQuery_node_Service,
  ServiceProvidableTypeEnum,
} from "../../graphql/generated";
import dynamic from "next/dynamic";

const VideoCallCheckout = dynamic(
  () => import("../../src/Checkout/VideoCall/VideoCallCheckout"),
  {
    ssr: false,
  }
);

export default () => {
  const router = useRouter();
  const { serviceId } = router.query;

  const { data } = getServiceById({ variables: { id: serviceId as string } });

  const node = data?.node as getServiceQuery_node_Service;
  if (!node) {
    return <div>service not found</div>;
  }

  const renderCheckout = () => {
    switch (node.providableType) {
      case ServiceProvidableTypeEnum.VIDEO_CALL_SERVICE:
        return <VideoCallCheckout service={node} />;
      default:
        return "not found";
    }
  };

  const pageTitle = `${node.name} | Fireside`;
  const coverPhotoURL = node.imageUrl;
  return (
    <ThemeProvider theme={{}}>
      <Head>
        <title>{node.name} | Fireside</title>
        {node.description && (
          <>
            <meta name="description" content={node.description} />
            <meta name="twitter:description" content={node.description} />
            <meta property="og:description" content={node.description} />
          </>
        )}

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        {coverPhotoURL && <meta name="twitter:image" content={coverPhotoURL} />}

        <meta property="og:title" content={pageTitle} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://tryfireside.com/checkout/${serviceId}`}
        />
        {coverPhotoURL && <meta property="og:image" content={coverPhotoURL} />}

        <meta property="og:site_name" content="Fireside" />
      </Head>
      {/* <S.Body>
        <Header avatarURL={""} name={""} />
        <div style={{ marginTop: 64 }} />
        <S.Main>
          <S.TitleContent>
            <S.Title>Complete your checkout</S.Title>
          </S.TitleContent> */}

      <div>{renderCheckout()}</div>
      {/* </S.Main>
      </S.Body> */}
    </ThemeProvider>
  );
};

export async function getServerSideProps(context: any) {
  const apolloClient = initializeApollo(null, context.req);

  await apolloClient.query({
    query: GET_SERVICE_QUERY,
    variables: {
      id: context.query.serviceId,
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
