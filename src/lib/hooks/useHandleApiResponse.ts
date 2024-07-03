import { useState, useEffect } from 'react';
import axios, { Method } from 'axios';

// Define a TypeScript interface for the return type of the hook
interface ApiResponse {
    data: any; // You can specify a more specific type based on expected data structure
    errorCode: string | number | null;
}

const useApiRequest = (url: string, method: Method): ApiResponse => {
    const [data, setData] = useState<any>(null);
    const [errorCode, setErrorCode] = useState<string | number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios({
                    method: method,
                    url: url,
                });
                setData(response.data);
                setErrorCode(200); // Reset error code on success
            } catch (error: any) {
                if (error.response) {
                    // Handle HTTP error responses from the server
                    
                    setErrorCode(error.response.status);
                } else {
                    // Handle errors not related to HTTP responses (e.g., network issues)
                    setErrorCode('Network Error');
                }
            }
        };

        fetchData();
    }, [url, method]);

    return { data, errorCode };
};

export default useApiRequest;
