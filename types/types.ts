import React from "react";

export type PlaylistType = {
    id: string;
    name: string;
    description: string | null;
    images: ImageType[] | undefined;
    owner: PlaylistOwnerType | undefined;
    public: boolean | null;
    tracks: number;
    url: string;
    uri: string;
    type: string;
}

export type PlayListDetailsType = {
    id: string;
    name: string;
    images: ImageType[];
    owner: PlaylistOwnerType | undefined;
    tracksNumber: number;
    tracks: PlaylistTrackType[];
    type: string;
}

export type AlbumDetailsType = {
    id: string;
    name: string;
    artists: ShortArtistType[];
    images: ImageType[];
    albumType: string;
    tracksNumber: number;
    tracks: AlbumTrackType[];
    type: string;
    releaseDate: string;
    label: string;
}

export type AlbumTrackType = {
    id: string;
    type: string;
    name: string;
    artists: ShortArtistType[];
    duration_ms: number;
}

export type PlaylistTrackType = {
    id: string;
    addedOn: string;
    addedBy: string;
    number: number;
    type: string;
    url: string;
    uri: string;
    name: string;
    artists: ShortArtistType[];
    duration_ms: number;
    album: TrackAlbumType;
}

export type SearchTrackType = {
    id: string;
    number: number;
    type: string;
    url: string;
    name: string;
    artists: ShortArtistType[];
    duration_ms: number;
    album: TrackAlbumType;
}

export type TrackAlbumType = {
    id: string;
    type: string;
    name: string;
    images: ImageType[];
}

export type AlbumType = {
    id: string;
    type: string;
    name: string;
    images: ImageType[];
    artists: ShortArtistType[];
    releaseDate: string;
}

export type ShortArtistType = {
    id: string;
    name: string;
    type: string;
}

export type ArtistType = {
    id: string;
    name: string;
    type: string;
    images: ImageType[];
}

export type ArtistDetailsType = {
    id: string;
    name: string;
    type: string;
    images: ImageType[];
    followers: string;
}

export type ImageType = {
    height: number | undefined;
    width: number | undefined;
    url: string;
}

export type PlaylistOwnerType = {
    id: string;
    displayName: string | undefined;
    uri: string;
    url: string;
}

export interface ContextInterface {
    code: string;
    setCode: React.Dispatch<React.SetStateAction<string | any>>;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    setAccessToken: React.Dispatch<React.SetStateAction<string>>;
    setRefreshToken: React.Dispatch<React.SetStateAction<string>>;
    setExpiresIn: React.Dispatch<React.SetStateAction<number>>;
    playlists: PlaylistType[];
    setPlaylists: React.Dispatch<React.SetStateAction<any>> // TODO: to be corrected
    currentTrack: PlaylistTrackType | null;
    setCurrentTrack: React.Dispatch<React.SetStateAction<any>>;
    playlistsSearchResults: PlaylistType[] | undefined;
    setPlaylistsSearchResults: React.Dispatch<React.SetStateAction<PlaylistType[] | any>>;
    tracksSearchResults: SearchTrackType[] | undefined;
    setTracksSearchResults: React.Dispatch<React.SetStateAction<SearchTrackType[] | any>>;
    albumsSearchResults: AlbumType[] | undefined;
    setAlbumsSearchResults: React.Dispatch<React.SetStateAction<AlbumType[] | any>>;
    artistsSearchResults: ArtistType[] | undefined;
    setArtistsSearchResults: React.Dispatch<React.SetStateAction<ArtistType[] | any>>;
    searchText: string;
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
    featuredPlaylists: FeaturedPlaylistsType | undefined;
    setFeaturedPlaylists: React.Dispatch<React.SetStateAction<FeaturedPlaylistsType | any>>;
    newReleasedAlbums: AlbumType[] | undefined;
    setNewReleasedAlbums: React.Dispatch<React.SetStateAction<AlbumType[] | any>>;
    userAlbums: UserAlbum[] | undefined;
    setUserAlbums: React.Dispatch<React.SetStateAction<UserAlbum[] | any>>;
    userTopArtists: ArtistType[] | undefined;
    setUserTopArtists: React.Dispatch<React.SetStateAction<ArtistType[] | any>>;
    userShows: ShowType[] | undefined;
    setUserShows: React.Dispatch<React.SetStateAction<ShowType[] | any>>;
    followedArtists: ArtistType[] | undefined;
    setFollowedArtists: React.Dispatch<React.SetStateAction<ArtistType[] | any>>;
}

export type UserAlbum = {
    id: string;
    name: string;
    type: string;
    label: string;
    addedAt: string;
    albumType: string;
    tracksNum: number;
    images: ImageType[];
    artists: ShortArtistType[];
    tracks: SearchTrackType[];
}

export type FeaturedPlaylistsType = {
    message: string;
    playlists: PlaylistType[];
}

export type userInfo = {
    name: string;
}

export type SearchBoxProps = {
    searchText: string;
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

export type CategoryType = {
    id: string;
    name: string;
    icon: ImageType;
}

export type ArtistTrackType = {
    id: string;
    type: string;
    url: string;
    name: string;
    duration_ms: number;
}

export type ShowType = {
    id: string;
    type: string;
    name: string;
    addedAt: string;
    description: string;
    images: ImageType[];
    publisher: string;
    mediaType: string;
    totalEpisodes: number;
    languages: string[];
}