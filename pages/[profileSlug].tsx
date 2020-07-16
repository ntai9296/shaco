import { useRouter } from "next/router";
import Head from "next/head";
import { GET_PUBLIC_PROFILE_QUERY } from "../graphql/Profile/profile";
import { getPublicProfileBySlug } from "../graphql/Profile/ProfileAPI";
import { initializeApollo } from "../lib/withApollo";
import * as S from "../src/PublicProfile/PublicProfile.styled";
import Header from "../src/PublicProfile/Header";
import Hero from "../src/PublicProfile/Hero";
import ServiceList from "../src/PublicProfile/Service/ServiceList";

const App = () => {
  const router = useRouter();
  const { profileSlug } = router.query;

  const { data, loading } = getPublicProfileBySlug(profileSlug as string);

  if (!data?.profile?.id) {
    return <div>profile not found</div>;
  }

  const pageTitle = `${data.profile.name} | Fireside`;
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={data.profile.shortDescription} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta
          name="twitter:description"
          content={data.profile.shortDescription}
        />
        <meta name="twitter:image" content={data.profile.coverPhotoUrl} />

        <meta property="og:title" content={pageTitle} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://tryfireside.com/${profileSlug}`}
        />
        <meta property="og:image" content={data.profile.coverPhotoUrl} />
        <meta
          property="og:description"
          content={data.profile.shortDescription}
        />
        <meta property="og:site_name" content="Fireside" />
      </Head>

      <S.Body>
        <Header
          avatarURL={data.profile.profilePhotoUrl}
          name={data.profile.name}
        />
        <div style={{ marginTop: 64 }} />
        <S.Main>
          <Hero
            avatarURL={data.profile.profilePhotoUrl}
            backgroundURL={data.profile.coverPhotoUrl}
          />
          <S.Content>
            <S.TitleContent>
              <S.Title>{data.profile.name}</S.Title>
              <S.ShortDescription>
                {data.profile.shortDescription}
              </S.ShortDescription>
            </S.TitleContent>
            <S.ServiceContent>
              <S.ServiceTitle>How can I help you?</S.ServiceTitle>
              <S.ServiceList>
                <ServiceList
                  services={data.profile?.servicesConnection?.nodes as any}
                />
              </S.ServiceList>
            </S.ServiceContent>
            <S.AboutContent>
              <S.AboutTitle>About</S.AboutTitle>
              <S.AboutBox>
                <S.AboutDescription>
                  {data.profile.about}
                </S.AboutDescription>
              </S.AboutBox>
            </S.AboutContent>
          </S.Content>
        </S.Main>
      </S.Body>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const apolloClient = initializeApollo(null, context.req);

  await apolloClient.query({
    query: GET_PUBLIC_PROFILE_QUERY,
    variables: {
      slug: context.query.profileSlug,
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default App;
