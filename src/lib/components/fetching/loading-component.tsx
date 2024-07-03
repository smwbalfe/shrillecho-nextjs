import { ApolloError } from "@apollo/client";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react"; 

export const LoadingComponent: React.FC = () => {
    return (
        <Flex justify="center" align="center" height="100vh">
            <Spinner />
        </Flex>
    );
}