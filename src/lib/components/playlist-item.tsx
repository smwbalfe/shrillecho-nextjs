import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { fillImage } from '~/lib/utils/general';
import { SimplifiedPlaylistObject } from '../graphql/typescript_gen/generated';

export const PlaylistItem = ({playlist} : any) => {
    const router = useRouter();

    const handleClickPlaylist = () => { router.push(`/playlist/${playlist?.id}`); };

    console.log(playlist.public)
    return (
        <Box
            onClick={handleClickPlaylist}
            cursor="pointer"
            textAlign="center"
            bg="gray.100"
            p={2}
            borderRadius="md"
            boxShadow="sm"
        >
            <Image
                src={fillImage(playlist?.images)}
                alt={playlist?.name}
                width={150}
                height={150}
                objectFit="cover"

            />
            <Text fontSize="md">{playlist?.name}</Text>
            <Text>{JSON.stringify(playlist?.public)}</Text>
        </Box>
    );
};