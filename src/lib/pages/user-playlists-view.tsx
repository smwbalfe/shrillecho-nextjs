import React from 'react';
import { Box, SimpleGrid, Heading } from '@chakra-ui/react';
import { useGetCurrentUserPlaylistsQuery } from 'lib/graphql/typescript_gen/generated';
import { LoadingComponent } from 'lib/components/general';
import { handleGraphQLErrors } from '~/lib/utils/gqlErr';
import { PlaylistItem } from '~/lib/components/playlistItem';

export const App: React.FC = () => {
    const { data, error, loading } = useGetCurrentUserPlaylistsQuery();

    if (loading) return <LoadingComponent />;
   
    if (error) {
        const errorComponent = handleGraphQLErrors(error);
        if (errorComponent) return errorComponent;
    }

    
    return (
        <Box p={4} bg="white" borderRadius="md" boxShadow="md">
            <Heading fontSize={'xl'} mb={4}>Your Playlists</Heading>
            <SimpleGrid columns={10} spacing={3}>
                {data?.currentUserPlaylists?.map((playlist, index) => (
                    <PlaylistItem key={index} playlist={playlist} />
                ))}
            </SimpleGrid>
        </Box>
    );
};