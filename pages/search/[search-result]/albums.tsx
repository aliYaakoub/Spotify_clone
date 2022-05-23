import Head from 'next/head';
import React from 'react'

import SearchLayout from '../../../src/Components/layouts/SearchLayout';
import LoadingAnimation from '../../../src/Components/Loading';
import { useAppContext } from './../../../src/Config/Context';
import AlbumCard from '../../../src/Components/cards/AlbumCard';

// types
import { ContextInterface } from './../../../types/types';

const Albums: React.FC = () => {

  const { albumsSearchResults, searchText } = useAppContext() as ContextInterface;

  return (
    <>
            <Head>
            <title>Tracks</title>
            <meta name="description" content="" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='flex-grow bg-[#121212] h-[calc(100vh-10rem)] overflow-y-scroll max-w-full playlist-scroll'>
                {!albumsSearchResults ?
                    <LoadingAnimation />
                    :
                    <div className='px-8 pt-10 w-full'>
                        <h2 className='text-2xl text-white font-bold pb-5'>All albums for &quot;{searchText}&quot;</h2>
                        <div className='w-full text-white pb-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5'>
                            {albumsSearchResults.map((album) => (
                                <AlbumCard key={album.id} album={album} />
                            ))}
                        </div>
                    </div>
                }
            </div>
        </>
  )
}

export default Albums
/* @ts-ignore */
Albums.CustomLayout = SearchLayout;