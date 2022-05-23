import React from 'react';
import { FaPlay } from 'react-icons/fa';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

import { useAppContext } from '../../Config/Context';

// types
import { PlaylistTrackType, ContextInterface } from '../../../types/types';

type TrackProps = {
    track: PlaylistTrackType;
    index: number;
}

const TrackInfo: React.FC<TrackProps> = ({ track, index }) => {

    const { setCurrentTrack, currentTrack } = useAppContext() as ContextInterface; 
    
    function getDuration(duration: number){
        let minutes: number = Math.floor(duration/1000/60);
        let seconds: number = Math.floor((duration - minutes * 60000) / 1000);
        let secondsToShow = '';
        if (seconds === 0) {
            secondsToShow = '00';
        }
        else if (seconds < 10){
            secondsToShow = `0${seconds}`;
        }
        else {
            secondsToShow = `${seconds}`;
        };
        return `${minutes}:${secondsToShow}`;
    } 

    return (
        <div 
            key={track.id} 
            onClick={()=>setCurrentTrack(track)} 
            className='flex items-center hover:bg-[#ffffff15] rounded-md cursor-default group'
        >
            <div className='line py-3 px-2 pl-4 text-left w-10 max-w-[2.5rem] minw-[2.5rem] flex items-center justify-center'>
                <p className='group-hover:hidden'>{index + 1}</p>
                {<FaPlay className='hidden group-hover:block' color='#fff' size='15' />}
            </div>
            <div className='py-3 px-2 text-left min-w-[35vw] max-w-[35vh] w-[35vw] md:min-w-[25vw] md:max-w-[25vh] md:w-[25vw] flex flex-grow md:flex-grow-0'>
                {track.album.images.length > 0 ? 
                    <div className='w-12 h-12 max-w-[3rem] min-w-[3rem] md:flex items-center justify-center hidden'>
                        <Image width={40} height={40} src={track.album.images[2].url} alt={track.name} />
                    </div>
                    :
                    <div className='w-12 h-12 bg-black' />
                }
                <div className='flex flex-col md:w-[calc(100%-3rem)] w-[100%] pl-2 justify-center'>
                    <p className='line'>{track.name}</p>
                    <p className='line text-xs text-[#b3b3b3] group-hover:text-white flex'>{track.artists.map((artist, index)=>{
                        if(index === 0) return <Link href={`/artist/${artist.id}`}>{artist.name}</Link>
                        return <p key={artist.id}>, <Link href={`/artist/${artist.id}`}>{artist.name}</Link></p>
                    })}</p>
                </div>
            </div>
            <div className='line py-3 px-2 text-left flex-grow text-sm text-[#b3b3b3] group-hover:text-white hidden md:block'>
                <Link href={`/album/${track.album.id}`}>
                    {track.album.name}
                </Link>
            </div>
            <div className='line py-3 px-2 text-left w-32 max-w-[8rem] min-w-[8rem] text-sm text-[#b3b3b3] hidden lg:block'>
                {moment(track.addedOn).format('MMM, D YYYY')}
            </div>
            <div className='line py-3 px-2 text-left w-12 max-w-[3rem] min-w-[3rem] text-sm text-[#b3b3b3] justify-self-end'>
                {getDuration(track.duration_ms)}
            </div>
        </div>
    )
}

export default TrackInfo