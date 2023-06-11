import React, { useState } from 'react'
import { useUserContext } from '../contexts/User'

export default function ( {user} ) {

    const { updatePwAdmin, remove} = useUserContext()

    const [showMore, setShowMore] = useState(false)
    const [senha, setSenha] = useState('')

    function removeUser(){
        remove(user._id)
    }

    function changePw(){
        updatePwAdmin(user._id, senha)
        .then( data => {
            setSenha('')
        } )
    }

    return (
    <div className='flex flex-col items-center w-full bg-gray-100 py-4 rounded-xl text-black shadow-md h-fit'>
        <div className='flex justify-between w-full items-center px-5'>
            <div className='flex flex-col'>
                <p className='text-xl font-medium'>{user.nome}</p>
                <p className='text-gray-500'>{user.email}</p>
                <p className='text-blue-400 text-sm'>{`${user.tipo === 'admin' ? 'Tipo: Administrador' : 'Tipo: Usuário comum'}`}</p>
            </div>
            <button 
                className='bg-red-500 px-3 py-1.5 h-fit text-white rounded-md'
                onClick={removeUser}
            >Excluir</button>
        </div>
        {
            showMore === true && (
                <div className='flex w-full justify-between mt-5 h-fit px-5'>
                    <input 
                        type="password" 
                        className='py-1.5 px-4 rounded-md outline-none bg-gray-300 h-fit'
                        placeholder='Nova senha'
                        value={senha}
                        onChange={ (ev) => setSenha(ev.target.value) } 
                    />
                    <button 
                        className='bg-blue-400 text-white px-3 py-1.5 rounded-md h-fit'
                        onClick={changePw}
                    >Redefinir</button>
                </div>
            )
        }
        <button 
            className='text-blue-400 mt-3'
            onClick={() => setShowMore(!showMore)}
        >{`${showMore === true ? 'Menos' : 'Mais'} opções`}</button>
    </div>
  )
}
