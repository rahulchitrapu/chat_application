import React from 'react'
import { Route, Routes } from 'react-router'
import Signin from '../pages/singin/Signin'



export default function RoutePage() {
  return (
    <div style={{width:'100vw',height:'100vh'}}>
        <Routes>
            <Route path='/' element={<Signin/>}/>
            <Route path='/signin' element={<Signin/>}/>
        </Routes>
    </div>
  )
}
