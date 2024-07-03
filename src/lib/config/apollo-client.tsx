import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import {fast_origin, nest_origin} from './vars';

const client = new ApolloClient({
    uri: `${fast_origin}/graphql`, 
    cache: new InMemoryCache(),
    credentials: 'include'
});

export default client;