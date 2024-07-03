import { Box, Divider, Flex, Heading } from '@chakra-ui/react';

const Footer = () => {
    return (
        <>
            <Flex
                direction="column"
                backgroundColor="white"
                alignItems="center"
                position="fixed"  // Fix the position to the bottom
                bottom="0"        // Set it to the bottom
                width="100%"      // Make it full width
                height="40px"     // Optionally, you can set a specific height
             
            >
                <Divider borderWidth={'1px'} borderColor={'black'} width="100%" marginBottom={'10px'} />
                <Box backgroundColor="purple">
                    <Heading backgroundColor="white" size="sm">Music Tool</Heading>
                </Box>
            </Flex>
        </>
    );
};

export default Footer;