import React, { useState, useEffect } from 'react';
import { Box, Text, VStack, HStack, Button, SimpleGrid, Heading, FormControl, FormLabel, Switch, Table, Tbody, Td, Th, Thead, Tr, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import Image from 'next/image';
import { useAudioPlayer } from 'lib/hooks/useAudioPlayer';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useCreatePlaylistMutation, useGetPlaylistQuery } from 'lib/graphql/typescript_gen/generated';
import { ErrorComponent } from 'lib/components/fetching/error-component';
import { LoadingComponent } from 'lib/components/fetching/loading-component';
import { useRouter } from 'next/navigation';
import useScrollTracking from 'lib/hooks/useScrollTracking';
import Link from 'next/link';

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
    const [zooming, setZooming] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setZooming(true);
            stopAudio("global");
            setTimeout(() => setZooming(false), 10);
        };

        window.addEventListener('resize', handleResize);
    }, [stopAudio]);

    const scrollCallback = () => {
        if (itemsToShow < (data?.playlist?.tracks?.total || 0) || data?.playlist?.tracks?.total === undefined) {
            setItemsToShow(prevItemsToShow => prevItemsToShow + 250);
        } else {
            setItemsToShow(data?.playlist?.tracks?.total);
        }
    }

    useScrollTracking(scrollCallback);

    const [createPlaylist, { data: mutData, loading: mutLoading, error: mutError }] = useCreatePlaylistMutation({
        refetchQueries: [{ query: GetCurrentUserPlaylistsDocument }]
    });

    const { data, error, loading } = useGetPlaylistQuery({
        variables: {
            playlistId: params.playlist_id,
            playlistQuery: {
                filtered: true
            }
        },
        fetchPolicy: 'no-cache'
    });

    if (loading) return <LoadingComponent />;
    if (error) return <ErrorComponent error={error} />;

    const fillImage = (images: any) => {
        const imageUrl = images?.[1]?.url || images?.[0]?.url || 'no image';
        return imageUrl;
    };

    const goBack = () => { router.back() };

    const slicedTracks = data?.playlistTracks?.slice(0, itemsToShow);

    const handleStateUpdate = async () => {
        setRemoveShitSongs(!removeShitSongs);
        const variables = {
            createPlaylistInput: {
                name: "My New Playlist",
                filterLiked: true,
                copyExisting: true,
                existingPlaylistId: params.playlist_id
            }
        };
        await createPlaylist({ variables });
        setIsModalOpen(true);  // Open modal on mutation completion
    };

    return (
        <>
            <Button leftIcon={<ArrowBackIcon />} variant={'unstyled'} colorScheme='Gray' onClick={() => goBack()}>
                back
            </Button>
            <Text colorScheme='blue'>Button</Text>

            <HStack flexDirection='row' alignItems="flex-start">
                <Box marginBottom={25}>
                    <Image alt="image not found" priority={true} width={250} height={250} src={fillImage(data?.playlist?.images)} />
                </Box>
                <VStack flexDirection={'column'} alignItems={'flex-start'}>
                    <Heading>{`Playlist: ${data?.playlist?.name}`}</Heading>
                    <Text fontSize='lg'>{`Owner: ${data?.playlist?.owner?.display_name}`}</Text>
                    <Text fontSize='lg'>{`${data?.playlistTracks?.length}`} /  {data?.playlist?.tracks?.total} tracks </Text>
                    <FormControl display='flex' alignItems='center'>
                        <VStack>
                            <HStack>
                                <FormLabel htmlFor='email-alerts' mb='0'>
                                    remove likes
                                </FormLabel>
                                <Switch id='email-alerts' isChecked={removeShitSongs} onChange={() => handleStateUpdate()} />
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
                            <Td py={1}>{track?.liked ? <Image width={50} height={50} alt="liked" src={'https://www.publicdomainpictures.net/pictures/180000/nahled/green-heart-1465690358vQc.jpg'}></Image> : ''}</Td>
                            <Td py={1}>{track?.name}</Td>
                            <Td py={1}>{track?.artists?.map(artist => artist?.name).join(', ')}</Td>
                        </Tr>
                    ))}
                </Tbody>
              
            </Table> :
                <SimpleGrid columns={13} spacing={4}>
                    {slicedTracks?.map((track, index) => (
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
            }

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Playlist Created</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Playlist successfully created!</Text>
                        <Link href={mutData?.createPlaylist || 'none'}>Your new playlist</Link>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={() => setIsModalOpen(false)}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
