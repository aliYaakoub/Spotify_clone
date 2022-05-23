import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// types
import { AlbumType } from '../../../types/types'

type Props = {
    album: AlbumType
}

const AlbumCard: React.FC<Props> = ({ album }) => {
  return (
    <Link href={`/album/${album.id}`} passHref >
        <a className='p-4 bg-[#181818] hover:bg-[#202020] rounded-md flex flex-col items-center transition-colors duration-300'>
            {album.images.length > 0 && <Image width={200} height={200} src={album.images[0].url} alt={album.name} className='rounded-md' />}
            <div className='flex flex-col w-full'>
                <h2 className='font-bold py-3 line'>{album.name}</h2>
                <p className='text-sm text-[#b3b3b3] flex items-center line'>
                    <p>{moment(album.releaseDate).year()} </p>
                    <p className='w-1 h-1 rounded-full bg-[#b3b3b3] mx-1.5' />
                    <p className='line'>
                        {album.artists.map((artist, index)=>{
                            if(index === 0) return artist.name
                            return `, ${artist.name}`
                        })}
                    </p>
                </p>
            </div>
        </a>
    </Link>
  )
}

export default AlbumCard