import React from 'react';
import { Flex, Box, Text, Fade, Spinner, Image, VStack } from '@chakra-ui/react';
import { useGetPlaylistQuery, useGetTrackQuery } from '../gql/generated';
import { ErrorComponent, LoadingComponent } from './general';

interface TrackComponentProps {
    trackId: string;
}


export const TrackComponent: React.FC<TrackComponentProps> = ({trackId}) => {
    // const { data, error, loading } = useGetTrackQuery({
    //     variables: { track_id: trackId } // Pass variables here
    // });

    const { data, error, loading } = useGetPlaylistQuery({
        variables: { playlist_id: trackId } // Pass variables here
    });
 
    if (loading) return <LoadingComponent/>;
    if (error) return <ErrorComponent error={error}/>;

    return (
        <VStack>
            {/* <Text fontSize={10} fontWeight={'normal'}>
                {data?.track?.name || 'Song name not available'}
            </Text>
            <Text>
                {data?.track?.artists?.[0]?.name}
            </Text>
            <Image src={data?.track?.album?.images?.[2]?.url || "default-image"}></Image> */}
            <Text>{data?.playlist?.name}</Text>
        </VStack>
    );
};
