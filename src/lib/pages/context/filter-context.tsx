import React, { createContext, useContext, useState, ReactNode } from 'react';


interface ObscurityRange {
    min: number 
    max: number
    limit: number
}

interface FollowerRange {
    min: number
    max: number
    limit: number
}

interface Filter {
    removeLiked: boolean 
    showLiked: boolean
    obscurityRange: ObscurityRange
    followerRange: FollowerRange 
}

interface FilterContextType {
    filters: Filter;
    setFilters: React.Dispatch<React.SetStateAction<Filter>>;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilters = (): FilterContextType => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilters must be used within a FilterProvider');
    }
    return context;
};

interface FilterProviderProps {
    children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
    const [filters, setFilters] = useState<Filter>({
        removeLiked: false,
        showLiked: false,
        obscurityRange: {
            min: 0,
            max: 100,
            limit: 100
        },
        followerRange: {
            min: 0,
            max: 100,
            limit: 100
        }
    });

    return (
        <FilterContext.Provider value={{ filters, setFilters }}>
            {children}
        </FilterContext.Provider>
    );
};