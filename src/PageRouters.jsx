import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import Login from './component/authpages/Login'
import Register from './component/authpages/Register'
import ErrorPage from './pages/ErrorPage'

function PageRouters() {
  return (
    <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/auth/*' element={<Auth />} />
        {/* <Route path='/auth' element={<Auth />}>
            <Route path='' element={<Register />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
        </Route> */}
        <Route path='*' element={<ErrorPage />} />
    </Routes>
  )
}

export default PageRouters