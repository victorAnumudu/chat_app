import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Input from '../general/Input';
import Button from '../general/Button';

function Login() {
    const navigate = useNavigate()
    let [loginDetails, setLoginDetails] = useState({
        number: '',
        password: ''
    })

    const handleChange = ({target:{name, value}}) => {
        setLoginDetails(prev => ({...prev, [name]:value}))
    }

    const handleLogin = () => {
        console.log('working',loginDetails)
        navigate('/')
    }
    
    return(
        <div className='p-3 w-full min-w-[400px] rounded-md flex flex-col justify-center'>
            <div className='w-[70%] min-w-[350px] mx-auto'>
                <div className='w-full'>
                    <Input type='text' name='number' handleChange={handleChange} label='Enter Your Phone Number' />
                </div>
                <div className='w-full mt-4'>
                    <Input type='text' name='password' handleChange={handleChange} label='Enter Your Password' />
                </div>
                <div className='my-1 text-black dark:text-white flex justify-between items-center'>
                    <p className='text-[12px]'>Don't Have account? <Link className='text-green-700' to='../register'>Register</Link></p>
                    <p className='text-[12px]'> <Link to='../forget_password'>Forget Password?</Link></p>
                </div>
                <div className='w-full'>
                    <Button name='Login' onClick={handleLogin} />
                </div>
            </div>
        </div>
    )
}

export default Login