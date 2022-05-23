import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

// types
import { CategoryType } from '../../../types/types'

type Props = {
    category: CategoryType;
}

const CategoryCard: React.FC<Props> = ({ category }) => {
  return (
    <Link href={`category/${category.id}`} passHref>
        <a className='h-44 relative group bg-[#181818] rounded-md flex items-center justify-center overflow-hidden'>
            <p className='text-2xl absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10'>{category.name}</p>
            {category.icon && <img className='group-hover:opacity-10 transition-opacity duration-300' alt='' src={category.icon.url} />}
        </a>
    </Link>
  )
}

export default CategoryCard;