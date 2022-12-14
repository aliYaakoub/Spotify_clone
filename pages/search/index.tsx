import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import SpotifyWebApi from "spotify-web-api-node"

import { useAppContext } from '../../src/Config/Context';
import SearchLayout from '../../src/Components/layouts/SearchLayout';
import LoadingAnimation from '../../src/Components/Loading';

// types
import { ContextInterface, CategoryType } from '../../types/types';
import CategoryCard from '../../src/Components/cards/CategoryCard';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
})

const Search: React.FC = () => {

  const { code, accessToken } = useAppContext() as ContextInterface;
  const router = useRouter();

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
      if(!code) router.replace('/');
  }, [code, router])

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken])

  useEffect(()=>{
    if(!accessToken) return;

    // spotifyApi.getMe().then((res)=>console.log(res)).catch(err => console.error('getme'+err));
    
    if (categories.length > 0) return;

    setLoading(true);
    spotifyApi
      .getCategories()
      .then((res)=>{
        console.log(res.body);
        setCategories(
          res.body.categories.items.map(category => ({
            id: category.id,
            name: category.name,
            icon: {
              height: category.icons[0].height,
              width: category.icons[0].width,
              url: category.icons[0].url
            }
          }))
        )
        setLoading(false);
      })
      .catch((err)=>{
        console.error('playlist error' + err)
        setLoading(false);
      });
  }, [accessToken, categories]);

  return (
    <div className='w-full h-[calc(100vh-10rem)] flex text-white'>
      <Head>
        <title>Spotify Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex-grow bg-[#121212] '>
        <div className='px-8 py-5'>
          {loading ?
            <LoadingAnimation />
            :
            categories &&
            <div>
              <h2 className='text-2xl font-bold pb-5'>Browse Categories</h2>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5'>
                {categories.map(category => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Search

/* @ts-ignore */
Search.CustomLayout = SearchLayout;