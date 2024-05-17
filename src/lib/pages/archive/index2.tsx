// // 'use client'
// // import React, { useEffect, useState } from 'react';
// // import {
// //     Box,
// //     Text,
// //     Spinner,
// //     Fade,
// //     Flex,
// //     Button,Image,
// //     IconButton
// // } from '@chakra-ui/react';
// // import {cookies} from 'next/headers'
// // import { ApolloProvider } from '@apollo/client';
// // import { Providers } from "~/lib/providers";
// // import { indexTheme } from "~/lib/theme/index";
// // import client from '../apolloClient';
// // import { usePlaylistQuery } from '../gql/generated';
// // import {WebPlayback} from '../components/web_playback'
// // import axios from 'axios'

// const TrackComponent: React.FC = () => {
//     const { data, error, loading } = usePlaylistQuery();

//     if (loading) return <Flex justify="center" align="center" height="100vh"><Spinner size="xl" /></Flex>;
//     if (error) return <Text color="red.500">Error: {error.message}</Text>;

//     return (
//         <Fade in={true}>
//             <Box
//                 bg="blue.600"
//                 p={5}
//                 borderRadius="md"
//                 boxShadow="md"
//             >
//                 <Text
//                     color="white"
//                     fontSize="2xl"
//                     fontWeight="semibold"
//                 >
//                     {data?.playlist?.tracks?.items?.map((item, index) => 
//                         <Text key = {index}>
//                             {item?.track?.externalIds?.isrc}
//                         </Text>
//                     )}
//                 </Text>
//             </Box>
//         </Fade>
//     );
// };

// // const ProgressBar = ({ percentage}: any) => {
// //     return (
// //         <Box
// //             className="progress-bar"
// //             width={`${percentage}%`}
// //             height="10px"
// //             backgroundColor="purple"
// //             borderRadius="3px"
// //             transition="width 0.2s ease-in-out"
// //         ></Box>
// //     );
// // };

// // export const App: React.FC = () => {
    


// //     // const [url, setUrl] = useState<string | null>(null);

// //     // const fetchUrl = async () => {
// //     //     const response = await fetch('http://localhost:8000/auth-spotify', {method: 'POST'});
// //     //     const data: { url: string } = await response.json();
// //     //     window.open(data.url, '_blank')
// //     // }
// //     const logoUrl = "https://cdn-icons-png.flaticon.com/512/4241/4241664.png"
// //     const [playbackState, setPlaybackState] = useState<any | null>(null);
// //     const getPlayback = async () => {
// //         try {
// //             const response = await axios.get('http://localhost:8000/currently-playing');
// //             setPlaybackState(response.data);
// //         } catch (error) {
// //             console.error('Error getting playback state:', error);
// //         }
// //     };

  
// //     // useEffect(() => {
// //     //     getPlayback();
// //     //     const intervalId = setInterval(getPlayback, 100);

// //     //     return () => clearInterval(intervalId);
// //     // }, []);

// //     const togglePlayback = async () => {
// //         await axios.get('http://localhost:8000/toggle-playback');
// //     }

// //     const nextTrack = async () => {
// //         await axios.get('http://localhost:8000/next');
// //     }

// //     const loginWithSpotify = async () => {
// //         let response = await axios.get('http://localhost:8000/spotipy-auth' , {
// //             withCredentials: true
// //         })
// //         if (!response['data']["logged in"]){
// //             window.location.href = response['data']['url']
// //         }
// //         else {
// //             console.log("You are authorized already")
// //         }
// //     }

// //     const checkCookie = (name: string) => {
// //         const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
// //         return match ? match[2] : null;
// //     }

// //     useEffect(() => {
// //         const fetchMe = async () => {
        
// //             const me = await axios.get('http://localhost:8000/me', {
// //                 withCredentials: true
// //             })
// //             console.log(`mydata ${JSON.stringify(me['data'])}`)
            
// //         }
// //         fetchMe()
// //     },[])


// //     return (
// //         // <ApolloProvider client={client}>
// //         //     <Providers theme={indexTheme}>
// //         //         <WebPlayback token={''}/>
// //         //        {/* button */}
// //         //     </Providers>
// //         // </ApolloProvider>
// //         <>
// //             {/* <WebPlayback getPlayback={getPlayback}token={''}/>
           
// //             {
// //                 playbackState && (
// //                     <div>
// //                         <p>Track Name: {playbackState.track_name}</p>
// //                         <p>Artist Name: {playbackState.artist_name}</p>
// //                         <img src={playbackState.cover_art_url} alt="Cover Art" />
// //                         <ProgressBar percentage={(playbackState.progress / 235000) * 100} />
// //                     </div>
// //                 )
// //             }

// //             <button onClick={getPlayback}>Get Playback</button>
// //             <button onClick={togglePlayback}>Play</button>
// //             <button onClick={nextTrack}>next</button> */}

// //             <IconButton
// //                 icon={<Image src={logoUrl} boxSize="24px" alt="Logo" />}
// //                 onClick={loginWithSpotify}
// //                 background="transparent"
// //                 _hover={{ background: "transparent" }} 
// //                 aria-label={''}
// //             /> 
// //         </>

// //          //  <div>
// //         //     {url && <iframe src={url} width="100%" height="500px"></iframe>}
// //         //     <button onClick={fetchUrl}>Load URL</button>
// //         // </div>
// //     );
// // };
