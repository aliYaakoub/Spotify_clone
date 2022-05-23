import Head from 'next/head';
import React, { useEffect } from 'react'

import LoadingAnimation from '../../src/Components/Loading';
import { useAppContext } from '../../src/Config/Context';
import FeaturedPlaylistCard from '../../src/Components/cards/FeaturedPlaylistCard';

// icons
import BackButton from '../../src/assets/back_button.svg';

// types
import { ContextInterface } from '../../types/types';
import { useRouter } from 'next/router';

const FeaturedPlaylists: React.FC = () => {

  const { featuredPlaylists, code } = useAppContext() as ContextInterface;
  const router = useRouter();

  useEffect(()=>{
    if(!code) router.push('/');
  }, [code, router]);

  return (
    <>
      {featuredPlaylists ?
        <>
          <Head>
          <title>{featuredPlaylists?.message}</title>
          <meta name="description" content="" />
          <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className='flex-grow bg-[#121212] h-[calc(100vh-6rem)] overflow-y-scroll max-w-full playlist-scroll'>
            <div className='sticky top-0 left-0 w-full h-16 bg-[#121212] flex items-center px-8 z-50'>
              <div className='flex items-center justify-between w-20'>
                <button onClick={router.back} className='rounded-full w-8 h-8 bg-black flex items-center justify-center'>
                  <BackButton />
                </button>
              </div>
            </div>
            <div className='px-8 pt-10 w-full'>
                <h2 className='text-2xl text-white font-bold pb-5'>{featuredPlaylists.message}</h2>
                <div className='w-full text-white pb-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5'>
                    {featuredPlaylists.playlists.map((playlist) => (
                        <FeaturedPlaylistCard key={playlist.id} playlist={playlist} />
                    ))}
                </div>
            </div>
          </div>
        </>
        :
        <LoadingAnimation />
      }
    </>
  )
}

export default FeaturedPlaylists