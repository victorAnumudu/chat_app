import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Input from '../general/Input';
import Button from '../general/Button';
import LoadingIndicator from '../general/LoadingIndicator';

import Services from '../../services/Services';

import { updateUserDetails } from '../../store/UserDetails';
import { useDispatch } from 'react-redux';

function Login() {
    const api = new Services()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    let [requestStatus, setRequestStatus] = useState({loading: 0, status: 0, message:''})

    let [loginDetails, setLoginDetails] = useState({
        number: '',
        password: ''
    })

    const handleChange = ({target:{name, value}}) => {
        setLoginDetails(prev => ({...prev, [name]:value}))
    }

    const handleLogin = () => {
        setRequestStatus({loading: 0, status: 0, message:''})
        let {number, password} = loginDetails
        let reqData = {
            phone_number: number, password
        }
        if(!number || !password ){
            setRequestStatus({loading: 0, status: 0, message:`Please fill all fields`})
            return setTimeout(()=>{
                setRequestStatus({loading: 0, status: 0, message:''})
            },3000)
        }

        // Start loading
        setRequestStatus({loading: 1, status: 0, message:''})
        api.loginUser(reqData).then(response => {
            if(response.data.status !=1){
                return setRequestStatus({loading: 0, status: 0, message:response.data.message})
            }
            setRequestStatus({loading: 0, status: 1, message:response.data.message})
            let {result_data} = response.data
            dispatch(updateUserDetails({...result_data}))
            navigate('/',{replace:true})
            localStorage.setItem('id',result_data._id)
            localStorage.setItem('token',result_data.token)
        }).catch(error=>{
            setRequestStatus({loading: 0, status: 0, message:error.type != undefined? error.message : 'Opps! something happened. Try again'})
        }).finally(()=>{
            setTimeout(()=>{
                setRequestStatus({loading: 0, status: 0, message:''})
            },3000)
        })
        // setRequestStatus({loading: true, status: false, message:''})
        // setTimeout(()=>{
        //     dispatch(updateUserDetails({name: 'john'}))
        //     navigate('/')
        // },3000)
    }
    
    return(
        <div className='p-3 w-full rounded-md flex flex-col justify-center'>
            <div className='w-[90%] lg:w-[70%] mx-auto'>
                <div className='w-full'>
                    <Input type='text' name='number' value={loginDetails.number} handleChange={handleChange} label='Enter Your Phone Number' />
                </div>
                <div className='w-full mt-4'>
                    <Input type='password' name='password' value={loginDetails.password} handleChange={handleChange} label='Enter Your Password' />
                </div>
                <div className='my-1 text-black dark:text-white flex justify-between items-center'>
                    <p className='text-[12px]'>Don't Have account? <Link className='text-green-700' to='../register'>Register</Link></p>
                    <p className='text-[12px]'> <Link to='../forget_password'>Forget Password?</Link></p>
                </div>
                <div className='w-full'>
                    {requestStatus.loading ?
                    <div className='w-full text-center text-xl px-4 py-2 md:text-xl bg-[#ff6610] rounded-full'>
                        <LoadingIndicator text='loading' />
                    </div>
                    :
                    <Button name='Login' onClick={handleLogin} />
                    }
                </div>

                {/* ERROR/SUCESS DISPLAY */}
                {requestStatus.message && 
                <div className='w-full'>
                    <p className={`${requestStatus.status?'text-green-500':'text-red-500'}`}>{requestStatus.message}</p>
                </div>
                }
                
            </div>
        </div>
    )
}

export default Login