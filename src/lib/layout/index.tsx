'use client';

import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import Footer from './Footer'
import Header from './Header'

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <Box margin="0 auto" maxWidth={1920} transition="0.5s ease-out">
            <Box margin="1">
                <Header/>
                    <Box as="main" marginY={10} marginBottom={'100px'}>
                        {children}
                    </Box>
                <Footer/>
            </Box>
        </Box>
    );
};

export default Layout;
