import axios from 'axios';
import { nest_origin } from 'lib/config/vars';
import { ApolloError } from '@apollo/client';
import { GraphQLError } from 'graphql';
import {Text} from '@chakra-ui/react'


export const handleUnauthGraphql = async (error: ApolloError) => {
    const response = await axios.get(`${nest_origin}/auth/spotify-auth`, { withCredentials: true });
    window.location.href = response.data.url;
}

export const parseGraphQLErrorCode = (error: ApolloError) => {
    error?.graphQLErrors?.some((err: GraphQLError) => err.extensions?.code === 'UNAUTHENTICATED');
    let errors: any[] = [];
    for (const e of error?.graphQLErrors) {
        errors.push(e.extensions?.code)
    }
    return errors;
}

export const handleGraphQLErrors = (error: ApolloError) => {
    console.log(`GRAPHQL_ERROR: ${JSON.stringify(error)}`)
    const errorCodes: any[] = parseGraphQLErrorCode(error);
    if (errorCodes.includes('UNAUTHENTICATED')) {
        handleUnauthGraphql(error);
        // return <Text color={'red'}> You are not logged in, redirecting... </Text>;
    }
    if (errorCodes.includes('INTERNAL_SERVER_ERROR')) {
        return <Text color={ 'red' }> INTERNAL_SERVER_ERROR </Text>;
    }
    return null;
};