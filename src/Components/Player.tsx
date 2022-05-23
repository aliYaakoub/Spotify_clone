import React, { useEffect, useRef } from 'react'
import SpotifyWebApi from "spotify-web-api-node"

import { useAppContext } from '../Config/Context';

// icons
import PrevButton from '../assets/back_play_button.svg';
import NextButton from '../assets/next_play_button.svg';
import PlayButton from '../assets/play_button.svg';
import ShuffleButton from '../assets/shuffle_icon.svg';
import RepeatButton from '../assets/repeat_icon.svg';

// types
import { ContextInterface } from '../../types/types';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
})

const Player: React.FC = () => {

  const { currentTrack, accessToken } = useAppContext() as ContextInterface;
  // const audioEl: any = useRef(null).current;
  
  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken])

  useEffect(()=>{
    if(!currentTrack) return;
  }, [currentTrack]);

  // function handlePlay(){
  //   if(!accessToken) return;
  //   if(!currentTrack) return;

  //   spotifyApi.pause();

  // }

  // function handleNext(){
  //   if(!accessToken) return;
  //   if(!currentTrack) return;

  //   spotifyApi.skipToNext();

  // }

  return (
    <div className='w-full h-24 bg-[#151515] border-t border-[#252525] grid grid-cols-4'>
      <div></div>
      <div className='col-span-2 flex flex-col items-center justify-center'>
        <div className='flex items-center justify-center fill-[#b3b3b3]'>
          <div className='mx-3'>
            <ShuffleButton />
          </div>
          <div className='mx-3'>
            <PrevButton />
          </div>
          <div className='bg-white mx-3 w-8 h-8 rounded-full flex items-center justify-center'>
            <PlayButton fill='black' />
          </div>
          <div className='mx-3'>
            <NextButton />
          </div>
          <div className='mx-3'>
            <RepeatButton />
          </div>
        </div>
        <div className='flex items-center progressBar w-full text-[#b3b3b3] text-xs px-10 pt-3'>
          <p>0:00</p>
          <div className='flex-grow px-5'>
            <div className='bg-[#b3b3b3] w-full h-1 rounded-full'>
              <div></div>
            </div>
          </div>
          <p>0:00</p>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default Player