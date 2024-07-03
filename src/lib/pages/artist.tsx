// Import statements
import React, { useState, useEffect } from 'react';
import { Button, Heading, Avatar } from '@chakra-ui/react';
import { useAudioPlayer } from 'lib/hooks/useAudioPlayer';
import { ArrowBackIcon,} from '@chakra-ui/icons';
// import { useGetArtistQuery } from 'lib/graphql/typescript_gen/generated';
import { ErrorComponent } from 'lib/components/fetching/error-component';
import {  LoadingComponent } from 'lib/components/fetching/loading-component';
import { useRouter } from 'next/navigation';

interface AppProps {
    params: {
        artist_id: string;
    };
}

export const App: React.FC<AppProps> = ({ params }) => {

    // const { playAudio, stopAudio } = useAudioPlayer();
    const router = useRouter();
    // const [zooming, setZooming] = useState(false);

    // const { data, error, loading } = useGetArtistQuery({
    //     variables: {
    //         artist_id: params.artist_id
    //     },
    //     fetchPolicy: 'no-cache'
    // });

    // useEffect(() => {
    //     const handleResize = () => {
    //         setZooming(true)
    //         stopAudio("global");
    //         setTimeout(() => setZooming(false), 10);
    //     };
    //     window.addEventListener('resize', handleResize);
    // }, [stopAudio]);

    // if (loading) return <LoadingComponent />;
    // if (error) return <ErrorComponent error={error} />;

    // const fillImage = (images: any) => {
    //     const imageUrl = images?.[1]?.url || images?.[0]?.url || 'no image';
    //     return imageUrl;
    // };
    const goBack = () => { router.back() };

    return (
        <>
            <Button leftIcon={<ArrowBackIcon />} variant={'unstyled'} colorScheme='Gray' onClick={() => goBack()}>
                back
            </Button>
            {/* <Heading>{data?.artist?.name}</Heading>
            <Avatar size={"xl"} src={data?.artist?.images?.[0]?.url || 'null'}/>  */}
        </>
    );
};
