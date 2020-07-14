import "../styles/static.scss";
import "../styles/calendar.scss";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/withApollo";

const App = ({ Component, pageProps }: any) => {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default App;