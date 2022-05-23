import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { BsMusicNote } from 'react-icons/bs';

import { PlaylistType } from '../../../types/types'

type Playlist = {
  data: PlaylistType;
}

const PlaylistPreview: React.FC<Playlist> = ({ data }) => {

  return (
    <Link href={`/playlist/${data.id}`} passHref>
      <a className='bg-[#ffffff10] flex items-center justify-start shadow-lg overflow-hidden rounded-[4px]'>
        {data.images && data.images.length > 0 ? 
          <Image width={80} height={80} src={data.images[0].url} alt='playlist cover' />
          :
          <div className='w-[80px] h-[80px] bg-black flex items-center justify-center' >
            <BsMusicNote size={40} color='#fff' />
          </div>
        }
        <p className='text font-bold pl-5'>{data.name}</p>
      </a>
    </Link>
  )
}

export default PlaylistPreview