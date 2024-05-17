import { useState, useEffect } from 'react';

export const useAudioPlayer = () => {
    const [playingAudio, setPlayingAudio] = useState<HTMLAudioElement | null>(null);

    const playAudio = (previewUrl: string, name: string) => {
        try {
           
            console.log(`playing audio: ${name}`)
            if (previewUrl !== '' && playingAudio) {
                playingAudio.pause();
                playingAudio.currentTime = 0; 
            }

            const audio = new Audio(previewUrl);
            setPlayingAudio(audio);
            audio.play().catch((error) => {});
        } catch (error) {
            
        }
    };

    const stopAudio = (name: string) => {
        try {
            console.log(`stopping audio: ${name}`)
            if (playingAudio) {
                playingAudio.pause();
                playingAudio.currentTime = 0; // Reset audio time
            }
        } catch (error) {
          
        }
    };

    useEffect(() => {
        return () => {
            if (playingAudio) {
                try {
                    playingAudio.pause();
                    playingAudio.currentTime = 0;
                } catch (error) {
        
                }
            }
        };
    }, [playingAudio]);

    return { playAudio, stopAudio };
};

export default useAudioPlayer;