import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client/core';
import { DefaultApolloClient, useQuery, useMutation } from '@vue/apollo-composable';
import { createUploadLink } from 'apollo-upload-client';

const httpLink = createUploadLink({
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
