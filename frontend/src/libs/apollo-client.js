import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client/core';
import { DefaultApolloClient, useQuery, useMutation } from '@vue/apollo-composable';

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_API_URL,
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export const provideApollo = (app) => {
  app.provide(DefaultApolloClient, apolloClient)
}

export { gql, useQuery, useMutation }
