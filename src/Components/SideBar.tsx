import Link from 'next/link';
import React from 'react'
import { useRouter } from 'next/router';

import { useAppContext } from '../Config/Context';

// icons
import Icon from '../assets/spotify.svg';
import HomeIcon from '../assets/home_icon.svg';
import ActiveHomeIcon from '../assets/home_icon_active.svg';
import SearchIcon from '../assets/search_icon.svg';
import ActiveSearchIcon from '../assets/search_icon_active.svg';
import LibraryIcon from '../assets/library_icon.svg';
import ActiveLibraryIcon from '../assets/library_icon_active.svg';
import AddButton from '../assets/add_button.svg';
import LikedIcon from '../assets/liked_icon.svg';
import EpisodesIcon from '../assets/episodes_icon.svg';
import DownloadIcon from '../assets/download_icon.svg';

// types and interfaces
import { ContextInterface } from '../../types/types';
import Playlist from './cards/PlaylistPreview';

const SideBar: React.FC = () => {

  const router = useRouter();
  const { playlists } = useAppContext() as ContextInterface;

  return (
    <nav className='min-w-[256px] w-64 h-[calc(100vh-6rem)] bg-black pt-[17px] pl-6 text-white flex flex-col'>
      <div>
        <Icon />
      </div>
      <div className='pt-6'>
        <Link href={'/home'} passHref>
          <div className='flex items-center py-2 cursor-pointer group'>
            {router.pathname === '/home' ? 
              <ActiveHomeIcon fill='#ffffff'/> : 
              <HomeIcon fill='#b3b3b3' className='group-hover:fill-white transition-colors duration-300' />
            }
            <p className={`${router.pathname === '/home' ? 'text-white' : 'text-[#b3b3b3]' } pl-4 group-hover:text-white transition-colors duration-300 font-bold text-sm`}>Home</p>
          </div>
        </Link>
        <Link href={'/search'} passHref>
          <div className='flex items-center py-2 cursor-pointer group'>
            {router.pathname === '/search' ? 
              <ActiveSearchIcon fill='#ffffff' /> : 
              <SearchIcon fill='#b3b3b3' className='group-hover:fill-white transition-colors duration-300' />
            }
            <p className={`${router.pathname === '/search' ? 'text-white' : 'text-[#b3b3b3]' } pl-4 group-hover:text-white transition-colors duration-300 font-bold text-sm`}>Search</p>
          </div>
        </Link>
        <Link href={'/collection/playlists'} passHref>
          <div className='flex items-center py-2 cursor-pointer group'>
            {router.pathname .includes('/collection') ? 
              <ActiveLibraryIcon fill='#ffffff' /> : 
              <LibraryIcon fill='#b3b3b3' className='group-hover:fill-white transition-colors duration-300' />
            }
            <p className={`${router.pathname === '/collection' ? 'text-white' : 'text-[#b3b3b3]' } pl-4 group-hover:text-white transition-colors duration-300 font-bold text-sm`}>Your Library</p>
          </div>
        </Link>
      </div>
      <div className='mt-8'>
        <button className='group flex items-center'>
          <div className="bg-[#b3b3b3] flex items-center justify-center group-hover:bg-white transition-colors duration-300 w-6 h-6 rounded-[1px]">
              <AddButton />
          </div>
          <p className='text-[#b3b3b3] pl-4 group-hover:text-white transition-colors duration-300 font-bold text-sm'>Create Playlist</p>
        </button>
        <button className='group flex items-center py-4'>
          <div className="bg-gradient-to-br from-[#450af5] to-[#b3b3b3] opacity-80 flex items-center justify-center group-hover:bg-white group-hover:opacity-100 transition-all duration-300 w-6 h-6 rounded-[1px]">
            <LikedIcon />
          </div>
          <p className='text-[#b3b3b3] pl-4 group-hover:text-white transition-colors duration-300 font-bold text-sm'>Liked Songs</p>
        </button>
        <button className='group flex items-center'>
          <div className="bg-[#006450] opacity-80 flex items-center justify-center group-hover:opacity-100 transition-all duration-300 w-6 h-6 rounded-[4px]">
            <EpisodesIcon />
          </div>
          <p className='text-[#b3b3b3] pl-4 group-hover:text-white transition-colors duration-300 font-bold text-sm'>Your Episodes</p>
        </button>
      </div>
      <div className='bg-[#333] mt-4 h-[1px] mr-6' />
      {playlists.length > 0 && 
        <div className='custom-scrollbar overflow-y-scroll py-3 flex-grow'>
          {playlists.map(playlist => (
            <Link key={playlist.id} href={`/playlist/${playlist.id}`} passHref>
              <p className='text-[#b3b3b3] hover:text-white text-sm cursor-default py-1.5' >{playlist.name}</p>
            </Link>
          ))}
        </div>
      }
      <Link href={'https://open.spotify.com/download'} passHref>
        <a className='flex items-center py-2 justify-self-end hover:text-white text-[#b3b3b3] hover:fill-white fill-[#b3b3b3]'>
          <DownloadIcon className='transition-colors duration-300' />
          <p className='pl-5 font-bold text-sm transition-colors duration-300'>Install App</p>
        </a>
      </Link>
    </nav>
  )
}

export default SideBar