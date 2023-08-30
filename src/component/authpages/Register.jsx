import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Input from '../general/Input'
import Button from '../general/Button'


function Register() {
    const navigate = useNavigate()
    let [registerDetails, setRegisterDetails] = useState({
        number: '',
        password: '',
        confirm_pwd: ''
    })

    const handleChange = ({target:{name, value}}) => {
        setRegisterDetails(prev => ({...prev, [name]:value}))
    }

    const handleRegister = () => {
        console.log('working',registerDetails)
        navigate('../signup_verify',{state:{verify:true}})
    }
    return(
        <div className='p-3 w-full rounded-md flex flex-col justify-center'>
            <div className='w-[90%] lg:w-[70%] mx-auto'>
                <div className='w-full'>
                    <Input type='text' name='number' handleChange={handleChange} label='Enter Your Phone Number' />
                </div>
                <div className='w-full my-4'>
                    <Input type='text' name='password' handleChange={handleChange} label='Enter Your Password' />
                </div>
                <div className='w-full'>
                    <Input type='text' name='confirm_pwd' handleChange={handleChange} label='Retype Your Password' />
                </div>
                <div className='my-1 text-black dark:text-white flex justify-between items-center'>
                    <p className='text-[12px]'>Already have an account? <Link className='text-green-700' to='../login'>Login</Link></p>
                </div>
                <div className='w-full'>
                    <Button name='Register' onClick={handleRegister} />
                </div>
            </div>
        </div>
    )
}

export default Register