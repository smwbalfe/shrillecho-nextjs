import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { useSources } from 'lib/pages/context/sources-context'; // Adjust the path as necessary

export const SourcesPane = () => {
    const { sources, setSources } = useSources();

    const handlePlaylistPress = (event: any) => {
        if (event.key === 'Enter') {
            setSources({
                ...sources,
                playlistId: event.target.value,
            });
        }
    };

    const handleTrackPress = (event: any) => {
        if (event.key === 'Enter') {
            setSources({
                ...sources,
                trackId: event.target.value,
            });
        }
    };

    return (
        <Flex flexDir={'column'} alignItems={'center'}>
            <Flex flexDir={'row'} alignItems={'center'}>
                <Text fontSize={'1em'}>Playlist:</Text>
                <Input
                    fontSize={'0.8em'}
                    marginLeft='5px'
                    type='tel'
                    placeholder='enter playlist here...'
                    onKeyDown={handlePlaylistPress}
                    minW={'150px'}
                    maxW={'400px'}
                />
            </Flex>
            <Flex flexDir={'row'} alignItems={'center'}>
                <Text fontSize={'1em'}>Track:</Text>
                <Input
                    fontSize={'0.8em'}
                    marginLeft='5px'
                    type='tel'
                    placeholder='enter track here...'
                    onKeyDown={handleTrackPress}
                    minW={'150px'}
                    maxW={'400px'}
                />
            </Flex>
        </Flex>
    );
};