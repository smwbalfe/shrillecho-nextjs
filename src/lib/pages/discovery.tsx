import React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { FaFilter } from "@react-icons/all-files/fa/FaFilter";
import { FaDatabase } from "@react-icons/all-files/fa/FaDatabase";
import { SourcesPane } from '~/lib/components/discovery/sources-pane';
import { FilterPane } from '~/lib/components/discovery/filter-pane';
import { ContentGrid } from '~/lib/components/discovery/content-grid';
import { GenericDrawerButton } from '~/lib/components/discovery/generic-drawer';
import { FilterProvider } from 'lib/pages/context/filter-context';
import { SourceProvider, useSources } from 'lib/pages/context/sources-context';

export const App = () => {
    return (
        <>
            <FilterProvider>
                <SourceProvider>
                    <Flex flexDir={'column'} justifyContent={'center'} alignItems={'center'} >
                        <Box
                            padding="10px"
                            marginBottom="10px"
                            backgroundColor="white"
                            minWidth={'100px'}
                        >
                            <Heading marginBottom={'1px'} size={'lg'}>Discovery</Heading>
                        </Box>
                        <Flex
                            flexDir={'row'}
                            justifyContent={'flex-start'}
                            backgroundColor={'white'}
                            padding={'2'}
                            border={'1px'}
                            position={'sticky'} 
                            borderRadius={'10px'} 
                            top='93px'
                        >
                            <Box color={'black'} backgroundColor={'white'}>
                                <GenericDrawerButton title="Sources" icon={FaDatabase}>
                                    <SourcesPane />
                                </GenericDrawerButton>
                            </Box>
                            <Box backgroundColor={'white'} color={'black'} marginLeft={'5px'}>
                                <GenericDrawerButton title="Filters" icon={FaFilter}>
                                    <FilterPane />
                                </GenericDrawerButton>
                            </Box>
                        </Flex>
                        <ContentGrid />
                    </Flex>
                </SourceProvider>
            </FilterProvider>
        </>
    );
};
