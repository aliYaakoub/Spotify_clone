import React from 'react'
import Player from '../Player'
import SideBar from '../SideBar'

const Layout: React.FC = ({ children }) => {
  return (
    <div className='flex flex-col overflow-hidden'>
        <div className='flex'>
            <SideBar />
            {children}
        </div>
        <Player />
    </div>
  )
}

export default Layout