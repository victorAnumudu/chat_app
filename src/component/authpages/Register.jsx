import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Services from '../../services/Services'

import Input from '../general/Input'
import Button from '../general/Button'
import LoadingIndicator from '../general/LoadingIndicator'


function Register() {
    const navigate = useNavigate()
    const api = new Services()

    let [requestStatus, setRequestStatus] = useState({loading: 0, status: 0, message:''})

    let [registerDetails, setRegisterDetails] = useState({
        username: '',
        number: '',
        password: '',
        confirm_pwd: ''
    })

    const handleChange = ({target:{name, value}}) => {
        setRegisterDetails(prev => ({...prev, [name]:value}))
    }

    const handleRegister = () => {
        setRequestStatus({loading: 0, status: 0, message:''})
        let {username, number, password, confirm_pwd} = registerDetails
       
        if(!number || !password || !username){
            setRequestStatus({loading: 0, status: 0, message:'Please fill all inputs'})
            return setTimeout(()=>{
                setRequestStatus({loading: 0, status: 0, message:''})
            },3000)
        }
        if(password != confirm_pwd){
            setRequestStatus({loading: 0, status: 0, message:'Password do not match'})
            return setTimeout(()=>{
                setRequestStatus({loading: 0, status: 0, message:''})
            },3000)
        }
        let reqData = {
            username,phone_number:number, password, confirm_pwd
        }
        // Start loading
        setRequestStatus({loading: 1, status: 0, message:''})
        api.registerUser(reqData).then(response => {
            if(response.data.status !=1){
                return setRequestStatus({loading: 0, status: 0, message:response.data.message})
            }
            setRequestStatus({loading: 0, status: 1, message:response.data.message})
            
            setTimeout(()=>{
                // navigate('../signup_verify',{state:{verify:true}})
                navigate('../login',{replace:true})
            },3000)
        }).catch(error=>{
            setRequestStatus({loading: 0, status: 0, message:error.type != undefined? error.message : 'Opps! something happened. Try again'})
            // setRequestStatus({loading: 0, status: 0, message:'Network Error. Try Again'})
        }).finally(()=>{
            setTimeout(()=>{
                setRequestStatus({loading: 0, status: 0, message:''})
            },3000)
        })
    }
    return(
        <div className='p-3 w-full rounded-md flex flex-col justify-center'>
            <div className='w-[90%] lg:w-[70%] mx-auto'>
            <div className='w-full'>
                    <Input type='text' name='username' handleChange={handleChange} label='Enter Your Full Name' />
                </div>
                <div className='w-full'>
                    <Input type='text' name='number' handleChange={handleChange} label='Enter Your Phone Number' />
                </div>
                <div className='w-full my-4'>
                    <Input type='password' name='password' handleChange={handleChange} label='Enter Your Password' />
                </div>
                <div className='w-full'>
                    <Input type='password' name='confirm_pwd' handleChange={handleChange} label='Retype Your Password' />
                </div>
                <div className='my-1 text-black dark:text-white flex justify-between items-center'>
                    <p className='text-[12px]'>Already have an account? <Link className='text-green-700' to='../login'>Login</Link></p>
                </div>
                <div className='w-full'>
                    {requestStatus.loading ?
                        <div className='w-full text-center text-xl px-4 py-2 md:text-xl bg-[#ff6610] rounded-full'>
                            <LoadingIndicator text='loading' />
                        </div>
                        :
                        <Button name='Register' onClick={handleRegister} />
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

export default Register