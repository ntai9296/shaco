import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/link-context";
import cookie from 'js-cookie';

export default function createApolloClient(initialState, ctx, getToken) {
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // return the headers to the context so httpLink can read them
    const token = Boolean(ctx) ? getToken() : cookie.get("token");
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: authLink.concat(
      createHttpLink({
        uri: "http://localhost:3000/graphql", // Server URL (must be absolute)
        credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
      })
    ),
    cache: new InMemoryCache().restore(initialState),
  });
}
