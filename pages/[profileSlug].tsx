import { useRouter } from "next/router";
import { withApollo } from "../lib/apollo";

const App = () => {
  const router = useRouter();
  const { profileSlug } = router.query;
  return <div className="container">{profileSlug}</div>;
};

export default withApollo({ ssr: true })(App);
