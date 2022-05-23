import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import SpotifyWebApi from "spotify-web-api-node"

import AlbumCard from '../../../src/Components/cards/AlbumCard';
import ArtistCard from '../../../src/Components/cards/ArtistCard';
import SearchTrackInfo from '../../../src/Components/cards/SearchTrackInfo';
import LoadingAnimation from '../../../src/Components/Loading';
import { useAppContext } from '../../../src/Config/Context';

// types
import { ContextInterface } from '../../../types/types';
import SearchLayout from '../../../src/Components/layouts/SearchLayout';
import PlaylistCard from '../../../src/Components/cards/PlaylistCard';

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
})

const SearchResult: React.FC = () => {

    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
  
    const router = useRouter();
    const { 
      accessToken, 
      code, 
      playlistsSearchResults, 
      setPlaylistsSearchResults, 
      tracksSearchResults, 
      setTracksSearchResults,
      albumsSearchResults, 
      setAlbumsSearchResults,
      artistsSearchResults,
      setArtistsSearchResults
    } = useAppContext() as ContextInterface;
  
    useEffect(()=>{
        if(!code) router.replace('/');
    }, [code, router])

    useEffect(()=>{
        if(router.asPath.split('/').slice(-1).toString() === '') return;
        else setSearchText(router.asPath.split('/').slice(-1).toString());
    }, [router])
  
    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)    
    }, [accessToken])

    /* @ts-ignore */
    useEffect(()=>{
  
      if(!code) return;
      if (!accessToken) return
      if (!searchText) return setPlaylistsSearchResults(undefined)
      if (!searchText) return setTracksSearchResults(undefined)
      if (!searchText) return setAlbumsSearchResults(undefined)
      if (!searchText) return setArtistsSearchResults(undefined)
  
      let cancel = false;
      setLoading(true);
      spotifyApi.search(searchText, ['album', 'artist', 'playlist', 'track']).then(res => {
        console.log(res.body);
        if (cancel) return
        if (res.body.playlists && res.body.playlists?.items.length > 0){
          setPlaylistsSearchResults(
            res.body.playlists?.items.map(playlist=>({
              id: playlist.id,
              name: playlist.name,
              description: playlist.description,
              images: playlist.images.map((image)=>({
                height: image.height,
                width: image.width,
                url: image.url
              })),
              url: playlist.href,
              owner: {
                id: playlist.owner.id,
                displayName: playlist.owner.display_name,
                url: playlist.owner.href,
                uri: playlist.owner.uri
              },
              tracks: playlist.tracks.total,
              type: playlist.type,
              uri: playlist.uri,
              public: playlist.public
            }))
          )
        }
        if (res.body.albums && res.body.albums?.items.length > 0){
          setAlbumsSearchResults(
            res.body.albums?.items.map(album => ({
              id: album.id,
              name: album.name,
              type: album.album_type,
              images: album.images.map(image=>({
                height: image.height,
                width: image.width,
                url: image.url
              })),
              artists: album.artists.map(artist=>({
                id: artist.id,
                name: artist.name,
                type: artist.type
              })),
              releaseDate: album.release_date
            }))
          )
        }
        if (res.body.tracks && res.body.tracks?.items.length > 0){
          setTracksSearchResults(
            res.body.tracks.items.map(track => ({
              id: track.id,
              name: track.name,
              type: track.type,
              duration_ms: track.duration_ms,
              number: track.track_number,
              url: track.href,
              album: {
                  id: track.album.id,
                  name: track.album.name,
                  type: track.album.album_type,
                  images: track.album.images.map(image => ({
                      height: image.height,
                      width: image.width,
                      url: image.url,
                  })),
              },
              artists: track.artists.map(artist => ({
                  id: artist.id,
                  name: artist.name,
                  type: artist.type,
              }))
            }))
          )
        }
        if (res.body.artists && res.body.artists?.items.length > 0){
          setArtistsSearchResults(
            res.body.artists.items.map(artist => ({
              id: artist.id,
              name: artist.name,
              type: artist.type,
              images: artist.images.map(image => ({
                height: image.height,
                width: image.width,
                url: image.url,
              })),
            }))
          )
        }
        setLoading(false);
      })
      .catch((err)=>{
          console.error('search error ' + err);
          setLoading(false);
      })
  
      return () => (cancel = true)
    }, [searchText]);

    return (
        <div className='w-full h-[calc(100vh-10rem)] flex text-white '>
            <Head>
                <title>Spotify Clone</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='flex-grow bg-[#121212] '>
                {!loading ?
                    <div className='px-8 py-5'>
                        <div className=' text-white '>
                            {/* tracks */}
                            <div className='pb-10'>
                                <div className='flex items-center justify-between'>
                                    <h2 className='text-2xl font-bold pb-3'>Songs</h2>
                                    <Link href={`${router.asPath}/tracks`} passHref><a className='text-[#b3b3b3] text-sm font-bold'>SEE ALL</a></Link>
                                </div>
                                <div>
                                    {tracksSearchResults && tracksSearchResults.slice(0, 4).map((track, index) => (
                                        <SearchTrackInfo key={track.id} index={index} track={track}/>
                                    ))}
                                </div>
                            </div>
                            {/* artists */}
                            <div className='pb-10'>
                                <div className='flex items-center justify-between'>
                                    <h2 className='text-2xl font-bold pb-3'>Artists</h2>
                                    <Link href={`${router.asPath}/artists`} passHref><a className='text-[#b3b3b3] text-sm font-bold'>SEE ALL</a></Link>
                                </div>
                                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                                    {artistsSearchResults && artistsSearchResults.slice(0, 4).map(artist => (
                                        <ArtistCard key={artist.id} artist={artist} />
                                    ))}
                                </div>
                            </div>
                            {/* albums */}
                            <div className='pb-10'>
                                <div className='flex items-center justify-between'>
                                    <h2 className='text-2xl font-bold pb-3'>Albums</h2>
                                    <Link href={`${router.asPath}/albums`} passHref><a className='text-[#b3b3b3] text-sm font-bold'>SEE ALL</a></Link>
                                </div>
                                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                                    {albumsSearchResults && albumsSearchResults.slice(0, 4).map(album => (
                                        <AlbumCard key={album.id} album={album} />
                                    ))}
                                </div>
                            </div>
                            {/* playlists */}
                            <div className='pb-10'>
                                <div className='flex items-center justify-between'>
                                    <h2 className='text-2xl font-bold pb-3'>Playlists</h2>
                                    <Link href={`${router.asPath}/playlists`} passHref><a className='text-[#b3b3b3] text-sm font-bold'>SEE ALL</a></Link>
                                </div>
                                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                                    {playlistsSearchResults && playlistsSearchResults.slice(0, 4).map(playlist => (
                                        <PlaylistCard playlist={playlist} key={playlist.id} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <LoadingAnimation />
                }
            </div>
        </div>
    )
}

export default SearchResult;
/* @ts-ignore */
SearchResult.CustomLayout = SearchLayout;