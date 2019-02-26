import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import Index from './modules/router';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_BASE_URL,
});
const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: `Bearer ${localStorage.token}`,
  },
}));
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
export default function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Index />
      </BrowserRouter>
    </ApolloProvider>
  );
}
