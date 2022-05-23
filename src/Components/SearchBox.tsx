import React from 'react'
import { useRouter } from 'next/router';

//icons
import SearchIcon from '../assets/search_page_icon.svg';
import ClearTextIcon from '../assets/clear_text_icon.svg';

// types
import { SearchBoxProps } from '../../types/types'; 

const SearchBox: React.FC<SearchBoxProps> = ({ searchText, setSearchText }) => {

  const router = useRouter();

  return (
    <div className='bg-white h-[60%] flex w-96 items-center px-2 rounded-full overflow-hidden'>
        <SearchIcon />
        <input 
            type="text"
            placeholder='Artists, songs, podcasts'
            value={searchText}
            onChange={(e)=>setSearchText(e.target.value)}
            onFocus={()=>router.push(`/search/${searchText}`)}
            className='h-full text-sm px-3 flex-grow text-[#121212] outline-none placeholder:text-[#777]'
        />
        {searchText && <div onClick={()=>setSearchText('')}><ClearTextIcon /></div>}
    </div>
  )
}

export default SearchBox