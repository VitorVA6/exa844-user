import React, { useEffect, useState } from 'react'
import { useUserContext } from '../contexts/User'
import { Navigate } from 'react-router-dom'

export default function Login() {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const {login, authenticated, checkAuth} = useUserContext()

    useEffect( ()=>{

        checkAuth()
    
      }, [] )
    
      const handleSubmit = (event)=>{
        event.preventDefault()
        login(email, senha)
      }
    
      if (authenticated){
        return <Navigate to='/'/>
      }

  return (
    <section className='flex justify-center h-screen text-white' style={{background: '#013244'}}>
        <div className='flex flex-col items-center w-1/2 py-20'>
            <h1 className='text-[50px] mb-4'>Seja Bem-vindo</h1>
            <p className='text-xl mb-14'>Faça login em sua conta para fazer upload dos PDFs!</p>
            <input 
                type="text" 
                style={{background: '#1b4957'}}
                className='py-3 px-5 rounded-xl w-[60%] outline-none mb-6'
                placeholder='Digite seu email...'    
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
            />
            <input 
                type="password" 
                style={{background: '#1b4957'}}
                className='py-3 px-5 rounded-xl w-[60%] outline-none mb-6'
                placeholder='Digite sua senha...'
                value={senha}
                onChange={(ev) => setSenha(ev.target.value)}   
            />
            <div className='flex justify-start w-[60%] mb-6'>
                <p className='cursor-pointer' style={{color: '#218071'}}>Esqueceu sua senha?</p>
            </div>
            <button 
                className='w-[60%] p-3 rounded-xl font-medium' style={{background: '#02df79'}}
                onClick={handleSubmit}    
            >Login</button>
        </div>
    </section>
  )
}
