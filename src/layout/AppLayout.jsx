import React from 'react'
import Header from '@/components/common/Header'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
   <main>
    <Header />
    <Outlet />
   </main>
//    { footer part here }
  )
}

export default AppLayout