// import { AspectRatio, Box, Button, Container, Flex, Heading, IconButton, Image, Progress, Spacer, Stack, Text, useDisclosure } from '@chakra-ui/react';
// import { ChevronLeftIcon, ChevronRightIcon, DownloadIcon, DeleteIcon } from '@chakra-ui/icons';
// import { FC, useState } from 'react';

// // Mock data for songs
// const songs = [
//     { id: 1, title: "Song A", artist: "Artist A", cover: "/path_to_cover_image_a.jpg", duration: "3:42" },
//     { id: 2, title: "Song B", artist: "Artist B", cover: "/path_to_cover_image_b.jpg", duration: "4:15" },
//     // ... add more songs
// ];

// interface SongProps {
//     song: {
//         id: number;
//         title: string;
//         artist: string;
//         cover: string;
//         duration: string;
//     };
//     isPlaying: boolean;
// }

// const Song: FC<SongProps> = ({ song, isPlaying }) => {
//     return (
//         <Flex align="center" my={4} p={4} bg={isPlaying ? "gray.700" : "transparent"} borderRadius="md" _hover={{ bg: "gray.600" }} transition="background 0.2s">
//             <Image boxSize="60px" src={song.cover} alt={song.title} mr={4} borderRadius="md" _hover={{ transform: "scale(1.05)" }} transition="transform 0.3s" />
//             <Box>
//                 <Heading size="md">{song.title}</Heading>
//                 <Text>{song.artist}</Text>
//             </Box>
//             <Spacer />
//             <Text>{song.duration}</Text>
//         </Flex>
//     );
// };

// export const App: React.FC = () => {
//     const [currentSongId, setCurrentSongId] = useState<number | null>(1); // For the demo, first song is playing
//     const { isOpen, onOpen, onClose } = useDisclosure();

//     return (
//         <Container backgroundColor={'green'} maxW="1920">
      
//             <AspectRatio maxW='1920' ratio={1}>
//                 <iframe
//                     title='naruto'
//                     src='https://www.youtube.com/embed/QhBnZ6NPOY0'
//                     allowFullScreen
//                 />
//             </AspectRatio>
//             <Heading my={6}>My Playlist</Heading>
//             <Stack spacing={4}>
//                 {songs.map(song => (
//                     <Song key={song.id} song={song} isPlaying={song.id === currentSongId} />
//                 ))}
//             </Stack>
//             <Flex justifyContent="center" mt={6} alignItems="center">
//                 <IconButton aria-label="Previous" icon={<ChevronLeftIcon />} mr={4} size="lg" variant="ghost" />
//                 <Button leftIcon={isOpen ? <DownloadIcon /> : <DownloadIcon />} size="lg" onClick={isOpen ? onClose : onOpen}>
//                     {isOpen ? "Pause" : "Play"}
//                 </Button>
//                 <IconButton aria-label="Next" icon={<ChevronRightIcon />} ml={4} size="lg" variant="ghost" />
//                 <Spacer />
//                 <IconButton aria-label="Volume" icon={<DeleteIcon />} mr={2} size="lg" variant="ghost" />
//                 <Progress value={70} max={100} size="xs" width="100px" />
//             </Flex>
//         </Container>
//     );
// }