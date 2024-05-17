import { ApolloError } from "@apollo/client";
import { Box, Flex, Spinner , Text} from "@chakra-ui/react";

export const LoadingComponent: React.FC = () => {
    return (
        <Flex justify="center" align="center" height="100vh">
            <Spinner />
        </Flex>
    );
}

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

export const NoDataCompoent: React.FC = () => {
    return (
        <Box textAlign="center" marginTop="5">
            <Text fontSize="xl" color="gray.500">
                No data available.
            </Text>
        </Box>
    );
}