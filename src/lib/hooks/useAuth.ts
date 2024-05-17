import { useState, useEffect } from 'react';
import axios from 'axios';
import fast_origin from '../config/vars';
import { useSearchParams } from 'next/navigation';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const searchParams = useSearchParams()
    const [authed, setAuthed] = useState(false);



    useEffect(() => {
        const checkAuthCookie = () => {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith('shrillecho-biscuit=')) {
                    setAuthed(true);
                    break;
                }
            }
        };

        checkAuthCookie();
    }, []);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${fast_origin}/me`, { withCredentials: true });
                setUser(response.data.display_name);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (authed) {
            fetchUser();
        }
    }, [authed]);

    return { user, authed, setAuthed };
};