import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserContext } from '../contexts/User'

export default function () {

  const [tipo, setTipo] = useState('normal')

  const {getUser, authenticated, checkAuth} = useUserContext()

  useEffect( () => {

    checkAuth()
    getUser()
    .then( data => setTipo(data.tipo) )
    .catch( err => console.log(err) )

  }, [] )

  return (
    <header className='flex py-6 w-full justify-between px-16 items-center'>
        <Link to={'/'} className='text-lg font-medium'>Logo</Link>
        <nav className='flex gap-16'>
          
            <Link to={'/perfil'} className='cursor-pointer'>Perfil</Link>
            {
            tipo === 'admin' && <>
            <Link to={'/signup'} className='cursor-pointer'>Novo usuário</Link>
            <Link to={'/users'} className='cursor-pointer'>Usuários</Link>
            </>
          }
            
        </nav>
    </header>
  )
}
