import { Box, Flex, Heading, Icon, IconButton, Spacer, Text, Tabs, TabList, Tab, Button, Menu, MenuButton, MenuItem, MenuList, Tooltip, Divider, Avatar, useDisclosure } from '@chakra-ui/react';
import { Image as ChakraImage } from "@chakra-ui/react";
import { useSpotifyLogin } from '../hooks/useSpotifyLogin';
import { useAuth } from '../hooks/useAuth';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { fast_origin, nest_origin } from '../config/vars';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import Image from 'next/image'

const url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png';

const Header = () => {
    const [user, setUser] = useState<string>("");
    const [userImage, setUserImage] = useState<string>("");
    const [authed, setAuth] = useState<boolean>(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${fast_origin}/me`, { withCredentials: true });
                setUser(response.data['display_name']);
                setUserImage(response.data['images'][0]['url'])
            } catch (error: any) {
                if (error.response && error.response.status === 401) {
                    console.log("401 unauthorized")
                    const response: any = await axios.get('http://localhost:8001/spotify-auth');
                    window.location.href = response.data.url;
                } else {
                    console.error("An error occurred:", error);
                }
            }
        };
        fetchUser()
    }, []);

    useEffect(() => {
        const checkAuthCookie = () => {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith('shrillecho-biscuit=')) {
                    setAuth(true);
                    break;
                }
            }
        };
        checkAuthCookie();
    }, []);

    const loginWithSpotify = useSpotifyLogin(authed);
    
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Box position="sticky" top="0" zIndex="10" backgroundColor="white">
           
            <Flex
                flexDir="row"
                justify="flex-start"
                alignItems="center"
                gap={5}
                width="full"
                paddingX={4}
                backgroundColor={'white'}
            >
                <Flex flexDir="row" alignItems="center">
                    <Box>
                        <Heading size="3xl">shrillecho</Heading>
                    </Box>
                    <Image src="/shrillecho.png" width="100" height="100" alt="none" />
                </Flex>
                <Spacer />
                <Link href="/discovery">
                    <Button
                        borderWidth={'1px'}
                        borderColor={'black'}
                        textTransform="none"
                        bg='white'
                        color="black"
                        _hover={{
                            bg: "linear-gradient(to-r, gray.600, black)",
                            boxShadow: "xl",
                        }}
                        _active={{
                            bg: "linear-gradient(to-r, gray.800, black)",
                            boxShadow: "lg",
                        }}
                        maxWidth="150px"
                        padding="20px"
                        marginLeft="10px"
                        fontSize={'1em'}
                    >
                        Discovery
                    </Button>
                </Link>
              
                {user ? (
                    <Flex flexDir="column" backgroundColor='white'>
                        {/* <Text fontWeight={'bold'} >{user}</Text> */}
                        <Box marginLeft="9px">
                            <Avatar name={user} src={userImage} />
                        </Box>
                    </Flex>
                ) : (
                    <Flex flexDir="row" alignItems="center">
                        <Text>Login with Spotify</Text>
                        <IconButton
                            icon={<ChakraImage src={url} boxSize="26px" alt="Spotify Logo" />}
                            onClick={loginWithSpotify}
                            background="transparent"
                            _hover={{ background: "transparent" }}
                            aria-label="Login with Spotify"
                        />
                    </Flex>
                )}
            </Flex>
            <Divider borderWidth={'1px'} borderColor={'black'}/>
        </Box>
    );
};

export default Header;
