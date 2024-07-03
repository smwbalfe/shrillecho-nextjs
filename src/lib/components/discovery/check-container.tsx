import { Flex, Switch, Checkbox, Text } from "@chakra-ui/react";
import { useState } from "react";

export type CheckboxContainerParams = {
    options: string[]
    filterTitle: String
}

export const CheckboxContainer = ({ options, filterTitle }: CheckboxContainerParams) => {
    
    const [inclusion, setInclusion] = useState<boolean>(false);

    return (
        <Flex
            borderWidth="3px"
            maxHeight="180px"
            minWidth="250px"
            backgroundColor="white"
            flexDir="column"
            overflowY="auto"
            justifyContent={'start'}
            display='inline-flex'
        >
            <Flex flexDir='row' alignItems={'center'} >
                <Switch size={'sm'} margin={'10px'} id='email-alerts' isChecked={inclusion} onChange={() => setInclusion(!inclusion)}></Switch>
                {
                    <>
                        <Text fontSize='0.75em' color='red'>{!inclusion && "Excluded"}</Text>
                        <Text fontSize='0.75em' color='green'>{inclusion && "Included"}</Text>
                    </>
                }
            </Flex>
            {
                options.map((item, index) => {
                    return (
                        <Checkbox
                            key={index}
                            value={item}
                            margin={'3px'}
                            marginLeft='5px'
                            size='md'
                        >
                            <Text fontSize={'0.75em'}>{item}</Text>
                        </Checkbox>
                    );
                })
            }
        </Flex>
    );
};