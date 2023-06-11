import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useUserContext } from '../contexts/User'
import UserCard from '../components/UserCard'

export default function Users() {

    const {authenticated, checkAuth, getAll, users} = useUserContext()

    useEffect( () => {

        checkAuth()
        getAll()

    }, [] )

    if(!authenticated){
        return <Navigate to='/login'/>
      }

  return (
    <div className='flex justify-center h-full text-white'>
        <div className='flex flex-col items-center w-[80%] py-8'>
            <h1 className='text-2xl font-medium mb-12'>Usuários cadastrados</h1>
            <div className='grid grid-cols-2 gap-5 w-full'>
            {   
                users?.map( elem => (
                    <UserCard user={elem} key={elem._id}/>
                ) )
            }
            </div>
        </div>
    </div>
  )
}
