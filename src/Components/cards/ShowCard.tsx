import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// types
import { ShowType } from '../../../types/types'

type Props = {
  show: ShowType;
}

const ShowCard: React.FC<Props> = ({ show }) => {
  return (
    <Link href={`/show/${show.id}`} passHref >
        <a className='p-4 bg-[#181818] hover:bg-[#202020] rounded-md flex flex-col items-center transition-colors duration-300'>
            {show.images && show.images.length > 0 && <Image width={200} height={200} src={show.images[0].url} alt={show.name} className='rounded-md' />}
            <div className='flex flex-col w-full'>
                <h2 className='font-bold py-3 line'>{show.name}</h2>
                <p className='text-sm text-[#b3b3b3] flex items-center line'>{show.publisher}</p>
            </div>
        </a>
    </Link>
  )
}

export default ShowCard