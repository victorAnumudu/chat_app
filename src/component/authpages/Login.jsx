import React from 'react'
import { useNavigate } from "react-router-dom";
import Input from '../general/Input';

function Login() {
    const navigate = useNavigate()
    return(
        <div className='h-full flex flex-col justify-center items-center'>
            <div className='p-5 w-[80%] lg:w-[500px] h-[300px] bg-white text-black shadow-md rounded-md'>
                <Input type='text' label='Enter Your Phone Number' />
            </div>
        </div>
    )
}

export default Login