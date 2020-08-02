import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import Head from "next/head";
import Router from "next/router";
import {
  getCurrentUserLazy,
  exchangeOnboardingToken,
} from "../graphql/User/UserAPI";
import * as S from "../src/Onboarding/OnboardingPage.styled";
import Onboarding from "../src/Onboarding/Onboarding";
import { ThemeProvider } from "styled-components";
import { getDefaultStyling } from "../src/common/utility";

export default () => {
  const [getCurrentUser, { data: userData, loading }] = getCurrentUserLazy({
    fetchPolicy: "cache-and-network",
    onError: () => {
      setLoaded(true);
    },
    onCompleted: () => {
      setLoaded(true);
    },
  });

  const [exchangeOnboarding] = exchangeOnboardingToken({
    onCompleted: (data) => {
      cookie.set("token", data.exchangeOnboardingToken?.accessToken as string);
      getCurrentUser();
    },
    onError: () => {
      Router.replace("/");
    },
  });

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const token = Router.query.tok as string;
    if (token) {
      exchangeOnboarding({
        variables: {
          input: {
            token,
          },
        },
      });
    } else {
      getCurrentUser();
    }
  }, []);

  if (!loaded || loading) {
    return null;
  }

  if (!userData?.currentUser?.id) {
    Router.replace("/");
    return null;
  }

  if (userData?.currentUser?.onboarded) {
    Router.replace("/dashboard");
    return null;
  }

  return (
    <ThemeProvider
      theme={{
        ...getDefaultStyling,
        primaryColor: userData?.currentUser?.profile?.brandColor,
      }}
    >
      <S.Page>
        <Head>
          <script src="https://sdk.amazonaws.com/js/aws-sdk-2.713.0.min.js"></script>
        </Head>
        <Onboarding />
      </S.Page>
    </ThemeProvider>
  );
};
