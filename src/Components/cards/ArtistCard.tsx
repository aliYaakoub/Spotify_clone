import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArtistType } from '../../../types/types'

type Props = {
    artist: ArtistType;
}

const ArtistCard: React.FC<Props> = ({ artist }) => {
  return (
    <Link href={`/artist/${artist.id}`} passHref >
        <a className='p-4 bg-[#181818] hover:bg-[#202020] rounded-md flex flex-col items-center transition-colors duration-300'>
            {artist.images.length > 0 && <Image width={180} height={180} src={artist.images[0].url} alt={artist.name} className='rounded-full' />}
            <div className='flex flex-col w-full'>
                <h2 className='font-bold py-4 line'>{artist.name}</h2>
                <p className='text-sm text-[#b3b3b3] flex items-center line'>{artist.type.charAt(0).toUpperCase() + artist.type.slice(1)}</p>
            </div>
        </a>
    </Link>
  )
}

export default ArtistCard