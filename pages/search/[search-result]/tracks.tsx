import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react'

import SearchTrackInfo from '../../../src/Components/cards/SearchTrackInfo';
import SearchLayout from '../../../src/Components/layouts/SearchLayout';
import LoadingAnimation from '../../../src/Components/Loading';
import { useAppContext } from './../../../src/Config/Context';

// icons
import TimeIcon from '../../../src/assets/time_icon.svg';

// types
import { ContextInterface } from './../../../types/types';

const Tracks: React.FC = () => {

  const { tracksSearchResults } = useAppContext() as ContextInterface;
  const router = useRouter();

  return (
    <>
            <Head>
            <title>Tracks</title>
            <meta name="description" content="" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='flex-grow bg-[#121212] h-[calc(100vh-10rem)] overflow-y-scroll max-w-full playlist-scroll'>
                {!tracksSearchResults ?
                    <LoadingAnimation />
                    :
                    <div className='px-8 w-full'>
                        <div className='w-full text-white pb-10'>
                            <div className='flex items-center sticky z-50 top-0 bg-[#121212] text-[#b3b3b3] border-b border-[#b3b3b3] mb-3 text-sm'>
                                <div className='py-3 px-2 pl-4 text-left w-10 max-w-[2.5rem] min-w-[2.5rem] flex items-center justify-center'>#</div>
                                <div className='py-3 px-2 text-left md:min-w-[25vw] md:max-w-[25vh] md:w-[25vw] flex-grow md:flex-grow-0'>TITLE</div>
                                <div className='py-3 px-2 text-left flex-grow hidden md:block'>ALBUM</div>
                                <div className='py-3 px-2 text-left w-32 hidden lg:block'>DATE ADDED</div>
                                <div className='py-3 px-2 text-left w-12 max-w-[3rem] min-w-[3rem]'><TimeIcon /></div>
                            </div>
                            {tracksSearchResults.map((track, index) => (
                                <SearchTrackInfo key={track.id} track={track} index={index} />
                            ))}
                        </div>
                    </div>
                }
            </div>
        </>
  )
}

export default Tracks
/* @ts-ignore */
Tracks.CustomLayout = SearchLayout;