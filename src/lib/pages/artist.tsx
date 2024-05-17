// Import statements
import React, { useState, useEffect } from 'react';
import { Flex, Box, Text, Input, Grid, Fade, Spinner, Divider, VStack, HStack, Menu, MenuButton, Button, MenuItem, MenuList, ListItem, UnorderedList, GridItem, SimpleGrid, Heading, Spacer, FormControl, FormLabel, Switch, Table, Tbody, Td, Th, Thead, Tr, Avatar } from '@chakra-ui/react';
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
import { useGetArtistQuery, useGetCurrentUserPlaylistsQuery, useGetPlaylistQuery } from '../gql/generated';
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
        artist_id: string;
    };
}

export const App: React.FC<AppProps> = ({ params }) => {

    const { playAudio, stopAudio } = useAudioPlayer();
    const router = useRouter();
    const [zooming, setZooming] = useState(false);

    const { data, error, loading } = useGetArtistQuery({
        variables: {
            artist_id: params.artist_id
        },
        fetchPolicy: 'no-cache'
    });

    useEffect(() => {
        const handleResize = () => {
            setZooming(true)
            stopAudio("global");
            setTimeout(() => setZooming(false), 10);
        };


        window.addEventListener('resize', handleResize);
    }, [stopAudio]);


    if (loading) return <LoadingComponent />;
    if (error) return <ErrorComponent error={error} />;

    const fillImage = (images: any) => {
        const imageUrl = images?.[1]?.url || images?.[0]?.url || 'no image';
        return imageUrl;
    };

    const goBack = () => { router.back() };

  
    return (
        <>
            <Button leftIcon={<ArrowBackIcon />} variant={'unstyled'} colorScheme='Gray' onClick={() => goBack()}>
                back
            </Button>
            <Heading>{data?.artist?.name}</Heading>
            <Avatar size={"xl"} src={data?.artist?.images?.[0]?.url || 'null'}/> 
        </>
    );
};