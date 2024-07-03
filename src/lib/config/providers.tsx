'use client'
import { ChakraProvider,  CSSReset } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import {ReactNode} from 'react'
import { ApolloProvider } from "@apollo/client";
import client from "../config/apollo-client";
import { indexTheme } from "~/lib/theme";

import 'lib/theme/globals.css'

interface ProvidersProps {
    children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <ApolloProvider client={client}>
            <ChakraProvider theme={indexTheme}>
                {children}
            </ChakraProvider>
        </ApolloProvider>
    );
}