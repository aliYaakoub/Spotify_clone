import React from 'react';
import { FaPlay } from 'react-icons/fa';
import Link from 'next/link';

import { useAppContext } from '../../Config/Context';

// types
import { ContextInterface, AlbumTrackType } from '../../../types/types';

type TrackProps = {
    track: AlbumTrackType;
    index: number;
}

const AlbumTrackInfo: React.FC<TrackProps> = ({ track, index }) => {

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
            <div className='py-3 px-2 text-left flex flex-grow w-32'>
                <div className='flex flex-col md:w-[calc(100%-3rem)] w-[100%] pl-2 justify-center'>
                    <p className='line'>{track.name}</p>
                    <p className='line text-xs text-[#b3b3b3] group-hover:text-white flex'>{track.artists.map((artist, index)=>{
                        if(index === 0) return <Link href={`/artist/${artist.id}`}>{artist.name}</Link>
                        return <p key={artist.id}>, <Link href={`/artist/${artist.id}`}>{artist.name}</Link></p>
                    })}</p>
                </div>
            </div>
            <div className='line py-3 px-2 text-left w-12 max-w-[3rem] min-w-[3rem] text-sm text-[#b3b3b3] justify-self-end'>
                {getDuration(track.duration_ms)}
            </div>
        </div>
    )
}

export default AlbumTrackInfo;