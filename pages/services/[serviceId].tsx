import React from "react";
import moment from "moment-timezone";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { ThemeProvider } from "styled-components";
import { getCurrentUserSimple } from "../../graphql/User/UserAPI";
import { getIndividualServiceById } from "../../graphql/Service/ServiceAPI";
import { GET_INDIVIDUAL_SERVICE_BY_ID_QUERY } from "../../graphql/Service/service";
import { initializeApollo } from "../../lib/withApollo";
import * as S from "../../src/Service/Service.styled";
import Header from "../../src/PublicProfile/Header";
import { getDefaultStyling } from "../../src/common/utility";
import { parseCookies } from "../../lib/withApollo";
import {
  getIndivualServiceByIdQuery_node_Service,
  ServicePricingTypeEnum,
  ServiceTypeEnum,
  getIndivualServiceByIdQuery_node_Service_providable_VideoCallService,
} from "../../graphql/generated";

const App = () => {
  const router = useRouter();
  const { serviceId } = router.query;

  const { data: currentUserData } = getCurrentUserSimple();
  const { data } = getIndividualServiceById({
    skip: !serviceId,
    variables: {
      id: serviceId as string,
    },
  });

  const node = data?.node as getIndivualServiceByIdQuery_node_Service | null;
  if (!node?.id) {
    return <div>Service not found</div>;
  }

  const onRenderItemCost = () => {
    if (node.pricingType === ServicePricingTypeEnum.FREE) {
      return "Free";
    } else if (node.pricingType === ServicePricingTypeEnum.FLEXIBLE) {
      return "Name your price";
    }

    return `$${(node.price / 100).toFixed(2).toLocaleString()}`;
  };

  const renderServiceTitle = () => {
    if (node.serviceType === ServiceTypeEnum.VIRTUAL_ONE_ON_ONE) {
      const providable = node.providable as getIndivualServiceByIdQuery_node_Service_providable_VideoCallService;
      return (
        <h3>
          {node.name} ({providable.duration} mins)
        </h3>
      );
    }
    return <h3>{node.name}</h3>;
  };

  const pageTitle = `${node?.name} | Fireside`;
  const coverPhotoURL = node?.imageUrl || "";
  const soldOut = node.limitedQuantity && node.quantity <= 0;
  const providable = node.providable as any;
  return (
    <ThemeProvider
      theme={{
        ...getDefaultStyling({ primaryColor: node?.profile?.brandColor }),
      }}
    >
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={node.description || ""} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={node.description || ""} />
        {coverPhotoURL && <meta name="twitter:image" content={coverPhotoURL} />}

        <meta property="og:title" content={pageTitle} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://tryfireside.com/services/${serviceId}`}
        />
        {coverPhotoURL && <meta property="og:image" content={coverPhotoURL} />}
        <meta property="og:description" content={node.description || ""} />
        <meta property="og:site_name" content="Fireside" />
      </Head>
      <S.Body>
        <Header
          showDashboardButton={!!currentUserData?.currentUser?.id}
          avatarURL={""}
          name={node.name || ""}
        />
        <S.Main>
          <S.Panel>
            <S.PanelHero>
              <S.PanelHeroImage bg={coverPhotoURL} />
            </S.PanelHero>
            <S.PanelHeader>
              <S.PanelHeaderInfo>
                {renderServiceTitle()}
                <S.HostInfoContainer>
                  {providable &&
                    node.serviceType ===
                      ServiceTypeEnum.VIRTUAL_GROUP_MEET_UP && (
                      <S.StartDate>
                        {moment
                          .tz(providable.startDate, moment.tz.guess())
                          .format("ddd, MMM DD, YYYY h:mm A")}{" "}
                        -{" "}
                        {moment
                          .tz(providable.startDate, moment.tz.guess())
                          .add(providable.duration, "minutes")
                          .format("h:mm A z")}
                      </S.StartDate>
                    )}
                </S.HostInfoContainer>
                <S.HostInfoContainer>
                  <Link href="/[profileSlug]" as={`/${node.profile?.slug}`}>
                    <S.ByHost>
                      <b>By</b> {node.profile?.name}
                    </S.ByHost>
                  </Link>
                  {node.limitedQuantity && (
                    <S.LimitedText>
                      <b>Limited</b>: {node.quantity.toLocaleString()} remaining
                    </S.LimitedText>
                  )}
                </S.HostInfoContainer>
              </S.PanelHeaderInfo>
              <S.PanelHeaderAction>
                <S.PanelHeaderActionPrice>
                  {onRenderItemCost()}
                </S.PanelHeaderActionPrice>
                <Link href="/checkout/[serviceId]" as={`/checkout/${node.id}`}>
                  <S.SelectButton disabled={soldOut}>
                    {soldOut ? "Sold Out" : node.buttonText || "Select"}
                  </S.SelectButton>
                </Link>
              </S.PanelHeaderAction>
            </S.PanelHeader>
            <S.PanelBody>
              <S.PanelBodyHeading>Description</S.PanelBodyHeading>
              <S.PanelBodyDescription>
                {node.description}
              </S.PanelBodyDescription>
            </S.PanelBody>
            <S.PanelBody>
              <S.PanelBodyHeading>
                About {node.profile?.name}
              </S.PanelBodyHeading>
              {node.profile?.profilePhotoUrl && (
                <S.PanelHostAvatar>
                  <S.HostAvatar src={node.profile?.profilePhotoUrl} />
                </S.PanelHostAvatar>
              )}
              <p>{node.profile?.shortDescription}</p>
              <Link href="/[profileSlug]" as={`/${node.profile?.slug}`}>
                <S.MoreServiceTextContainer>
                  <S.MoreServiceText>
                    More services by {node.profile?.name}
                  </S.MoreServiceText>
                </S.MoreServiceTextContainer>
              </Link>
            </S.PanelBody>
          </S.Panel>
        </S.Main>
      </S.Body>
      <S.CheckoutPanel>
        <S.CheckoutPanelPrice>{onRenderItemCost()}</S.CheckoutPanelPrice>
        <Link href="/checkout/[serviceId]" as={`/checkout/${node.id}`}>
          <S.CheckoutButton disabled={soldOut}>
            {soldOut ? "Sold Out" : node.buttonText || "Select"}
          </S.CheckoutButton>
        </Link>
      </S.CheckoutPanel>
    </ThemeProvider>
  );
};

export async function getServerSideProps(context: any) {
  const authToken = parseCookies(context.req)?.token || null;
  const apolloClient = initializeApollo(null, authToken);
  await apolloClient.query({
    query: GET_INDIVIDUAL_SERVICE_BY_ID_QUERY,
    variables: {
      id: context.query.serviceId,
    },
  });
  return {
    props: {
      authToken,
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default App;
