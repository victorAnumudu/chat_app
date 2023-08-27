import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from '../general/Input';
import Button from '../general/Button';

function PasswordVerify() {
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
        navigate('../update_password',{state:{update:true}})
    }
    
    useEffect(()=>{
        let verify = pathname?.state?.verify
        if(!verify) return navigate('../register')
    },[])
    
    return(
        <div className='p-3 w-full min-w-[400px] rounded-md flex flex-col justify-center'>
            <div className='w-[70%] min-w-[350px] mx-auto'>
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

export default PasswordVerify