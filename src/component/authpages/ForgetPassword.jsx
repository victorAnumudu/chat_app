import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Input from '../general/Input';
import Button from '../general/Button';

function ForgetPassword() {
    const navigate = useNavigate()
    let [phoneNumber, setPhoneNumber] = useState({
        number: ''
    })

    const handleChange = ({target:{name, value}}) => {
        setPhoneNumber(prev => ({...prev, [name]:value}))
    }

    const recoverPassword = () => {
        console.log('working',phoneNumber)
        navigate('../password_verify',{state:{verify:true}})
    }
    
    return(
        <div className='p-3 w-full min-w-[400px] rounded-md flex flex-col justify-center'>
            <div className='w-[70%] min-w-[350px] mx-auto'>
                <div className='w-full mb-4'>
                    <Input type='text' name='number' handleChange={handleChange} label='Enter Your Phone Number' />
                </div>
                <div className='w-full'>
                    <Button name='Recover' onClick={recoverPassword} />
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword