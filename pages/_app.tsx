import "../styles/static.scss";
import "../styles/calendar.scss";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/withApollo";
import Head from "next/head";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn:
    "https://df2f29a6ee8948f5a08ef81c912de8a4@o421231.ingest.sentry.io/5340689",
});

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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default App;
