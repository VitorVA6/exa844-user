import React, { useEffect } from 'react'
import { useUserContext } from '../contexts/User'
import { Navigate } from 'react-router-dom'

export default function Home() {

    const {authenticated, checkAuth} = useUserContext()

    useEffect( () => {

        checkAuth()

    }, [] )

    if(!authenticated){
        return <Navigate to='/login'/>
      }

  return (
    <div></div>
  )
}
