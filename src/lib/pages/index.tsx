'use client'

import React from 'react';
import { useGetTrackQuery } from 'lib/graphql/typescript_gen/generated';
import { handleGraphQLErrors } from 'lib/utils/graphql-errors';
import { LoadingComponent } from 'lib/components/fetching/loading-component';
import { Box, Text } from '@chakra-ui/react';

export const App: React.FC = () => {
    const { data, error, loading } = useGetTrackQuery({
        variables: {
            track_id: '3BHlOb4aOdaMaIfJ4M13RP'
        }
    });

    if (loading) return <LoadingComponent />;

    if (error) {
        const errorComponent: React.JSX.Element | null = handleGraphQLErrors(error);
        if (errorComponent) return errorComponent;
    }

    return (
        <Text>test</Text>
    );
};
