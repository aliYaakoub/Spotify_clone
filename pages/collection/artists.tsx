import Head from 'next/head'
import React from 'react'
import CollectionLayout from '../../src/Components/layouts/CollectionLayout'
import LoadingAnimation from '../../src/Components/Loading'
import { ContextInterface } from '../../types/types'
import { useAppContext } from './../../src/Config/Context';
import ArtistCard from './../../src/Components/cards/ArtistCard';
import { useRouter } from 'next/router'

const Artists = () => {

  const { followedArtists, code } = useAppContext() as ContextInterface;
  
  const router = useRouter();
  React.useEffect(()=>{
    if(!code) router.replace('/');
  }, [code, router])
  

  return (
    <div className='w-full h-[calc(100vh-10rem)] flex text-white'>
      <Head>
        <title>Spotify Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex-grow bg-[#121212] '>
        <div className='px-8 py-5'>
          {followedArtists && followedArtists.length > 0 ?
            <div>
              <h2 className='text-2xl font-bold pb-5'>Artists</h2>
              <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5'>
                {followedArtists.map(artist => (
                  <ArtistCard key={artist.id} artist={artist} />
                  ))}
              </div>
            </div>
            :
            <LoadingAnimation />
          }
        </div>
      </div>
    </div>
  )
}

export default Artists

/* @ts-ignore */
Artists.CustomLayout = CollectionLayout;