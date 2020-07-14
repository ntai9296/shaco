import { useRouter } from "next/router";

const App = () => {
  const router = useRouter();
  const { profileSlug } = router.query;
  return <div className="container">{profileSlug}</div>;
};

export default App;
