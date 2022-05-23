import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

// icons 
import BackButton from '../../assets/back_button.svg';
import SearchBox from '../SearchBox';
import { useAppContext } from './../../Config/Context';

// types
import { ContextInterface } from './../../../types/types';

const SearchLayout: React.FC = ({ children }) => {

  const router = useRouter();
  const { searchText, setSearchText } = useAppContext() as ContextInterface;

  useEffect(()=>{
    router.push(`/search/${searchText}`)
    // if(router.asPath === '/search') setSearchText('');
  }, [searchText]);

  return (
    <div className='bg-[#121212] w-[calc(100vw-256px)] overflow-y-scroll playlist-scroll'>
        <div className='sticky top-0 left-0 w-full h-16 bg-[#121212] flex items-center px-8 z-50'>
          <div className='flex items-center justify-between w-20'>
            <button onClick={router.back} className='rounded-full w-8 h-8 bg-black flex items-center justify-center'>
              <BackButton />
            </button>
          </div>
          <SearchBox searchText={searchText} setSearchText={setSearchText} />
        </div>
        {children}
    </div>
  )
}

export default SearchLayout