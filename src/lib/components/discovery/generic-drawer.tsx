import { Box, Button, Drawer, Text, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Heading, useDisclosure } from "@chakra-ui/react";

export const GenericDrawerButton = ({ title, icon: Icon, children }: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button borderWidth={'1px'} colorScheme='teal' borderColor='black' variant='outline' onClick={onOpen}>
                <Flex flexDirection={'row'} alignItems={'center'}>
                    <Text textTransform={'none'}>{title}</Text>
                    <Box margin='5px'>
                        <Icon />
                    </Box>
                </Flex>
            </Button>
         
            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
               
                <DrawerContent minWidth={'400px'}>
                    <DrawerHeader borderBottomWidth='1px'>
                        <Flex flexDirection={'row'} justifyContent={'flex-start'}>
                            <Heading size='md'>{title}</Heading>
                            <Box margin='5px'>
                                <Icon />
                            </Box>
                        </Flex>
                    </DrawerHeader>
                    <DrawerBody paddingLeft='0'>
                      
                            <Flex flexDirection={'column'} justifyContent={'flex-start'}>
                                {children}
                            </Flex>
                       
                    </DrawerBody>
                </DrawerContent>
              
            </Drawer>
       
        </>
    );
};