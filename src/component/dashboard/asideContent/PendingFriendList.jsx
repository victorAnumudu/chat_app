import React from 'react'
import Button from '../../general/Button'
import Avatar1 from '../../../assets/images/avatars/avatar1.jpg'


function PendingFriendList({avatar, name, time, handleClick, active}) {
    let date = new Date(time).toLocaleDateString()
  return (
    <div className={`px-4 w-full flex items-center gap-2 dark:hover:bg-slate-900 hover:bg-slate-200 cursor-pointer ${active ? 'bg-slate-200 dark:bg-slate-900':''}`} onClick={handleClick}>
        <div className='relative'>
            {avatar ?
            <img className='min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] rounded-full shadow-sm' src={Avatar1} alt='User Avatar' />
            :
            <div className='p-1 min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] rounded-full shadow-sm flex justify-center items-center text-sm text-slate-800 bg-slate-400'>
                {name[0]} {name[1]}
            </div>
            }
        </div>
        <div className='py-1 flex flex-col justify-center w-full border-b border-slate-600 dark:border-white'>
            <div className='flex items-center'>
                <h1 className='w-full text-slate-900 text-base tracking-wide dark:text-slate-300 line-clamp-1'>{name}</h1>
                <span className='w-16 text-right text-slate-900 text-[10px] tracking-wide dark:text-slate-300'>
                    {date}
                </span>
            </div>
            <div className='flex items-center justify-end gap-2'>
                <button name='accept' className='px-1 py-[1px] text-[10px] bg-green-700 text-white hover:bg-green-500 rounded-full transition-all duration-500'>Accept</button>
                <button name='cancel' className='px-1 py-[1px] text-[10px] bg-[#ff6610] text-white hover:bg-[#ffb285] rounded-full transition-all duration-500'>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default PendingFriendList