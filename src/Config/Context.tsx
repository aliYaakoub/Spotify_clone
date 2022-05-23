import { useState, useContext, createContext, useEffect } from 'react';
import { useRouter } from "next/router"
import axios from "axios"

import { ContextInterface } from '../../types/types';

const AppContext = createContext<ContextInterface | null>(null);

export const useAppContext = () => {
    return useContext<ContextInterface | null>(AppContext);
}

export const AppContextProvider: React.FC = ({ children }) => {

  const [code, setCode] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [expiresIn, setExpiresIn] = useState(0);
  const [playlists, setPlaylists] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [playlistsSearchResults, setPlaylistsSearchResults] = useState(undefined);
  const [tracksSearchResults, setTracksSearchResults] = useState(undefined);
  const [albumsSearchResults, setAlbumsSearchResults] = useState(undefined);
  const [artistsSearchResults, setArtistsSearchResults] = useState(undefined);
  const [featuredPlaylists, setFeaturedPlaylists] = useState(undefined);
  const [newReleasedAlbums, setNewReleasedAlbums] = useState(undefined);
  const [userAlbums, setUserAlbums] = useState(undefined);
  const [userTopArtists, setUserTopArtists] = useState(undefined);
  const [userShows, setUserShows] = useState(undefined);
  const [followedArtists, setFollowedArtists] = useState(undefined);

  const [searchText, setSearchText] = useState('');

    // const tempAccessToken = useAuth();

    // useEffect(()=>{
    //     if(!tempAccessToken) return;
    //     setAccessToken(tempAccessToken);
    // }, [tempAccessToken])

    const router = useRouter();
  
  useEffect(() => {
    if(!code) return;
    if(refreshToken) return;
    axios.post("/api/login", {
      code,
      // refreshToken
    })
    .then(res => {
      setAccessToken(res.data.accessToken)
      setRefreshToken(res.data.refreshToken)
      setExpiresIn(res.data.expiresIn)
      // window.history.pushState({}, null, "/")
      // router.push("/home");
    })
    .catch((err) => {
      // window.location = "/"
      console.log(err);
      router.push('/');
    })
  }, [code])

  useEffect(() => {
    if (!refreshToken || !expiresIn) return
    const interval = setInterval(() => {
      axios
        .post("/api/refresh", {
          refreshToken,
        })
        .then(res => {
          setAccessToken(res.data.accessToken)
          setExpiresIn(res.data.expiresIn)
        })
        .catch(() => {
        //   window.location = "/"
          router.push('/');
        })
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)
  }, [refreshToken, expiresIn])

  const value: ContextInterface = {
    code,
    setCode,
    accessToken,
    refreshToken,
    expiresIn,
    setAccessToken,
    setRefreshToken,
    setExpiresIn,
    playlists,
    setPlaylists,
    currentTrack,
    setCurrentTrack,
    albumsSearchResults,
    setAlbumsSearchResults,
    artistsSearchResults,
    setArtistsSearchResults,
    playlistsSearchResults,
    setPlaylistsSearchResults,
    tracksSearchResults,
    setTracksSearchResults,
    searchText,
    setSearchText,
    featuredPlaylists,
    setFeaturedPlaylists,
    newReleasedAlbums, 
    setNewReleasedAlbums, 
    userAlbums, 
    setUserAlbums,
    userTopArtists,
    setUserTopArtists,
    userShows, 
    setUserShows,
    followedArtists, 
    setFollowedArtists
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}