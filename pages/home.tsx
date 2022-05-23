import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import SpotifyWebApi from "spotify-web-api-node"
import { useRouter } from 'next/router';
import Link from 'next/link';

// icons
import BackButton from '../src/assets/back_button.svg';

//types
import { ContextInterface } from '../types/types';

import { useAppContext } from '../src/Config/Context';
import LoadingAnimation from '../src/Components/Loading';
import PlaylistPreview from '../src/Components/cards/PlaylistPreview';
import FeaturedPlaylistCard from '../src/Components/cards/FeaturedPlaylistCard';
import AlbumCard from '../src/Components/cards/AlbumCard';
import PlaylistCard from '../src/Components/cards/PlaylistCard';
import UserAlbumCard from '../src/Components/cards/UserAlbumCard';

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
})

const Home: React.FC = () => {

  const router = useRouter();
  const { 
    code, 
    setPlaylists, 
    playlists, 
    accessToken, 
    setFeaturedPlaylists, 
    featuredPlaylists ,
    newReleasedAlbums,
    setNewReleasedAlbums,
    userAlbums,
    setUserAlbums,
    setUserTopArtists,
    userTopArtists,
    userShows,
    setUserShows,
    setFollowedArtists,
    followedArtists
  } = useAppContext() as ContextInterface;

  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if(!code) router.replace('/');
  }, [code, router])

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken])

  useEffect(()=>{
    if(!accessToken) return;
    
    if (playlists.length > 0 && featuredPlaylists && newReleasedAlbums) return;

    setLoading(true);
    spotifyApi
      .getUserPlaylists()
      .then((res)=>{
        setPlaylists(
          res.body.items.map((playlist)=> ({
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
      })
      .catch((err)=>{
        console.error('playlist error' + err)
      });

    spotifyApi
      .getFeaturedPlaylists({country: 'lb'})
      .then(res => {
        setFeaturedPlaylists({
          message: res.body.message,
          playlists: res.body.playlists.items.map((playlist)=> {
            return {
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
            }
          })
        })
      })
      .catch(err => {
        console.log('featured playlists ', err.message);
      })

    spotifyApi.getMyTopArtists()
      .then((res)=>{
      setUserTopArtists(
        res.body.items.map((artist)=> ({
            id: artist.id,
            name: artist.name,
            type: artist.type,
            images: artist.images.map(image=>({
              height: image.height,
              width: image.width,
              url: image.url
            }))
          }))
        )
      })
      .catch((err)=>{
        console.error('top artists error' + err)
      });

    spotifyApi.getFollowedArtists()
      .then((res)=>{
      console.log(res.body);
      setFollowedArtists(
        res.body.artists.items.map((artist)=> ({
            id: artist.id,
            name: artist.name,
            type: artist.type,
            images: artist.images.map(image=>({
              height: image.height,
              width: image.width,
              url: image.url
            }))
          }))
        )
      })
      .catch((err)=>{
        console.error('top artists error' + err)
      });

    spotifyApi.getMySavedShows()
      .then((res)=>{
      setUserShows(
        res.body.items.map((show)=> ({
            id: show.show.id,
            name: show.show.name,
            type: show.show.type,
            publisher: show.show.publisher,
            description: show.show.description,
            mediaType: show.show.media_type,
            addedAt: show.added_at,
            totalEpisodes: show.show.total_episodes,
            languages: show.show.languages.map((lang => ( lang ))),
            images: show.show.images.map(image=>({
              height: image.height,
              width: image.width,
              url: image.url
            }))
          }))
        )
      })
      .catch((err)=>{
        console.error('podcasts error' + err)
      });

    spotifyApi
      .getNewReleases()
      .then(res => {
        setNewReleasedAlbums(
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
      })
      .catch(err => {
        console.error('new released', err.message)
      })

    spotifyApi
      .getMySavedAlbums()
      .then((res) => {
        setUserAlbums(
          res.body.items.map(album => ({
            addedAt: album.added_at,
            id: album.album.id,
            name: album.album.name,
            type: album.album.album_type,
            images: album.album.images.map(image=>({
              height: image.height,
              width: image.width,
              url: image.url
            })),
            artists: album.album.artists.map(artist=>({
              id: artist.id,
              name: artist.name,
              type: artist.type
            })),

          }))
        )
      })
      .catch((err) => {
        console.error(err)
      })

    setLoading(false);
  }, [accessToken, setPlaylists, playlists, setFeaturedPlaylists, featuredPlaylists, newReleasedAlbums, setNewReleasedAlbums, setUserAlbums, userAlbums]);
  
  return (
    <div className='w-screen h-[calc(100vh-6rem)] flex text-white'>
      <Head>
        <title>Spotify Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex-grow bg-[#121212] overflow-y-scroll playlist-scroll'>
        <div className='sticky top-0 left-0 w-full h-16 bg-[#121212] flex items-center px-8 z-50'>
          <div className='flex items-center justify-between w-20'>
            <button onClick={router.back} className='rounded-full w-8 h-8 bg-black flex items-center justify-center'>
              <BackButton />
            </button>
            {/* <button className='rounded-full w-8 h-8 bg-black flex items-center justify-center'>
              <NextButton />
            </button> */}
          </div>
        </div>
        {!loading ? 
          <div className='px-8 py-5'>
            {/* TODO: make it change by time */}
            <h2 className='text-[2rem] font-bold pt-5 pb-5'>Good evening</h2>
            <div className='grid grid-cols-3 gap-6'>
              {playlists && playlists.slice(0, 6).map(playlist => (
                <PlaylistPreview key={playlist.id} data={playlist} />
              ))}
            </div>
            {featuredPlaylists &&
              <>
                <div className='flex items-center justify-between pt-14 pb-4'>
                  <h2 className='text-2xl font-bold'>{featuredPlaylists.message}</h2>
                  <Link href={`/h/featured`} passHref><a className='text-[#b3b3b3] text-xs font-bold'>SEE ALL</a></Link>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                  {featuredPlaylists.playlists.slice(0, 4).map(playlist => (
                    <FeaturedPlaylistCard key={playlist.id} playlist={playlist} />
                  ))}
                </div>
              </>
            }
            {newReleasedAlbums &&
              <>
                <div className='flex items-center justify-between pt-14 pb-4'>
                  <h2 className='text-2xl font-bold'>New Released</h2>
                  <Link href={`/h/new`} passHref><a className='text-[#b3b3b3] text-xs font-bold'>SEE ALL</a></Link>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                  {newReleasedAlbums.slice(0, 4).map(album => (
                    <AlbumCard key={album.id} album={album} />
                  ))}
                </div>
              </>
            }
            {playlists &&
              <>
                <div className='flex items-center justify-between pt-14 pb-4'>
                  <h2 className='text-2xl font-bold'>Your Playlists</h2>
                  <Link href={`/user/playlists`} passHref><a className='text-[#b3b3b3] text-xs font-bold'>SEE ALL</a></Link>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                  {playlists.slice(0, 4).map(playlist => (
                    <PlaylistCard key={playlist.id} playlist={playlist} />
                  ))}
                </div>
              </>
            }
            {userAlbums &&
              <>
                <div className='flex items-center justify-between pt-14 pb-4'>
                  <h2 className='text-2xl font-bold'>Albums You Follow</h2>
                  <Link href={`/user/albums`} passHref><a className='text-[#b3b3b3] text-xs font-bold'>SEE ALL</a></Link>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                  {userAlbums.slice(0, 4).map(album => (
                    <UserAlbumCard key={album.id} album={album} />
                  ))}
                </div>
              </>
            }
          </div>
          :
          <LoadingAnimation />
        }
      </div>
    </div>
  )
}

export default Home