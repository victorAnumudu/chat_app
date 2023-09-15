import React, { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { updateUserDetails } from '../store/UserDetails'

import DashboardLayout from '../component/dashboard/DashboardLayout'
import LoadingIndicator from '../component/general/LoadingIndicator'

function ProtectedRoute({children}) {

    let dispatch = useDispatch()
    let {userDetails} = useSelector(state => state.userDetails)
    
    let [user, setUser] = useState(null)

    // CALL API TO LOAD USER DETAILS
    const loadUser = () => {
      dispatch(updateUserDetails({name: 'john'}))
      setTimeout(()=>{
        setUser(true)
      }, 2000)
    }

    useEffect(()=>{
      if(userDetails?.name){
        return setUser(true)
      }
      setUser(false)
      // loadUser()
    },[])

    // return isLogin.loading && !loggedIn ? (
    //     <LoadingSpinner size="32" color="sky-blue" height="h-screen" />
    //   ) : !isLogin.status && !loggedIn ? (
    //     <Navigate to={redirectPath} replace />
    //   ) : (
    //     children || <Outlet />
    //   );
    // return !user ? (
    //     <Navigate to='/auth/login' replace />
    //   ) : (
    //     children || <Outlet />
    //   );
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