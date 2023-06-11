import React, { useEffect, useState } from 'react'
import { useUserContext } from '../contexts/User'
import { Navigate } from 'react-router-dom'
import { FiLogOut } from "react-icons/fi";

export default function Perfil() {

    const [nome, setNome] = useState('')
    const [sobrenome, setSobrenome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confsenha, setConfsenha] = useState('')
    const [cpf, setCpf] = useState('')

    const {authenticated, checkAuth, getUser, logout, updateProfile, updatePw} = useUserContext()

    useEffect( () => {

        checkAuth()
        getUser().then(
            data => {
                setNome(data.nome)
                setSobrenome(data.sobrenome)
                setEmail(data.email)
                setCpf(data.cpf)
            }
        )

    }, [] )

    if(!authenticated){
        return <Navigate to='/login'/>
      }

    function handleSubmit(){
        updateProfile(nome, sobrenome, cpf, email)
        .then( data => console.log(data) )
    }

    function handlePassword(){

        if(senha.length < 8){
            console.log('Senha inválida')
            return
        }
        if( senha === confsenha  ){
            updatePw(senha)
            .then(data => console.log(data))
        }
        else{
            console.log('As senhas não batem')
        }

    }


  return (
    <section className='flex justify-center pb-8'>
        <div className='flex flex-col items-center w-1/2 py-8'>
            
            <h1 className='text-2xl font-medium mb-8'>Meu perfil</h1>
            <p className='flex w-full justify-start text-lg mb-6'>Edite seu perfil</p>
            
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
           
           <div className='flex gap-4 w-full'>
                
                <input 
                    type="text" 
                    style={{background: '#1b4957'}}
                    className='py-3 px-5 rounded-xl w-[60%] outline-none'
                    placeholder='Email'  
                    value={email}
                    onChange={ (ev) => setEmail(ev.target.value) }   
                    />
                <input 
                    type="text" 
                    style={{background: '#1b4957'}}
                    className='py-3 px-5 rounded-xl w-[40%] outline-none'
                    placeholder='CPF'    
                    value={cpf}
                    onChange={ (ev) => setCpf(ev.target.value) } 
                />
            </div>           
            
            <button 
                className='w-[60%] p-3 rounded-xl font-medium my-8' 
                style={{background: '#02df79'}}
                onClick={handleSubmit}
            >Salvar</button>

            <p className='flex w-full justify-start text-lg mb-6'>Deseja alterar sua senha?</p>

            <div className='flex gap-4 w-full'>
                <input 
                    type="password" 
                    style={{background: '#1b4957'}}
                    className='py-3 px-5 rounded-xl w-[50%] outline-none'
                    placeholder='Nova senha'
                    value={senha}
                    onChange={ (ev) => setSenha(ev.target.value) } 
                    />   
                <input 
                    type="password" 
                    style={{background: '#1b4957'}}
                    className='py-3 px-5 rounded-xl w-[50%] outline-none'
                    placeholder='Confirme a senha'
                    value={confsenha}
                    onChange={ (ev) => setConfsenha(ev.target.value) } 
                    />   
            </div>      
            <button 
                className='w-[60%] p-3 rounded-xl font-medium my-8' 
                style={{background: '#02df79'}}
                onClick={handlePassword}
            >Alterar senha</button>   

            <p className='flex w-full justify-start text-lg mb-3'>Sair da conta</p>   
            <div className='flex w-full justify-start'>
                <button 
                    className='flex items-center gap-1 text-red-500 font-medium w-fit'
                    onClick={() => logout()}
                    >
                    <FiLogOut className='w-5 h-5' />Sair
                </button>
            </div>
            
        </div>
    </section>
  )
}
