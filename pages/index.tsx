import Head from 'next/head'
import { useEffect } from 'react';
import type { NextPage } from 'next'
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import SpotifyIcon from '../src/assets/spotify_icon.svg';
import { useAppContext } from '../src/Config/Context';

//types and interfaces
import { ContextInterface } from '../types/types';

const Home: NextPage = () => {

  const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=47c8d135bcb84bd9bb49a19a558aea87&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-top-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-recently-played%20user-follow-read"

  const router = useRouter();
  const { setCode, code: tempCode } = useAppContext() as ContextInterface;
  const code = router.query?.code;

  useEffect(()=>{
    if(code){
      setCode(code);
      router.push(`/home`);
    }
  }, [code, router, setCode, tempCode]);

  return (
    <div className='main fixed top-0 left-0'>
      <Head>
        <title>Log in</title>
        <meta name="description" content="a spotify clone made with the spotify web api" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.div 
        initial={{background: '#000000'}}
        animate={{background: '#00000050', transition: {delay: 1}}}
        className='flex justify-between items-cente h-screen w-screen flex-col py-20'
      >
        <motion.div
          initial={{height: '100%'}}
          animate={{height: 'auto', transition: {delay: 1}}}
          className='flex justify-center items-center'
        >
          <motion.div
            initial={{scale: 2}}
            animate={{scale: 1, transition: {delay: 1}}}
          >
            <SpotifyIcon />
          </motion.div>
        </motion.div>
        <motion.div
          initial={{display: 'none', opacity: 0}}
          animate={{display: 'flex', opacity: 1, transition: {delay: 1}}}
          className='flex flex-col justify-center items-center'
        >
          <p className='text-white pb-5 font-semibold text-lg'>Login with your Spotify account</p>
          <a
            href={AUTH_URL}
            className='bg-[#00DA5A] bg-opacity-90 py-2 px-20 rounded-lg font-bold text-lg tracking-widest text-white shadow-lg'
          >
            LOG IN
          </a>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Home