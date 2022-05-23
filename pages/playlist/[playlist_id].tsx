import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import { useRouter } from 'next/router';
import SpotifyWebApi from "spotify-web-api-node"
import Image from 'next/image';
import Link from 'next/link';

import { useAppContext } from './../../src/Config/Context';

// icons 
import BackButton from '../../src/assets/back_button.svg';
import TimeIcon from '../../src/assets/time_icon.svg';

// types
import { ContextInterface, PlayListDetailsType } from '../../types/types'; 
import TrackInfo from '../../src/Components/cards/TrackInfo';
import LoadingAnimation from '../../src/Components/Loading';

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
})

const Playlist: React.FC = () => {

    const [playlist, setPlaylist] = useState<PlayListDetailsType | null>(null);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const { accessToken, code } = useAppContext() as ContextInterface;

    useEffect(()=>{
        if(!code) router.replace('/');
    }, [code, router])

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)    
    }, [accessToken])

    useEffect(()=>{
        if(!accessToken) return;

        const playlist_id = router.asPath.split('/').slice(-1).toString();

        setLoading(true);
        spotifyApi.getPlaylist(playlist_id).then(res => {
            const playlist: PlayListDetailsType = {
                id: res.body.id,
                name: res.body.name,
                type: res.body.type,
                images: [
                    ...res.body.images.map((image)=>({
                        height: image.height,
                        width: image.width,
                        url: image.url
                    }))
                ],
                owner: {
                    id: res.body.owner.id,
                    displayName: res.body.owner.display_name,
                    url: res.body.owner.href,
                    uri: res.body.owner.uri
                },
                tracksNumber: res.body.tracks.total,
                tracks: res.body.tracks.items.map(track => ({
                    id: track.track.id,
                    addedBy: track.added_by.id,
                    addedOn: track.added_at,
                    name: track.track.name,
                    type: track.track.type,
                    duration_ms: track.track.duration_ms,
                    number: track.track.track_number,
                    url: track.track.href,
                    album: {
                        id: track.track.album.id,
                        name: track.track.album.name,
                        type: track.track.album.album_type,
                        images: track.track.album.images.map(image => ({
                            height: image.height,
                            width: image.width,
                            url: image.url,
                        })),
                    },
                    artists: track.track.artists.map(artist => ({
                        id: artist.id,
                        name: artist.name,
                        type: artist.type,
                    })),
                    uri: track.track.uri
                }))
            }
            setPlaylist(playlist);
            setLoading(false);
        })
        .catch((err)=>{
            console.error('playlist tracks error ' + err);
            setLoading(false);
        })
    }, [router.asPath, accessToken]);

    function calculateTime(){
        const time_ms: any = playlist?.tracks.map(item => item.duration_ms).reduce((prev, curr)=>{return prev + curr}, 0);

        let hours: number = Math.floor(time_ms / 3_600_000);
        let minutes: number = Math.floor((time_ms / 3_600_000 - hours) * 60);

        return `${hours} hr ${minutes} min`;
    }

    return (
        <>
            <Head>
            <title>{playlist ? playlist.name : 'playlist'}</title>
            <meta name="description" content="" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='flex-grow bg-[#121212] h-[calc(100vh-6rem)] overflow-y-scroll max-w-full playlist-scroll'>
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
                {loading ?
                    <LoadingAnimation />
                    :
                    playlist && <div className='px-8 py-5 w-full'>
                        <div className='flex flex-col md:flex-row'>
                            {playlist.images.length > 0 ?
                                <div className='w-56 h-56'>
                                    <Image
                                        alt='playlist cover'
                                        src={playlist.images[0].url}
                                        width={224}
                                        height={224}
                                    />
                                </div>
                                :
                                <div className='w-56 h-56 bg-black' />
                            }
                            <div className='flex flex-col justify-end items-start pt-5 md:pt-0 md:px-5 text-white'>
                                <p className='font-bold text-sm'>{playlist.type.toUpperCase()}</p>
                                <h2 className='text-8xl py-3 font-bold'>{playlist.name}</h2>
                                <div className='flex items-center text-sm'>
                                    <Link href={`/user/${playlist.owner?.id}`} passHref>
                                        <a className='font-bold'>{playlist.owner?.displayName}</a>
                                    </Link>
                                    <span className='w-1 h-1 rounded-full bg-white mx-1.5' />
                                    <p>{playlist.tracksNumber} songs, <span className='text-[#b3b3b3]'>{calculateTime()}</span></p>
                                </div>
                            </div>
                        </div>
                        <div className='w-full text-white py-10'>
                            <div className='flex items-center sticky z-50 top-16 bg-[#121212] text-[#b3b3b3] border-b border-[#b3b3b3] mb-3 text-sm'>
                                <div className='py-3 px-2 pl-4 text-left w-10 max-w-[2.5rem] min-w-[2.5rem] flex items-center justify-center'>#</div>
                                <div className='py-3 px-2 text-left md:min-w-[25vw] md:max-w-[25vh] md:w-[25vw] flex-grow md:flex-grow-0'>TITLE</div>
                                <div className='py-3 px-2 text-left flex-grow hidden md:block'>ALBUM</div>
                                <div className='py-3 px-2 text-left w-32 hidden lg:block'>DATE ADDED</div>
                                <div className='py-3 px-2 text-left w-12 max-w-[3rem] min-w-[3rem]'><TimeIcon /></div>
                            </div>
                            {playlist.tracks.map((track, index) => (
                                <TrackInfo key={track.id} track={track} index={index} />
                            ))}
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Playlist;