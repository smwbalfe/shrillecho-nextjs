import { ApolloError } from "@apollo/client";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";

export const NoDataCompoent: React.FC = () => {
    return (
        <Box textAlign="center" marginTop="5">
            <Text fontSize="xl" color="gray.500">
                No data available.
            </Text>
        </Box>
    );
}