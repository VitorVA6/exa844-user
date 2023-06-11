import React, { useEffect, useState } from 'react'
import {BsCheckCircleFill, BsCircle} from 'react-icons/bs'
import { useUserContext } from '../contexts/User'
import { Navigate } from 'react-router-dom'

export default function Signup() {

    const [nome, setNome] = useState('')
    const [sobrenome, setSobrenome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confSenha, setConfSenha] = useState('')
    const [cpf, setCpf] = useState('')
    const [tipo, setTipo] = useState('normal')

    const {authenticated, checkAuth, signup} = useUserContext()

    useEffect( () => {

        checkAuth()

    }, [] )

    if(!authenticated){
        return <Navigate to='/login'/>
      }

    function handleSubmit(event){
        event.preventDefault()
        if(senha === confSenha){
            signup(nome, sobrenome, cpf, tipo, email, senha)
        }
        else{
            console.log('As senhas não batem')
        }  
    }


  return (
    <section className='flex justify-center h-full text-white' style={{background: '#013244'}}>
        <div className='flex flex-col items-center w-1/2 py-8'>
            <h1 className='text-2xl font-medium mb-8'>Cadastro de usuário</h1>
            <p className='text-xl mb-8 w-full text-gray-200'>Insira os dados do novo usuário:</p>
            <div className='flex gap-4 w-full'>
                <input 
                    type="text" 
                    style={{background: '#1b4957'}}
                    className='py-3 px-5 rounded-xl w-[40%] outline-none mb-6'
                    placeholder='Nome'
                    value={nome}
                    onChange={ (ev) => setNome(ev.target.value) } 
                />
                <input 
                    type="text" 
                    style={{background: '#1b4957'}}
                    className='py-3 px-5 rounded-xl w-[60%] outline-none mb-6'
                    placeholder='Sobrenome'   
                    value={sobrenome}
                    onChange={ (ev) => setSobrenome(ev.target.value) }  
                />
            </div>
            <input 
                type="text" 
                style={{background: '#1b4957'}}
                className='py-3 px-5 rounded-xl w-[100%] outline-none mb-6'
                placeholder='Email'  
                value={email}
                onChange={ (ev) => setEmail(ev.target.value) }   
                />

            <div className='flex w-full gap-4'>
                <input 
                    type="password" 
                    style={{background: '#1b4957'}}
                    className='py-3 px-5 rounded-xl w-[50%] outline-none mb-6'
                    placeholder='Senha'
                    value={senha}
                    onChange={ (ev) => setSenha(ev.target.value) } 
                    />
                <input 
                    type="password" 
                    style={{background: '#1b4957'}}
                    className='py-3 px-5 rounded-xl w-[50%] outline-none mb-6'
                    placeholder='Confirme a senha'
                    value={confSenha}
                    onChange={ (ev) => setConfSenha(ev.target.value) }     
                />
            </div>
            <div className='w-full flex gap-4 justify-between'>
                <input 
                    type="text" 
                    style={{background: '#1b4957'}}
                    className='py-3 px-5 rounded-xl w-[50%] outline-none'
                    placeholder='CPF'    
                    value={cpf}
                    onChange={ (ev) => setCpf(ev.target.value) } 
                />
                <div className='flex gap-4 items-center'>
                    <h3>Tipo</h3>
                    <div 
                        className={`cursor-pointer flex gap-3 items-center justify-between ${tipo === 'normal' ? 'bg-green-400' : 'bg-gray-400'} py-2 px-3 rounded-xl h-fit`}
                        onClick={() => setTipo('normal')}
                        >
                        <p>Normal</p>
                        {
                            tipo === 'normal' ? <BsCheckCircleFill /> : <BsCircle />
                        }                        
                    </div>
                    <div 
                        className={`cursor-pointer flex gap-3 items-center justify-between ${tipo === 'adm' ? 'bg-green-400' : 'bg-gray-400'} py-2 px-3 rounded-xl h-fit`}
                        onClick={() => setTipo('adm')}
                    >
                        <p>Admin</p>
                        {
                            tipo === 'adm' ? <BsCheckCircleFill /> : <BsCircle />
                        }
                    </div>
                </div>
            </div>
            
            
            <button 
                className='w-[60%] p-3 rounded-xl font-medium mt-8' 
                style={{background: '#02df79'}}
                onClick={handleSubmit}
            >Cadastrar</button>
        </div>
    </section>
  )
}
