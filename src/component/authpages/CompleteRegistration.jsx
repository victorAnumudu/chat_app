import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from '../general/Input';
import Button from '../general/Button';

function CompleteRegistration() {
    const navigate = useNavigate()
    const pathname = useLocation()
    let [otp, setOtp] = useState({
        otp: ''
    })

    
    const handleChange = ({target:{name, value}}) => {
        setOtp(prev => ({...prev, [name]:value}))
    }
    
    const verifyOTP = () => {
        console.log('working',otp)
        navigate('../login')
    }
    
    useEffect(()=>{
        let verify = pathname?.state?.verify
        if(!verify) return navigate('../register')
    },[])
    
    return(
        <div className='p-3 w-full rounded-md flex flex-col justify-center'>
            <div className='w-[90%] lg:w-[70%] mx-auto'>
                <div className='w-full mb-4'>
                    <Input type='text' name='otp' handleChange={handleChange} label='Enter OTP' />
                </div>
                <div className='w-full'>
                    <Button name='Verify' onClick={verifyOTP} />
                </div>
            </div>
        </div>
    )
}

export default CompleteRegistration