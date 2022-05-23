import Head from 'next/head';
import React from 'react'

import SearchLayout from '../../../src/Components/layouts/SearchLayout';
import LoadingAnimation from '../../../src/Components/Loading';
import { useAppContext } from './../../../src/Config/Context';
import ArtistCard from '../../../src/Components/cards/ArtistCard';

// types
import { ContextInterface } from './../../../types/types';

const Artists: React.FC = () => {

  const { artistsSearchResults, searchText } = useAppContext() as ContextInterface;

  return (
    <>
            <Head>
            <title>Tracks</title>
            <meta name="description" content="" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='flex-grow bg-[#121212] h-[calc(100vh-10rem)] overflow-y-scroll max-w-full playlist-scroll'>
                {!artistsSearchResults ?
                    <LoadingAnimation />
                    :
                    <div className='px-8 pt-10 w-full'>
                        <h2 className='text-2xl text-white font-bold pb-5'>All artists for &quot;{searchText}&quot;</h2>
                        <div className='w-full text-white pb-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5'>
                            {artistsSearchResults.map((artist) => (
                                <ArtistCard key={artist.id} artist={artist} />
                            ))}
                        </div>
                    </div>
                }
            </div>
        </>
  )
}

export default Artists
/* @ts-ignore */
Artists.CustomLayout = SearchLayout;