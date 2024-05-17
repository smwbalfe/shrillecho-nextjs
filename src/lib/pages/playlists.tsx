import React, { useState } from 'react';
import {  Box, Text,Button, SimpleGrid, Heading } from '@chakra-ui/react';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import {ArrowBackIcon,
} from '@chakra-ui/icons';

import Image from 'next/image'
import { useGetCurrentUserPlaylistsQuery} from '../gql/generated';
import { ErrorComponent, LoadingComponent } from '../components/general';

import { useRouter } from 'next/navigation';
import useScrollTracking from '../hooks/useScrollTracking';

export const App: React.FC = () => {
    const [showPlaylistView, setShowPlaylistView] = useState(false);
    const [playlistUri, setPlaylistUri] = useState<string>('');
    const { playAudio, stopAudio } = useAudioPlayer();
    const { data, error, loading } = useGetCurrentUserPlaylistsQuery();
    const router = useRouter()

    const [itemsToShow, setItemsToShow] = useState(25);


    const scrollCallback = () => {
        console.log(`items to show: ${itemsToShow}`)
        setItemsToShow(prevItemsToShow => prevItemsToShow + 25);
    }

    useScrollTracking(scrollCallback)


    if (loading) return <LoadingComponent />;
    if (error) return <ErrorComponent error={error} />;

    function fillImage(images: any) {
        const imageUrl = images?.[1]?.url || images?.[0]?.url || 'https://cdn-icons-png.flaticon.com/512/727/727239.png';
        return imageUrl;
    }
    
    const handlePlaylistClick = (playlistUri: string) => {
        setShowPlaylistView(true);
        setPlaylistUri(playlistUri)
    };

    const goBack = () => {
        setShowPlaylistView(false)
    }

    return (
        <>
            <Heading>Your Playlists</Heading>
            <SimpleGrid columns={10} spacing={3}>
                {data?.currentUserPlaylists?.map((playlist, index) => (
                    <Box key={index} 
                        onClick={() => router.push(`/playlist/${playlist?.id}`)}
                        cursor="pointer">
                        <Image width = {150} height= {150} alt="none" src={fillImage(playlist?.images) || 'https://static.thenounproject.com/png/1229062-200.png'} />
                        <Text>{playlist?.name}</Text>
                    </Box>
                ))}
            </SimpleGrid>
        </>
    );
};