import { Box, Flex, Heading } from '@chakra-ui/react';

const Footer = () => {
    return (
        <Flex
            direction="column"
            backgroundColor="white"
            align="center"
            justify="center"
            position="fixed"  // Fix the position to the bottom
            bottom="0"        // Set it to the bottom
            width="100%"      // Make it full width
            height="60px"     // Optionally, you can set a specific height
        >
            <Box backgroundColor="purple">
                <Heading backgroundColor="white" size="sm">Music Tool</Heading>
            </Box>
        </Flex>
    );
};

export default Footer;