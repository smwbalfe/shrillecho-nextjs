import { Box, Flex, Heading, Icon, IconButton, Image, Spacer, Text, Tabs, TabList, Tab } from '@chakra-ui/react';
import { useSpotifyLogin } from '../hooks/useSpotifyLogin';
import { useAuth } from '../hooks/useAuth';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import Link from 'next/link';

const url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png';

const Header = () => {
    const searchParams = useSearchParams();
    const { user, authed, setAuthed } = useAuth();

    const loginWithSpotify = useSpotifyLogin(authed);

    return (
        <Box position="sticky" top="0" zIndex="10" backgroundColor="white">
            <Flex
                direction="row"
                justify="flex-start"
                align="center"
                gap={5}
                width="full"
                paddingX={4}
            >
                <Box>
                    <Heading size='lg'>shrillecho</Heading>
                </Box>

                <Tabs>
                    <Tabs defaultIndex={1}>
                        <TabList>
                            <Tab><Link href='/'><Text color='black' >search</Text></Link></Tab>
                            <Tab><Link href='/playlist'><Text color='black' >my playlists</Text></Link></Tab>
                            <Tab><Link href='/discovery'><Text color='black' >discovery</Text></Link></Tab>
                            <Tab><Link href='/other'><Text color='black' >other</Text></Link></Tab>
                        </TabList>
                    </Tabs>
                </Tabs>
                <Spacer />
                {authed && user ? (
                    <>
                        <Text>{user}</Text>
                        <Image src={url} boxSize="40px" alt="Spotify Logo" />
                    </>
                ) : (
                    <>
                        <Text>Login with Spotify</Text>
                        <IconButton
                            icon={<Image src={url} boxSize="40px" alt="Spotify Logo" />}
                            onClick={loginWithSpotify}
                            background="transparent"
                            _hover={{ background: "transparent" }}
                            aria-label="Login with Spotify"
                        />
                    </>
                )}
            </Flex>
        </Box>
    );
};

export default Header;