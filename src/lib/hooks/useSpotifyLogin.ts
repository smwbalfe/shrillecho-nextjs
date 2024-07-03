import axios from 'axios';
import {fast_origin, nest_origin}  from '../config/vars';

export const useSpotifyLogin = (authed: any) => {
    const loginWithSpotify = async () => {
        if (!authed) {
            try {
                const response = await axios.get(`${fast_origin}/spotify-auth`, { withCredentials: true });
                window.location.href = response.data.url;
            } catch (error) {
                console.error('Error logging in:', error);
            }
        } else {
            console.log('Already logged in');
        }
    };

    return loginWithSpotify;
};