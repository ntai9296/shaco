import React, { useEffect } from "react";
import { ArrowLeft, Eye } from "react-feather";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import * as S from "../../src/Profile/Profile.styled";
import Button from "../../src/common/Button";
import Basics from "../../src/Profile/Basics";
import Settings from "../../src/Profile/Settings";
import * as UserAPI from "../../graphql/User/UserAPI";
import * as Utility from "../../src/common/utility";
import Services from "./Services";
import { ThemeProvider } from "styled-components";
import profile from "../../pages/dashboard/profile";

export default () => {
  const router = useRouter();
  const {
    data: userData,
    loading: userLoading,
  } = UserAPI.getCurrentUserProfile();

  useEffect(() => {
    if (userLoading) {
      Utility.showWorkingOverlay();
    } else {
      Utility.hideWorkingOverlay();
    }
  }, [userLoading]);

  if (userLoading) {
    return null;
  }

  if (!userData?.currentUser) {
    Router.replace("/login");
    return null;
  }

  const onRenderContent = () => {
    if (router.route === "/dashboard/profile") {
      return (
        <S.Content>
          <S.ContentTitle>Basics</S.ContentTitle>
          <S.ContentSubTitle>Set your page details</S.ContentSubTitle>
          <Basics />
        </S.Content>
      );
    } else if (router.route.includes("/dashboard/profile/services")) {
      return (
        <S.Content>
          <S.ContentTitle>Services</S.ContentTitle>
          <S.ContentSubTitle>Set your page details</S.ContentSubTitle>
          <Services />
        </S.Content>
      );
    } else if (router.route.includes("/dashboard/profile/settings")) {
      return (
        <S.Content>
          <S.ContentTitle>Page Settings</S.ContentTitle>
          <S.ContentSubTitle>
            Set your page details and make a great first impression
          </S.ContentSubTitle>
          <Settings />
        </S.Content>
      );
    }
  };

  return (
    <ThemeProvider
      theme={{ primaryColor: userData?.currentUser?.profile?.brandColor }}
    >
      <S.Layout>
        <S.TopNav>
          <S.TopNavLeft>
            <Link href="/dashboard">
              <a>
                <S.GoBack>
                  <ArrowLeft width={16} height={16} />
                  Back to dashboard
                </S.GoBack>
              </a>
            </Link>
          </S.TopNavLeft>
          <S.TopNavRight>
            {userData.currentUser?.profile?.slug && (
              <Link href={`/${userData.currentUser.profile.slug}?preview=true`}>
                <a target="_blank">
                  <S.PreviewLink>
                    <Eye width={15} height={15} />
                    Preview
                  </S.PreviewLink>
                </a>
              </Link>
            )}
            <Button>Launch</Button>
          </S.TopNavRight>
        </S.TopNav>
        <S.Body>
          <S.Tabs>
            <S.Tab active={router.route === "/dashboard/profile"}>
              <div>
                <Link href="/dashboard/profile">
                  <a>Basics</a>
                </Link>
              </div>
            </S.Tab>
            <S.Tab
              active={router.route.includes("/dashboard/profile/services")}
            >
              <div>
                <Link href="/dashboard/profile/services">
                  <a>Services</a>
                </Link>
              </div>
            </S.Tab>
            <S.Tab
              active={router.route.includes("/dashboard/profile/settings")}
            >
              <div>
                <Link href="/dashboard/profile/settings">
                  <a>Page Settings</a>
                </Link>
              </div>
            </S.Tab>
          </S.Tabs>
          {onRenderContent()}
        </S.Body>
      </S.Layout>
    </ThemeProvider>
  );
};
