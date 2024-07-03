import { Flex, Switch, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, Text } from "@chakra-ui/react";
import { filter } from "d3";
import { useEffect, useState } from "react";
import { useFilters } from "~/lib/pages/context/filter-context";

export const GeneralFilterComponent = () => {
    const { filters, setFilters } = useFilters();
    const [obscurityRange, setObscurityRange] = useState<[number, number]>([filters.obscurityRange.min, filters.obscurityRange.max]);
    const [followerRange, setFollowerRange] = useState<[number, number]>([filters.followerRange.min, filters.followerRange.max]);
    const [removeLiked, setRemoveLiked] = useState<boolean>(filters.removeLiked);

    const handleObscurityChangeEnd = (val: [number, number]) => {
        setObscurityRange(val);
        setFilters((prevFilters: any) => ({
            ...prevFilters,
            obscurityRange: {
                min: val[0],
                max: val[1]
            }
        }));
    };

    const handleFollowersChange = (val: [number, number]) => {
        setFollowerRange(val);
        setFilters((prevFilters: any) => ({
            ...prevFilters,
            followerRange: {
                min: val[0],
                max: val[1]
            }
        }));
    };


    const handleLikedButton = () => {
        setRemoveLiked(!removeLiked)
        setFilters((prevFilters: any) => ({
            ...prevFilters,
            removeLiked: removeLiked,
        }));
    }

    return (
        <Flex flexDir='column' borderWidth={'3px'} maxWidth={'400px'} marginLeft={'10px'}>
            <Flex alignItems={'center'}>
                <Text marginLeft='5px' fontSize={'0.85em'}>
                    Remove Liked Songs
                </Text>
                <Switch size={'sm'} margin={'10px'} id='li' isChecked={filters.removeLiked} onChange={() => handleLikedButton()} />
            </Flex>
       
            <Flex flexDir='column' marginTop='10px'>
                <Text fontSize={'0.85em'} marginLeft='5px' marginBottom='5px'>Obscurity</Text>
                <RangeSlider
                    aria-label={['min', 'max']}
                    defaultValue={[filters.obscurityRange.min, filters.obscurityRange.max]}
                    min={0}
                    max={100}
                    value={obscurityRange}
                    onChange={(val) => setObscurityRange(val as [number, number])}
                    onChangeEnd={handleObscurityChangeEnd}
                >
                    <RangeSliderTrack>
                        <RangeSliderFilledTrack />
                    </RangeSliderTrack>
                    <RangeSliderThumb index={0} />
                    <RangeSliderThumb index={1} />
                </RangeSlider>
                <Flex justifyContent='space-between' marginLeft='5px' marginRight='5px'>
                    <Text>{obscurityRange[0]}</Text>
                    <Text>{obscurityRange[1]}</Text>
                </Flex>
            </Flex>
            <Flex flexDir='column' marginTop='10px'>
                <Text fontSize={'0.85em'} marginLeft='5px' marginBottom='5px'>Followers</Text>
                <RangeSlider
                    aria-label={['min', 'max']}
                    defaultValue={[filters.followerRange.min, filters.followerRange.max]}
                    min={0}
                    max={100000}
                    value={followerRange}
                    onChange={(val) => setFollowerRange(val as [number, number])}
                    onChangeEnd={handleFollowersChange}
                >
                    <RangeSliderTrack>
                        <RangeSliderFilledTrack />
                    </RangeSliderTrack>
                    <RangeSliderThumb index={0} />
                    <RangeSliderThumb index={1} />
                </RangeSlider>
                <Flex justifyContent='space-between' marginLeft='5px' marginRight='5px'>
                    <Text>{followerRange[0]}</Text>
                    <Text>{followerRange[1]}</Text>
                </Flex>
            </Flex>
        </Flex>
    );
}
