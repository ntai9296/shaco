import { useRouter } from "next/router";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { Instagram, Facebook, Youtube, Twitter, Twitch } from "react-feather";
import { GET_PUBLIC_PROFILE_QUERY } from "../graphql/Profile/profile";
import { getPublicProfileBySlug } from "../graphql/Profile/ProfileAPI";
import { initializeApollo } from "../lib/withApollo";
import * as S from "../src/PublicProfile/PublicProfile.styled";
import Header from "../src/PublicProfile/Header";
import Hero from "../src/PublicProfile/Hero";
import ServiceList from "../src/PublicProfile/Service/ServiceList";
import { getDefaultStyling } from "../src/common/utility";

const App = () => {
  const router = useRouter();
  const { profileSlug } = router.query;

  const { data } = getPublicProfileBySlug(profileSlug as string);

  if (!data?.profile?.id) {
    return <div>profile not found</div>;
  }

  const pageTitle = `${data.profile.name} | Fireside`;
  const coverPhotoURL = data.profile.coverPhotoUrl || "";
  return (
    <ThemeProvider
      theme={{
        ...getDefaultStyling({ primaryColor: data.profile.brandColor }),
      }}
    >
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={data.profile.shortDescription} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta
          name="twitter:description"
          content={data.profile.shortDescription}
        />
        {coverPhotoURL && <meta name="twitter:image" content={coverPhotoURL} />}

        <meta property="og:title" content={pageTitle} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://tryfireside.com/${profileSlug}`}
        />
        {coverPhotoURL && <meta property="og:image" content={coverPhotoURL} />}
        <meta
          property="og:description"
          content={data.profile.shortDescription}
        />
        <meta property="og:site_name" content="Fireside" />
      </Head>
      <S.Body>
        <Header
          earlyAccess={data.profile.slug === "matt"}
          avatarURL={data.profile.profilePhotoUrl || ""}
          name={data.profile.name}
        />
        <div style={{ marginTop: 64 }} />
        <S.Main>
          <Hero
            avatarURL={data.profile.profilePhotoUrl || ""}
            backgroundURL={data.profile.coverPhotoUrl || ""}
            introVideoURL={data.profile.introVideoUrl || ""}
          />
          <S.Content>
            <S.TitleContent>
              <S.Title>{data.profile.name}</S.Title>
              <S.ShortDescription>
                {data.profile.shortDescription}
              </S.ShortDescription>
              {(data.profile.facebookUrl ||
                data.profile.instagramUrl ||
                data.profile.twitchUrl ||
                data.profile.twitterUrl ||
                data.profile.youtubeUrl) && (
                <S.SocialMediaList>
                  {data.profile.instagramUrl && (
                    <S.SocialMediaItem
                      href={data.profile.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div>
                        <Instagram size={16} />
                      </div>
                    </S.SocialMediaItem>
                  )}
                  {data.profile.twitterUrl && (
                    <S.SocialMediaItem
                      href={data.profile.twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div>
                        <Twitter size={16} />
                      </div>
                    </S.SocialMediaItem>
                  )}
                  {data.profile.facebookUrl && (
                    <S.SocialMediaItem
                      href={data.profile.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div>
                        <Facebook size={16} />
                      </div>
                    </S.SocialMediaItem>
                  )}
                  {data.profile.youtubeUrl && (
                    <S.SocialMediaItem
                      href={data.profile.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div>
                        <Youtube size={16} />
                      </div>
                    </S.SocialMediaItem>
                  )}
                  {data.profile.twitchUrl && (
                    <S.SocialMediaItem
                      href={data.profile.twitchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div>
                        <Twitch size={16} />
                      </div>
                    </S.SocialMediaItem>
                  )}
                </S.SocialMediaList>
              )}
            </S.TitleContent>
            <S.ServiceContent>
              <S.ServiceTitle>How can I help you?</S.ServiceTitle>
              <S.ServiceList>
                <ServiceList
                  services={data.profile?.servicesConnection?.nodes as any}
                />
              </S.ServiceList>
            </S.ServiceContent>
          </S.Content>
        </S.Main>
      </S.Body>
    </ThemeProvider>
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
