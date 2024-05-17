import React, { useState } from 'react';
import { useFormik } from 'formik';
import {
    Box,
    Button,
    Input,
    Text
} from '@chakra-ui/react';
import { useGetTrackQuery } from '../gql/generated';
import { useRouter } from 'next/navigation';

interface SearchQuery {
    uri: string;
}

enum SpotifyResource {
    Track = 'track',
    Playlist = 'playlist',
}

export const App: React.FC = () => {
    const [track, setTrack] = useState<string>('');
    const [status, setStatus] = useState<SpotifyResource>(SpotifyResource.Track);
    const router = useRouter()

    const { data, error, loading } = useGetTrackQuery({
        variables: {
            track_id: track
        },
        
    });

    const formik = useFormik<SearchQuery>({
        initialValues: {
            uri: '',
        },
        onSubmit: async (values: SearchQuery) => {
            console.log(values.uri)
            setTrack(values.uri);
            router.push(`/playlist/${values.uri}`)
        },
    });

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            formik.handleSubmit();
        }
    };

    return (
        <>
            <Text fontSize="xl">Explore</Text>
            <Box flex="1" mr="2">
                <Input
                    id="uri"
                    name="uri"
                    placeholder="Enter Track URI"
                    onChange={formik.handleChange}
                    value={formik.values.uri}
                    onKeyDown={handleKeyDown}
                    size='sm'
                    width={'lg'}
                />
                <Button  mt={4} colorScheme="blue" isLoading={formik.isSubmitting} onClick={() => formik.handleSubmit()}>
                    Submit
                </Button>
            </Box>
            <Text>{data?.track?.name}</Text>
        </>
    );
};