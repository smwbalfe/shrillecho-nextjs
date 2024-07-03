import { SimpleGrid, Box, Text, Heading, Button } from "@chakra-ui/react";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { CreatePlaylistMutation ,useCreatePlaylistMutation,useGetPlaylistQuery } from "~/lib/graphql/typescript_gen/generated";
import useAudioPlayer from "~/lib/hooks/useAudioPlayer";
import { ErrorComponent } from "lib/components/fetching/error-component";
import { LoadingComponent } from "lib/components/fetching/loading-component";
import Image from "next/image"
import { useFilters } from "~/lib/pages/context/filter-context";
import { useSources } from "~/lib/pages/context/sources-context";
import { create } from "domain";



export const ContentGrid = () => {

    
    const { playAudio, stopAudio } = useAudioPlayer();
    const [itemsToShow, setItemsToShow] = useState(100000);
    const [zooming, setZooming] = useState(false);
    const router = useRouter();
    const { filters } = useFilters();
    const { sources } = useSources()

    const { data, error, loading } = useGetPlaylistQuery({
        variables: {
            playlistId: sources.playlistId,
            playlistTracksInput: {
                playlistId: sources.playlistId,
                removeLiked: filters.removeLiked,
                minObscurityValue: filters.obscurityRange.min,
                maxObscurityValue: filters.obscurityRange.max,
                minFollowers: filters.followerRange.min,
                maxFollowers: filters.followerRange.max
            }
        },
        fetchPolicy: 'no-cache'
    });

    const [createPlaylist, { data: data2, loading: loading2, error: error2 }] = useCreatePlaylistMutation();

    if (loading) return <LoadingComponent />;
    if (error) return <ErrorComponent error={error} />;

    const slicedTracks = data?.playlistTracks?.slice(0, itemsToShow);

    const createFilteredPlaylist = () => {
        createPlaylist({
            variables: {
                CreatePlaylistInput: {
                    playlistId: sources.playlistId,
                    removeLiked: filters.removeLiked,
                    minObscurityValue: filters.obscurityRange.min,
                    maxObscurityValue: filters.obscurityRange.max,
                    minFollowers: filters.followerRange.min,
                    maxFollowers: filters.followerRange.max
                }
            }
        })
    }

    return (
        <>
            <Button onClick={() => { createFilteredPlaylist()}}>Write playlist</Button>
            <Heading>playlist: {data?.playlist.name}</Heading>
            <Image alt='none' width={250} height={250} src={data?.playlist.images[0].url || 'https://cdn4.iconfinder.com/data/icons/lyrics/154/dics-cd-music-audio-track-512.png'} />
            <Text fontSize={'1.5em'} fontWeight={'normal'} size='sm'>{data?.playlistTracks.length} / {data?.playlist.tracks.total} tracks </Text>
            <SimpleGrid marginTop="15px" columns={10} spacing={4}>
                {slicedTracks?.map((track, index) => (
                    <Box
                        key={index}
                        onMouseEnter={() => {
                            if (!zooming) {
                                playAudio(track?.previewUrl || '', track?.name || '')
                            }
                        }}
                        onMouseLeave={() => stopAudio(track?.name || '')}

                        boxShadow="0px 0px 2px rgba(0, 0, 0, 0.5)"
               
                        padding="5px"
                        display={'flex'}
                        flexDir={'column'}
                        backgroundColor={track?.liked ? '#8ae655' : 'white'}
                        
                    >
                        {/* <Text>{track?.liked}</Text> */}
                        <Image alt='none' width={250} height={250} src={track?.album?.images?.[1]?.url || 'https://cdn4.iconfinder.com/data/icons/lyrics/154/dics-cd-music-audio-track-512.png'} />
                        <Text fontSize={'0.9em'} fontWeight={'black'}>{track?.name}</Text> 
                        <Text fontSize={'0.9em'} onClick={() => router.push(`/artist/${track?.artists?.[0]?.id}`)} fontWeight={'light'}>
                            {track?.artists?.[0]?.name}
                        </Text>

                        <Text color='green'>artist followers: {track?.artists[0].followers.total}</Text>
                        <Text color='blue'>spotify popularity: {track?.popularity}</Text>
                        <Text color='red' fontWeight={'bold'}>{track?.artists[0].genres?.join(',')}</Text>
                    </Box>
                ))}
            </SimpleGrid>
        </>
    )
}