import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddedBy = {
  __typename?: 'AddedBy';
  externalUrls: ExternalUrls;
  followers: Followers;
  href: Scalars['String']['output'];
  id: Scalars['String']['output'];
  type: Scalars['String']['output'];
  uri: Scalars['String']['output'];
};

export type Album = {
  __typename?: 'Album';
  albumType: Scalars['String']['output'];
  artists: Array<Artist>;
  availableMarkets: Array<Scalars['String']['output']>;
  copyrights: Array<Copyright>;
  externalIds: ExternalIds;
  externalUrls: ExternalUrls;
  genres: Array<Scalars['String']['output']>;
  href: Scalars['String']['output'];
  id: Scalars['String']['output'];
  images: Array<Image>;
  label: Scalars['String']['output'];
  name: Scalars['String']['output'];
  popularity: Scalars['Int']['output'];
  releaseDate: Scalars['String']['output'];
  releaseDatePrecision: Scalars['String']['output'];
  restrictions: Restrictions;
  totalTracks: Scalars['Int']['output'];
  tracks: AlbumTracks;
  type: Scalars['String']['output'];
  uri: Scalars['String']['output'];
};

export type AlbumTracks = {
  __typename?: 'AlbumTracks';
  href: Scalars['String']['output'];
  items: Array<SimplifiedTrack>;
  limit: Scalars['Int']['output'];
  next: Scalars['String']['output'];
  offset: Scalars['Int']['output'];
  previous: Scalars['String']['output'];
  total: Scalars['Int']['output'];
};

export type Artist = {
  __typename?: 'Artist';
  externalUrls: ExternalUrls;
  followers?: Maybe<Followers>;
  genres?: Maybe<Array<Scalars['String']['output']>>;
  href: Scalars['String']['output'];
  id: Scalars['String']['output'];
  images: Array<Image>;
  name: Scalars['String']['output'];
  popularity: Scalars['Int']['output'];
  type: Scalars['String']['output'];
  uri: Scalars['String']['output'];
};

export type Copyright = {
  __typename?: 'Copyright';
  text: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type ExternalIds = {
  __typename?: 'ExternalIds';
  ean: Scalars['String']['output'];
  isrc: Scalars['String']['output'];
  upc: Scalars['String']['output'];
};

export type ExternalUrls = {
  __typename?: 'ExternalUrls';
  spotify: Scalars['String']['output'];
};

export type Followers = {
  __typename?: 'Followers';
  href: Scalars['String']['output'];
  total: Scalars['Int']['output'];
};

export type Image = {
  __typename?: 'Image';
  height: Scalars['Int']['output'];
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type LinkedFrom = {
  __typename?: 'LinkedFrom';
  externalUrls: ExternalUrls;
  href: Scalars['String']['output'];
  id: Scalars['String']['output'];
  type: Scalars['String']['output'];
  uri: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPlaylist: Scalars['String']['output'];
};


export type MutationCreatePlaylistArgs = {
  playlistCreateInput: PlaylistTracksInput;
};

export type Owner = {
  __typename?: 'Owner';
  displayName: Scalars['String']['output'];
  externalUrls: ExternalUrls;
  followers: Followers;
  href: Scalars['String']['output'];
  id: Scalars['String']['output'];
  type: Scalars['String']['output'];
  uri: Scalars['String']['output'];
};

export type Playlist = {
  __typename?: 'Playlist';
  collaborative: Scalars['Boolean']['output'];
  description: Scalars['String']['output'];
  externalUrls: ExternalUrls;
  followers: Followers;
  href: Scalars['String']['output'];
  id: Scalars['String']['output'];
  images: Array<Image>;
  name: Scalars['String']['output'];
  owner: Owner;
  public: Scalars['Boolean']['output'];
  snapshotId: Scalars['String']['output'];
  tracks: PlaylistTracks;
  type: Scalars['String']['output'];
  uri: Scalars['String']['output'];
};

export type PlaylistTrack = {
  __typename?: 'PlaylistTrack';
  addedAt: Scalars['String']['output'];
  addedBy: AddedBy;
  isLocal: Scalars['Boolean']['output'];
  track: Track;
};

export type PlaylistTracks = {
  __typename?: 'PlaylistTracks';
  href: Scalars['String']['output'];
  items: Array<PlaylistTrack>;
  limit: Scalars['Int']['output'];
  next: Scalars['String']['output'];
  offset: Scalars['Int']['output'];
  previous: Scalars['String']['output'];
  total: Scalars['Int']['output'];
};

export type PlaylistTracksInput = {
  maxFollowers: Scalars['Int']['input'];
  maxObscurityValue: Scalars['Int']['input'];
  minFollowers: Scalars['Int']['input'];
  minObscurityValue: Scalars['Int']['input'];
  playlistId: Scalars['String']['input'];
  removeLiked: Scalars['Boolean']['input'];
};

export type Query = {
  __typename?: 'Query';
  artist: Artist;
  playlist: Playlist;
  playlistTracks: Array<Track>;
  track: Track;
};


export type QueryArtistArgs = {
  artistId: Scalars['String']['input'];
};


export type QueryPlaylistArgs = {
  playlistId: Scalars['String']['input'];
};


export type QueryPlaylistTracksArgs = {
  playlistTracksInput: PlaylistTracksInput;
};


export type QueryTrackArgs = {
  trackId: Scalars['String']['input'];
};

export type Restrictions = {
  __typename?: 'Restrictions';
  reason: Scalars['String']['output'];
};

export type SimplifiedTrack = {
  __typename?: 'SimplifiedTrack';
  artists: Array<Artist>;
  availableMarkets: Array<Scalars['String']['output']>;
  discNumber: Scalars['Int']['output'];
  durationMs: Scalars['Int']['output'];
  explicit: Scalars['Boolean']['output'];
  externalUrls: ExternalUrls;
  href: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isLocal: Scalars['Boolean']['output'];
  isPlayable: Scalars['Boolean']['output'];
  linkedFrom: LinkedFrom;
  name: Scalars['String']['output'];
  previewUrl: Scalars['String']['output'];
  restrictions: Restrictions;
  trackNumber: Scalars['Int']['output'];
  type: Scalars['String']['output'];
  uri: Scalars['String']['output'];
};

export type Track = {
  __typename?: 'Track';
  album: Album;
  artists: Array<Artist>;
  availableMarkets: Array<Scalars['String']['output']>;
  discNumber: Scalars['Int']['output'];
  durationMs: Scalars['Int']['output'];
  explicit: Scalars['Boolean']['output'];
  externalIds: ExternalIds;
  externalUrls: ExternalUrls;
  href: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isLocal: Scalars['Boolean']['output'];
  isPlayable: Scalars['Boolean']['output'];
  liked?: Maybe<Scalars['Boolean']['output']>;
  linkedFrom: LinkedFrom;
  name: Scalars['String']['output'];
  popularity: Scalars['Int']['output'];
  previewUrl?: Maybe<Scalars['String']['output']>;
  restrictions: Restrictions;
  trackNumber: Scalars['Int']['output'];
  type: Scalars['String']['output'];
  uri: Scalars['String']['output'];
};

export type CreatePlaylistMutationVariables = Exact<{
  CreatePlaylistInput: PlaylistTracksInput;
}>;


export type CreatePlaylistMutation = { __typename?: 'Mutation', createPlaylist: string };

export type GetPlaylistQueryVariables = Exact<{
  playlistId: Scalars['String']['input'];
  playlistTracksInput: PlaylistTracksInput;
}>;


export type GetPlaylistQuery = { __typename?: 'Query', playlistTracks: Array<{ __typename?: 'Track', name: string, previewUrl?: string | null, liked?: boolean | null, popularity: number, album: { __typename?: 'Album', images: Array<{ __typename?: 'Image', url: string }> }, artists: Array<{ __typename?: 'Artist', name: string, id: string, genres?: Array<string> | null, followers?: { __typename?: 'Followers', total: number } | null }> }>, playlist: { __typename?: 'Playlist', name: string, images: Array<{ __typename?: 'Image', url: string }>, owner: { __typename?: 'Owner', displayName: string }, tracks: { __typename?: 'PlaylistTracks', total: number } } };

export type GetTrackQueryVariables = Exact<{
  track_id: Scalars['String']['input'];
}>;


export type GetTrackQuery = { __typename?: 'Query', track: { __typename?: 'Track', name: string, durationMs: number } };


export const CreatePlaylistDocument = gql`
    mutation CreatePlaylist($CreatePlaylistInput: PlaylistTracksInput!) {
  createPlaylist(playlistCreateInput: $CreatePlaylistInput)
}
    `;
export type CreatePlaylistMutationFn = Apollo.MutationFunction<CreatePlaylistMutation, CreatePlaylistMutationVariables>;

/**
 * __useCreatePlaylistMutation__
 *
 * To run a mutation, you first call `useCreatePlaylistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlaylistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlaylistMutation, { data, loading, error }] = useCreatePlaylistMutation({
 *   variables: {
 *      CreatePlaylistInput: // value for 'CreatePlaylistInput'
 *   },
 * });
 */
export function useCreatePlaylistMutation(baseOptions?: Apollo.MutationHookOptions<CreatePlaylistMutation, CreatePlaylistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePlaylistMutation, CreatePlaylistMutationVariables>(CreatePlaylistDocument, options);
      }
export type CreatePlaylistMutationHookResult = ReturnType<typeof useCreatePlaylistMutation>;
export type CreatePlaylistMutationResult = Apollo.MutationResult<CreatePlaylistMutation>;
export type CreatePlaylistMutationOptions = Apollo.BaseMutationOptions<CreatePlaylistMutation, CreatePlaylistMutationVariables>;
export const GetPlaylistDocument = gql`
    query GetPlaylist($playlistId: String!, $playlistTracksInput: PlaylistTracksInput!) {
  playlistTracks(playlistTracksInput: $playlistTracksInput) {
    name
    album {
      images {
        url
      }
    }
    artists {
      name
      id
      genres
      followers {
        total
      }
    }
    previewUrl
    liked
    popularity
  }
  playlist(playlistId: $playlistId) {
    name
    images {
      url
    }
    owner {
      displayName
    }
    tracks {
      total
    }
  }
}
    `;

/**
 * __useGetPlaylistQuery__
 *
 * To run a query within a React component, call `useGetPlaylistQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlaylistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlaylistQuery({
 *   variables: {
 *      playlistId: // value for 'playlistId'
 *      playlistTracksInput: // value for 'playlistTracksInput'
 *   },
 * });
 */
export function useGetPlaylistQuery(baseOptions: Apollo.QueryHookOptions<GetPlaylistQuery, GetPlaylistQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlaylistQuery, GetPlaylistQueryVariables>(GetPlaylistDocument, options);
      }
export function useGetPlaylistLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlaylistQuery, GetPlaylistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlaylistQuery, GetPlaylistQueryVariables>(GetPlaylistDocument, options);
        }
export function useGetPlaylistSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPlaylistQuery, GetPlaylistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPlaylistQuery, GetPlaylistQueryVariables>(GetPlaylistDocument, options);
        }
export type GetPlaylistQueryHookResult = ReturnType<typeof useGetPlaylistQuery>;
export type GetPlaylistLazyQueryHookResult = ReturnType<typeof useGetPlaylistLazyQuery>;
export type GetPlaylistSuspenseQueryHookResult = ReturnType<typeof useGetPlaylistSuspenseQuery>;
export type GetPlaylistQueryResult = Apollo.QueryResult<GetPlaylistQuery, GetPlaylistQueryVariables>;
export const GetTrackDocument = gql`
    query GetTrack($track_id: String!) {
  track(trackId: $track_id) {
    name
    durationMs
  }
}
    `;

/**
 * __useGetTrackQuery__
 *
 * To run a query within a React component, call `useGetTrackQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTrackQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTrackQuery({
 *   variables: {
 *      track_id: // value for 'track_id'
 *   },
 * });
 */
export function useGetTrackQuery(baseOptions: Apollo.QueryHookOptions<GetTrackQuery, GetTrackQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTrackQuery, GetTrackQueryVariables>(GetTrackDocument, options);
      }
export function useGetTrackLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTrackQuery, GetTrackQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTrackQuery, GetTrackQueryVariables>(GetTrackDocument, options);
        }
export function useGetTrackSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTrackQuery, GetTrackQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTrackQuery, GetTrackQueryVariables>(GetTrackDocument, options);
        }
export type GetTrackQueryHookResult = ReturnType<typeof useGetTrackQuery>;
export type GetTrackLazyQueryHookResult = ReturnType<typeof useGetTrackLazyQuery>;
export type GetTrackSuspenseQueryHookResult = ReturnType<typeof useGetTrackSuspenseQuery>;
export type GetTrackQueryResult = Apollo.QueryResult<GetTrackQuery, GetTrackQueryVariables>;