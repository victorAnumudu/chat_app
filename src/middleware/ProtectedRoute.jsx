import React, { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { updateUserDetails } from '../store/UserDetails'

import DashboardLayout from '../component/dashboard/DashboardLayout'
import LoadingIndicator from '../component/general/LoadingIndicator'

import Services from '../services/Services'

function ProtectedRoute({children}) {
    const api = new Services()

    let dispatch = useDispatch()
    let {userDetails} = useSelector(state => state.userDetails)
    
    let [user, setUser] = useState(null)

    // let [ws, setWS] = useState(null)

    // CALL API TO LOAD USER DETAILS
    const loadUser = () => {
      api.getUserProfile().then(({data})=>{
        if(data.status != 1){
          return setUser(false)
        }
        dispatch(updateUserDetails({...data.result_data}))
        setUser(true)
      }).catch(()=>{
        setUser(false)
      })
    }

    useEffect(()=>{
      if(userDetails?.phone_number){
        return setUser(true)
      }
      loadUser()
    },[])

//     useEffect(()=>{ // WEB SOCKET CONNECTION
//       if(user){
//         const wsConnection = new WebSocket('ws://localhost:10000')
//         setWS(wsConnection)
//       }
//     },[])
// console.log('CONNECTIONS',ws)
    if(user == null) 
    return (
    <DashboardLayout>
      <div className='w-full h-full flex flex-col justify-center items-center'>
        <LoadingIndicator text='loading' />
      </div>
    </DashboardLayout>
    )
    else if(user == false) return <Navigate to='/auth/login' replace />
    return (children || <Outlet />)
}

export default ProtectedRoute