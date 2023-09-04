import React from 'react'
import Header from '../Header'
import { themeContext } from '../../../context/DarkMode'

import Avatar from '../../../assets/images/avatars/avatar1.jpg'

function MainHeader({user, toggleSection}) {
  return (
    <Header>
        <div className='h-full flex justify-between items-center'>
            <div className='w-full flex items-center gap-2'>
                {/* <div className='back'>
                    <i className="fa-regular fa-circle-left text-3xl"></i>
                </div> */}
                <div className='relative'>
                    {/* User Avatar */}
                    {user?.image ?
                        <img className='w-20 h-20 rounded-full cursor-pointer' src={Avatar} alt='User Image' />
                        :
                        <div className='p-1 min-w-[80px] min-h-[80px] max-w-[80px] max-h-[80px] cursor-pointer rounded-full shadow-sm flex justify-center items-center text-base md:text-xl text-slate-200 dark:text-slate-700 bg-slate-700 dark:bg-slate-200'>
                            {user?.name[0]} {user?.name[1]}
                        </div>
                    }
                    {/* online symbol */}
                    <div className={`absolute bottom-1 right-2 w-[10px] h-[10px] rounded-full bg-green-500`}></div>
                </div>
                
                {/* USER DETAILS */}
                <div className='flex-grow flex flex-col justify-center'>
                    <h1 className='text-base md:text-xl text-slate-700 dark:text-slate-200 font-bold'>{user?.name}</h1>
                    <p className='text-sm md:text-lg text-slate-700 dark:text-slate-200 line-clamp-1'>{user?.lastMessage}</p>
                </div>

                {/* ACTIVE SECTION SWITCH */}
                <div className='back md:hidden' onClick={toggleSection}>
                    <i className="fa-regular fa-circle-left text-3xl"></i>
                </div>

                {/* MENU */}
                <div className='w-8 flex justify-end items-center cursor-pointer text-slate-900 dark:text-slate-100'>
                    <i className="fa-solid fa-ellipsis-vertical text-3xl"></i>
                </div>
            </div>
        </div>
    </Header>
  )
}

export default MainHeader