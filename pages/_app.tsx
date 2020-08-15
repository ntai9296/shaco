import "../styles/static.scss";
import "../styles/calendar.scss";
import "../styles/rc-calendar.css";
import "nprogress/nprogress.css";
import "react-datepicker/dist/react-datepicker.css";
import Router from "next/router";
import { ApolloProvider } from "@apollo/client";
import NProgress from "nprogress"; //nprogress module
import { useApollo } from "../lib/withApollo";
import Head from "next/head";
import * as Sentry from "@sentry/react";
import { ThemeProvider } from "styled-components";
import { getDefaultStyling } from "../src/common/utility";

Sentry.init({
  dsn:
    "https://df2f29a6ee8948f5a08ef81c912de8a4@o421231.ingest.sentry.io/5340689",
});

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => {
  if(typeof window !== 'undefined') window.scrollTo(0, 0)
  NProgress.done();
});
Router.events.on("routeChangeError", () => NProgress.done());

const App = ({ Component, pageProps }: any) => {
  const apolloClient = useApollo(pageProps);
  if (typeof window !== "undefined") {
    window.addEventListener("DOMContentLoaded", () => {
      let newDoc: any = document;
      newDoc.getElementById("holderStyle").remove();
    });
  }
  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <style
          id="holderStyle"
          dangerouslySetInnerHTML={{
            __html: `
      *, *::before, *::after {
        transition: none!important;
      }
    `,
          }}
        />
        <title>Fireside</title>
        <meta name="description" content="Fireside app" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      </Head>
      <ThemeProvider theme={{ ...getDefaultStyling() }}>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
