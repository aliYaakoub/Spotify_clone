import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import { useRouter } from 'next/router';
import SpotifyWebApi from "spotify-web-api-node"
import Image from 'next/image';
import Link from 'next/link';

import { useAppContext } from './../../src/Config/Context';
import LoadingAnimation from '../../src/Components/Loading';
import AlbumTrackInfo from '../../src/Components/cards/AlbumTrackInfo';

// icons 
import BackButton from '../../src/assets/back_button.svg';
import TimeIcon from '../../src/assets/time_icon.svg';

// types
import { ContextInterface, AlbumDetailsType } from '../../types/types'; 

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
})

const Album: React.FC = () => {

    const [album, setAlbum] = useState<AlbumDetailsType | null>(null);
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

        const album_id = router.asPath.split('/').slice(-1).toString();

        setLoading(true);
        spotifyApi.getAlbum(album_id).then(res => {
            console.log(res.body)
            setAlbum({
                id: res.body.id,
                name: res.body.name,
                type: res.body.type,
                albumType: res.body.album_type,
                label: res.body.label,
                images: [
                    ...res.body.images.map((image)=>({
                        height: image.height,
                        width: image.width,
                        url: image.url
                    }))
                ],
                tracksNumber: res.body.total_tracks,
                tracks: res.body.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    type: track.type,
                    duration_ms: track.duration_ms,
                    number: track.track_number,
                    url: track.href,
                    artists: track.artists.map(artist => ({
                        id: artist.id,
                        name: artist.name,
                        type: artist.type,
                    }))
                })),
                artists: res.body.artists.map(artist => ({
                    id: artist.id,
                    name: artist.name,
                    type: artist.type,
                })),
                releaseDate: res.body.release_date
            })
            setLoading(false);
        })
        .catch((err)=>{
            console.error('playlist tracks error ' + err);
            setLoading(false);
        })
    }, [router.asPath, accessToken]);

    function calculateTime(){
        const time_ms: any = album?.tracks.map(item => item.duration_ms).reduce((prev, curr)=>{return prev + curr}, 0);

        let hours: number = Math.floor(time_ms / 3_600_000);
        let minutes: number = Math.floor((time_ms / 3_600_000 - hours) * 60);

        return `${hours} hr ${minutes} min`;
    }

    return (
        <>
            <Head>
            <title>{album ? album.name : 'playlist'}</title>
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
                    album && <div className='px-8 py-5 w-full'>
                        <div className='flex flex-col md:flex-row'>
                            {album.images.length > 0 ?
                                <div className='w-56 h-56'>
                                    <Image
                                        alt='album cover'
                                        src={album.images[0].url}
                                        width={224}
                                        height={224}
                                    />
                                </div>
                                :
                                <div className='w-56 h-56 bg-black' />
                            }
                            <div className='flex flex-col justify-end items-start pt-5 md:pt-0 md:px-5 text-white'>
                                <p className='font-bold text-sm'>{album.albumType.toUpperCase()}</p>
                                <h2 className='text-8xl py-3 font-bold'>{album.name}</h2>
                                <div className='flex items-center text-sm'>
                                    <Link href={`/artist/${album.artists[0]?.id}`} passHref>
                                        <a className='font-bold'>{album.artists[0]?.name}</a>
                                    </Link>
                                    <span className='w-1 h-1 rounded-full bg-white mx-1.5' />
                                    <p>{album.tracksNumber} songs, <span className='text-[#b3b3b3]'>{calculateTime()}</span></p>
                                </div>
                            </div>
                        </div>
                        <div className='w-full text-white py-10'>
                            <div className='flex items-center sticky z-50 top-16 bg-[#121212] text-[#b3b3b3] border-b border-[#b3b3b3] mb-3 text-sm'>
                                <div className='py-3 px-2 pl-4 text-left w-10 max-w-[2.5rem] min-w-[2.5rem] flex items-center justify-center'>#</div>
                                <div className='py-3 px-2 text-left flex-grow '>TITLE</div>
                                <div className='py-3 px-2 text-left w-12 max-w-[3rem] min-w-[3rem]'><TimeIcon /></div>
                            </div>
                            {album.tracks.map((track, index) => (
                                <AlbumTrackInfo key={track.id} track={track} index={index} />
                            ))}
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Album;