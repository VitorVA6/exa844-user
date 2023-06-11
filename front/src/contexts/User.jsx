import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const UserContext = createContext()

export default function UserProvider({children}){
    const [authenticated, setAuthenticated] = useState(false)
    const [user, setUser] = useState({})
    const [users, setUsers] = useState([])

    return (
        <UserContext.Provider value = {{authenticated, setAuthenticated, setUser, user, users, setUsers}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext(){
    const {authenticated, setAuthenticated, setUser, user, users, setUsers} = useContext(UserContext)
    const navigate = useNavigate()

    async function login(email, password){
        const url = '/users/login'
        try{
            const response = await axios.post(url, {email, password})
            setAuthenticated(true)
            localStorage.setItem('token', response.data.token)
            setUser(response.data.user)
            
        }catch(err){
            console.log(err.response.data)
        }
    }

    async function getAll(){
        const url = '/users/all'

        try{

            const {data} = await axios.get(url)
            setUsers(data)

        }catch(err){
            console.log(err)
        }
    }

    async function signup(nome, sobrenome, cpf, tipo, email, password){
        const url = '/users/register'
        try{
            const response = await axios.post(url, {nome, sobrenome, cpf, tipo, email, password})
            console.log(response)
            
        }catch(err){
            console.log(err.response.data)
        }
    }

    async function updateProfile(nome, sobrenome, cpf, email){
        const url = '/users/update'
        try{
            const {data} = await axios.put(url, {nome, sobrenome, cpf, email})
            return data
            
        }catch(err){
            console.log(err.response.data)
        }
    }

    async function updatePw(senha){
        const url = '/users/update-pw'
        try{
            const {data} = await axios.put(url, {senha})
            return data
            
        }catch(err){
            console.log(err.response.data)
        }
    }

    function logout(){

        localStorage.removeItem('token')
        setUser({})
        axios.defaults.headers.Authorization = undefined
        navigate('/login')
        setAuthenticated(false)

    }

    async function checkAuth(){
        const token = localStorage.getItem('token')
        
        if (!token) {
            setAuthenticated(false)
            return
        }
        axios.defaults.headers.Authorization = token
        setAuthenticated(true)
    }

    async function getUser(){
    
        try{
            const {data} = await axios.get('/users/get-user')
            return data
        }catch(err){
            console.log(err)
        }

    }

    async function remove(id){
        try{
            const {data} = await axios.delete(`/users/${id}`)
            getAll()
        }catch(err){
            console.log(err)
        }
    }

    async function updatePwAdmin(id, senha){
        try{
            const {data} = await axios.put(`/users/admin/${id}`, {senha})
            console.log(data)
        }catch(err){
            console.log(err)
        }

    }

    return {
        authenticated,
        checkAuth,
        login,
        logout,
        signup,
        getUser,
        updateProfile,
        updatePw,
        getAll,
        remove,
        updatePwAdmin,
        user,
        setUser,
        users,
        setUsers
    }
}