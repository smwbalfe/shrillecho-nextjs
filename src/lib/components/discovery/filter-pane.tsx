import { Flex, Accordion, AccordionItem, AccordionButton, Box, Text, AccordionIcon, AccordionPanel, Switch, Button } from "@chakra-ui/react";
import { useState } from "react";
import { GeneralFilterComponent } from "lib/components/discovery/general-filter";
import { CheckboxContainer } from "lib/components/discovery/check-container";
import { useFilters } from "~/lib/pages/context/filter-context";

export const FilterPane = () => {
    const [removeTop, setRemoveTop] = useState<boolean>(false)

    return (
        <Flex flexDirection={'column'}>
            {/* <Button onClick={() => handleFilterChange({ ...filters, newKey: 'newValue' })}></Button> */}
            <Flex flexDir={'column'} justifyContent={'center'}>
                <GeneralFilterComponent />
                <Accordion allowMultiple width="100%">
                    <AccordionItem>
                        <AccordionButton>
                            <Box as='span' flex='1' textAlign='left'>
                                Genres
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4} backgroundColor={'white'}>
                            <CheckboxContainer options={['Vapor Twitch', 'Future Bass', 'Dark Techno', 'Lofi Techno', 'Drum and Bass']} filterTitle={'Genre Filter'} />
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem >
                        <AccordionButton>
                            <Box as='span' flex='1' textAlign='left'>
                                Artists
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            <Flex alignItems={'center'}>
                                <Text marginLeft='5px' fontSize={'0.75em'}>
                                    Remove Top 500
                                </Text>
                                <Switch size={'sm'} margin={'10px'} id='li' isChecked={removeTop} onChange={() => setRemoveTop(!removeTop)}></Switch>
                            </Flex>
                            <CheckboxContainer options={['Artist 1', 'Artist 2', 'Artist 3']} filterTitle={'Artist Filter'} />
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Flex>
        </Flex>
    );
};