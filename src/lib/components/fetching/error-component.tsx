import { ApolloError } from "@apollo/client";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";

interface ErrorProps {
    error: ApolloError | undefined
}

export const ErrorComponent: React.FC<ErrorProps> = ({ error }) => {
    return (
        <Box textAlign="center" marginTop="5">
            <Text fontSize="xl" color="red.500">
                {`error : ${error}`}
            </Text>
        </Box>
    );
}