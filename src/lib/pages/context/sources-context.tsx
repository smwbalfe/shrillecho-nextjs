import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the structure of your sources object
interface Sources {
    playlistId: string
    trackId: string
}

interface SourceContextType {
    sources: Sources;
    setSources: React.Dispatch<React.SetStateAction<Sources>>;
}

const SourceContext = createContext<SourceContextType | undefined>(undefined);

export const useSources = (): SourceContextType => {
    const context = useContext(SourceContext);
    if (!context) {
        throw new Error('useSources must be used within a SourceProvider');
    }
    return context;
};

interface SourceProviderProps {
    children: ReactNode;
}

export const SourceProvider: React.FC<SourceProviderProps> = ({ children }) => {
    const [sources, setSources] = useState<Sources>({
        playlistId: '37i9dQZF1EpvYzGAuK2VGn',
        trackId: '314I2nRSP6p78j9wDyCEAp'
    });

    return (
        <SourceContext.Provider value={{ sources, setSources }}>
            {children}
        </SourceContext.Provider>
    );
};
