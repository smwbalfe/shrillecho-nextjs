// Import statements
import React, { useState, useEffect } from 'react';
import { Flex, Box, Text, Input, Grid, Fade, Spinner, Divider, VStack, HStack, Menu, MenuButton, Button, MenuItem, MenuList, ListItem, UnorderedList, GridItem, SimpleGrid, Heading, Spacer, FormControl, FormLabel, Switch, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Image from 'next/image'
import { useFormik } from 'formik';
import axios from 'axios';
import fast_origin from '../config/vars';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { TrackComponent } from '../components/track';
import {
    HamburgerIcon,
    AddIcon,
    ExternalLinkIcon,
    RepeatIcon,
    EditIcon,
    ChevronDownIcon,
    ArrowBackIcon,
} from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { useGetCurrentUserPlaylistsQuery, useGetPlaylistQuery } from '../gql/generated';
import { ErrorComponent, LoadingComponent } from '../components/general';
import Link from 'next/link';
import { Play } from '@next/font/google';
import Graph from '../components/graph';
import Sphere from '../components/sphere';
import { useRouter } from 'next/navigation';
import useScrollTracking from '../hooks/useScrollTracking';
import { zoom } from 'd3';

interface AppProps {
    params: {
        playlist_id: string;
    };
}

export const App: React.FC<AppProps> = ({ params }) => {

    const { playAudio, stopAudio } = useAudioPlayer();
    const router = useRouter();
    const [itemsToShow, setItemsToShow] = useState(100);
    const [removeShitSongs, setRemoveShitSongs] = useState(false);
    const [compactView, setCompactView] = useState(false);
    const [zooming, setZooming] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setZooming(true)
            stopAudio("global");
            setTimeout(() => setZooming(false), 10);
        };


        window.addEventListener('resize', handleResize);
    }, [stopAudio]); 

    const scrollCallback = () => {
        console.log(`items to show: ${itemsToShow}`)
        if (itemsToShow < (data?.playlist?.tracks?.total || 0) || data?.playlist?.tracks?.total == undefined ){
            setItemsToShow(prevItemsToShow => prevItemsToShow + 250);
        } else {
            setItemsToShow(data?.playlist?.tracks?.total)
        }
    }

    useScrollTracking(scrollCallback)

    const { data, error, loading } = useGetPlaylistQuery({
        variables: { playlist_query :  {
                        getNonLiked: removeShitSongs,
                        playlistId: params.playlist_id
                    } 
        },
        fetchPolicy: 'no-cache'
    });

    if (loading ) return <LoadingComponent />;
    if (error) return <ErrorComponent error={error} />;

    const fillImage = (images: any) => {
        const imageUrl = images?.[1]?.url || images?.[0]?.url || 'no image';
        return imageUrl;
    };

    const goBack = () => { router.back() };

    const slicedTracks = data?.playlistTracks?.slice(0, itemsToShow); 

    return (
        <>
            <Button leftIcon={<ArrowBackIcon />} variant={'unstyled'} colorScheme='Gray' onClick={() => goBack()}>
                back
            </Button>
          
            <HStack flexDirection='row' alignItems="flex-start">
                <Box marginBottom={25}>
                    <Image alt = "image not found" priority={true} width={250} height={250} src={fillImage(data?.playlist?.images)} />
                </Box>
                <VStack flexDirection={'column'} alignItems={'flex-start'}>
                    <Heading>{`Playlist: ${data?.playlist?.name}`}</Heading>
                    <Text fontSize='lg'>{`Owner: ${data?.playlist?.owner?.displayName}`}</Text>
                    <Text fontSize='lg'>filtered: {`${data?.playlistTracks?.length}`} | total: {data?.playlist?.tracks?.total} </Text>
                    <FormControl display='flex' alignItems='center'>
                        <VStack>
                            <HStack>
                                <FormLabel htmlFor='email-alerts' mb='0'>
                                    Get Unique Songs
                                </FormLabel>
                                <Switch id='email-alerts' isChecked={removeShitSongs} onChange={() => setRemoveShitSongs(!removeShitSongs)} />
                            </HStack>
                            <HStack>
                                <FormLabel htmlFor='email-alerts' mb='0'>
                                    Compact View
                                </FormLabel>
                                <Switch id='email-alerts' isChecked={compactView} onChange={() => setCompactView(!compactView)} />
                            </HStack>
                        </VStack>
                    </FormControl>
                </VStack>
                
            </HStack>

            {compactView ? <Table variant="simple" size="lg">
                <Thead>
                    <Tr>
                        <Th>#</Th>
                        <Th>Liked</Th>
                        <Th>Title</Th>
                        <Th>Artist</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {slicedTracks?.map((track, index) => (
                        <Tr key={index}>
                            <Td py={1}>{index + 1}</Td>
                            <Td py={1}>{track?.liked ? <Image width={50} height={50} alt= "liked" src={'https://www.publicdomainpictures.net/pictures/180000/nahled/green-heart-1465690358vQc.jpg'}></Image> : ''}</Td>
                            <Td py={1}>{track?.name}</Td>
                            <Td py={1}>{track?.artists?.map(artist => artist?.name).join(', ')}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>: 
                <SimpleGrid columns={13} spacing={4}>
                    {slicedTracks?.map((track, index) => (
                        <Box
                            key={index}
                            onMouseEnter={() => {
                                if (!zooming) {
                                    console.log("playing audio")
                                    console.log(track?.previewUrl)
                                    playAudio(track?.previewUrl || '', track?.name || '')
                                }
                            }}
                            onMouseLeave={() => stopAudio(track?.name || '')}

                            boxShadow="0px 0px 2px rgba(0, 0, 0, 0.5)"
                        >
                            <Image alt='none' width={250} height={250} src={track?.album?.images?.[1]?.url || 'https://cdn4.iconfinder.com/data/icons/lyrics/154/dics-cd-music-audio-track-512.png'} />
                            <Text fontWeight={'semibold'}>{index + 1}. {track?.name}</Text>
                        
                            <Text onClick = {() => router.push(`/artist/${track?.artists?.[0]?.id}`)} fontWeight={'light'}>
                                {track?.artists?.[0]?.name}
                            </Text>
                        </Box>
                    ))}
                </SimpleGrid> 
            }
        
        </>
    );
};