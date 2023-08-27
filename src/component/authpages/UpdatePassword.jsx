import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from '../general/Input';
import Button from '../general/Button';

function UpdatePassword() {
    const navigate = useNavigate()
    const pathname = useLocation()
    let [updateDetails, setUpdateDetails] = useState({
        password: '',
        confirm_pwd: ''
    })

    const handleChange = ({target:{name, value}}) => {
        setUpdateDetails(prev => ({...prev, [name]:value}))
    }

    const UpdatePassword = () => {
        console.log('working',updateDetails)
        navigate('../login')
    }

    useEffect(()=>{
        let update = pathname?.state?.update
        if(!update) return navigate('../register')
    },[])
    
    return(
        <div className='p-3 w-full min-w-[400px] rounded-md flex flex-col justify-center'>
            <div className='w-[70%] min-w-[350px] mx-auto'>
                <div className='w-full'>
                    <Input type='text' name='number' handleChange={handleChange} label='Enter New Password' />
                </div>
                <div className='w-full my-4'>
                    <Input type='text' name='password' handleChange={handleChange} label='Retype Password' />
                </div>
                <div className='w-full'>
                    <Button name='Update Password' onClick={UpdatePassword} />
                </div>
            </div>
        </div>
    )
}

export default UpdatePassword