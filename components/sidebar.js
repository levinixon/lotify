import React, { useEffect, useState } from 'react'
import { HomeIcon, MagnifyingGlassIcon, BuildingLibraryIcon, HeartIcon, RssIcon, PlusCircleIcon, ArrowLeftOnRectangleIcon, } from '@heroicons/react/24/outline'
import { signOut, useSession } from "next-auth/react"
import useSpotify from "../hooks/useSpotify"
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../atoms/playlistAtom'


function sidebar() {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

    console.log("You picked ", playlistId);

    useEffect(() => {

        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            })
        }
    }, [session, spotifyApi])

    console.log(playlists)
    
  return (
    <div className='text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen'>
        <div className='space-y-4'>
        <button className='flex items-center space-x-2 hover:text-white'>
            <HomeIcon className='h-5 w-5' />
            <p>Home</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white '>
            <MagnifyingGlassIcon className='h-5 w-5' />
            <p>Search</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white '>
            <BuildingLibraryIcon className='h-5 w-5' />
            <p>Your Library</p>
        </button>

        <hr className='border-t-[0.1px] border-gray-900'/>
   
        <button className='flex items-center space-x-2 hover:text-white '>
            <PlusCircleIcon className='h-5 w-5' />
            <p>Create Playlist</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white '>
            <HeartIcon className='h-5 w-5' />
            <p>Liked Songs</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white '>
            <RssIcon className='h-5 w-5' />
            <p>Your Episodes</p>
        </button>

        <hr className='border-t-[0.1px] border-gray-900'/>
        
        {/*Playlist!*/}

        {playlists.map((playlist) => (
            <p 
            key={playlist.id} 
            className='cursor-pointer hover:text-white'
            onClick={() => setPlaylistId(playlist.id)}>{playlist.name}</p>
        ))}

        


        <p className='cursor-pointer hover:text-white'>
            Playlist
        </p>

    </div>
    </div>
  )
}

export default sidebar