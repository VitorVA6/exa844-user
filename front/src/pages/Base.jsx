import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

export default function Base() {

  return (
    <section className='flex flex-col h-screen overflow-y-auto bg-[#013244] text-white'>      
        <Header/> 
        <div className='px-16'>
          <Outlet />
        </div>
      
    </section>
  )
}