import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

// icons 
import BackButton from '../../assets/back_button.svg';
import SearchBox from '../SearchBox';
import Link from 'next/link';

const SearchLayout: React.FC = ({ children }) => {

  const router = useRouter();

  return (
    <div className='bg-[#121212] w-[calc(100vw-256px)] overflow-y-scroll playlist-scroll'>
        <div className='sticky top-0 left-0 w-full h-16 bg-[#121212] flex items-center px-8 z-50'>
          <div className='flex items-center justify-between w-20'>
            <button onClick={router.back} className='rounded-full w-8 h-8 bg-black flex items-center justify-center'>
              <BackButton />
            </button>
          </div>
          <Link href='/collection/playlists'><a className='text-white py-3 px-3 mx-3 rounded-sm font-semibold text-sm' style={router.asPath === '/collection/playlists' ?  {backgroundColor: 'rgba(255,255,255,.2)'} : {}}>Playlists</a></Link>
          <Link href='/collection/podcasts'><a className='text-white py-3 px-3 mx-3 rounded-sm font-semibold text-sm' style={router.asPath === '/collection/podcasts' ?  {backgroundColor: 'rgba(255,255,255,.2)'} : {}}>Podcasts</a></Link>
          <Link href='/collection/artists'><a className='text-white py-3 px-3 mx-3 rounded-sm font-semibold text-sm' style={router.asPath === '/collection/artists' ?  {backgroundColor: 'rgba(255,255,255,.2)'} : {}}>Artists</a></Link>
          <Link href='/collection/albums'><a className='text-white py-3 px-3 mx-3 rounded-sm font-semibold text-sm' style={router.asPath === '/collection/albums' ?  {backgroundColor: 'rgba(255,255,255,.2)'} : {}}>Albums</a></Link>
        </div>
        {children}
    </div>
  )
}

export default SearchLayout