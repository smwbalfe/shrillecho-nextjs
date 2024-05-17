import { useEffect, useRef } from 'react';

const useScrollTracking = (callback: any) => {
    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            if (scrolled + windowHeight >= (documentHeight - 250)) {
                if (callback && typeof callback === 'function') {
                    callback();
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [callback]);
};

export default useScrollTracking;