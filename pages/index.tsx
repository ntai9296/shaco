import Head from "next/head";
import { withApollo } from "../lib/apollo";

const App = () => {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      heyyy
    </div>
  );
};

export default withApollo({ ssr: true })(App);
