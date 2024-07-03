'use client'
import React from 'react';
import { useCreatePlaylistMutation } from '~/lib/graphql/typescript_gen/generated';


export const App: React.FC = () => {
    const [createPlaylist, { data, loading, error }] = useCreatePlaylistMutation(
        {
            // refetchQueries: [{query: GetCurrentUserPlaylistsDocument}]
        }
    );

    const handleCreatePlaylist = async () => {
        try {
            const response = await createPlaylist({
                variables: {
                    CreatePlaylistInput: {
                        playlistId: '123'
                    }
                }
            });
            if (response?.data?.createPlaylist) {
                console.log('Playlist created successfully');
            } else {
                console.log('Failed to create playlist');
            }
        } catch (err) {
            console.error('Error creating playlist:', err);
        }
    };

    return (
        <div>
            <button onClick={handleCreatePlaylist} disabled={loading}>
                {loading ? 'Creating...' : 'Create Playlist'}
            </button>
            {error && <p>Error: {error.message}</p>}
            {data && data.createPlaylist && <p>Playlist created successfully!</p>}
        </div>
    );
};

