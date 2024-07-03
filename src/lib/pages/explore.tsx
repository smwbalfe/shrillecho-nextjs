'use client'
import React, { useState } from 'react';
import { Box, Heading, Input, SimpleGrid, Text } from '@chakra-ui/react';
import { useGetRelatedQuery, useGetTrackQuery } from 'lib/graphql/typescript_gen/generated';
import { handleGraphQLErrors } from 'lib/utils/gqlErr';
import { LoadingComponent } from 'lib/components/general';
import Image from 'next/image'
import useAudioPlayer from '~/lib/hooks/useAudioPlayer';
import { useRouter } from 'next/navigation';

export const App: React.FC = () => {

    const [artist, setArtist] = useState<string>('0v3r1DooLiNEyyIQH35vrt');
    const [inputValue, setInputValue] = useState<string>('');
    const { playAudio, stopAudio } = useAudioPlayer();
    const [zooming, setZooming] = useState(false);
   
    const { data, error, loading } = useGetRelatedQuery({
        variables: {
            artist_id: artist
        }
    });

    if (loading) return <LoadingComponent />;

    if (error && artist != '') {
        const errorComponent: React.JSX.Element | null = handleGraphQLErrors(error);
        if (errorComponent) return errorComponent;
    }
    const router = useRouter();
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setArtist(inputValue);
        }
    };

    return (
        <>
            <Input
                placeholder='Explore Artist'
                width='30%'
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />

            {artist !== '' && (
                <Box p={4} bg="white" borderRadius="md" boxShadow="md">
                    <SimpleGrid columns={10} spacing={3}>
                        {data?.discovery?.map((track, index) => (
                            <Box
                                key={index}
                                onMouseEnter={() => {
                                    if (!zooming) {
                                        playAudio(track?.preview_url || '', track?.name || '')
                                    }
                                }}
                                onMouseLeave={() => stopAudio(track?.name || '')}

                                boxShadow="0px 0px 2px rgba(0, 0, 0, 0.5)"
                            >

                                <Image alt='none' width={250} height={250} src={track?.album?.images?.[1]?.url || 'https://cdn4.iconfinder.com/data/icons/lyrics/154/dics-cd-music-audio-track-512.png'} />
                                <Text fontWeight={'semibold'}>{index + 1}. {track?.name}</Text>


                                <Text onClick={() => router.push(`/artist/${track?.artists?.[0]?.id}`)} fontWeight={'light'}>
                                    {track?.artists?.[0]?.name}
                                </Text>
                            </Box>
                        ))}
                    </SimpleGrid>
                </Box>
            )}
        </>
    );
};