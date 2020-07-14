import { useMemo } from 'react'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import jscookie from 'js-cookie';
import cookie from 'cookie';
import { setContext } from "@apollo/link-context";

let apolloClient

function parseCookies(req, options = {}) {
  return cookie.parse(
    req ? req.headers.cookie || "" : document.cookie,
    options
  );
}

function createApolloClient(authToken = null) {
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // return the headers to the context so httpLink can read them
    const token = authToken || jscookie.get("token");
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(createHttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || process.env.GRAPHQL_ENDPOINT, // Server URL (must be absolute)
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    })),
    cache: new InMemoryCache(),
  })
}

export function initializeApollo(initialState = null, req) {
  const authToken = req && parseCookies(req);
  const _apolloClient = apolloClient ?? createApolloClient(authToken && authToken.token);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(pageProps = null) {
  const { initialApolloState, req } = pageProps;
  const store = useMemo(() => initializeApollo(initialApolloState, req), [initialApolloState])
  return store
}