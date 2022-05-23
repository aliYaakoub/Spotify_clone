import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// types
import { PlaylistType } from '../../../types/types'

type Props = {
    playlist: PlaylistType
}

const PlaylistCard: React.FC<Props> = ({ playlist }) => {
  return (
    <Link href={`/playlist/${playlist.id}`} passHref >
        <a className='p-4 bg-[#181818] hover:bg-[#202020] rounded-md flex flex-col items-center transition-colors duration-300'>
            {playlist.images && playlist.images.length > 0 && <Image width={200} height={200} src={playlist.images[0].url} alt={playlist.name} className='rounded-md' />}
            <div className='flex flex-col w-full'>
                <h2 className='font-bold py-3 line'>{playlist.name}</h2>
                <p className='text-sm text-[#b3b3b3] flex items-center line'>By {playlist.owner?.displayName}</p>
            </div>
        </a>
    </Link>
  )
}

export default PlaylistCard