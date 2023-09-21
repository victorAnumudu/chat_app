import React from 'react'
import Avatar1 from '../../../assets/images/avatars/avatar1.jpg'
import Avatar2 from '../../../assets/images/avatars/avatar2.png'


function FriendList({avatar, name, lastMessage, time, unreadMes, handleClick, active, online}) {
    let hour = new Date(time).getHours()
    let minute = new Date(time).getMinutes()
  return (
    <div className={`px-4 w-full flex items-center gap-2 dark:hover:bg-slate-900 hover:bg-slate-200 cursor-pointer ${active ? 'bg-slate-200 dark:bg-slate-900':''}`} onClick={handleClick}>
        <div className='relative'>
            {/* online symbol */}
            {online && <div className={`absolute bottom-0 right-0 w-[10px] h-[10px] rounded-full bg-green-500`}></div>}
            {avatar ?
            // <img className='min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] rounded-full shadow-sm' src={ranNum ? Avatar1 : Avatar2} alt='User Avatar' />
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
                    {hour}:{`${minute < 10 ? '0'+minute : minute}`} {hour > 12 ? 'pm' : 'am'}
                </span>
            </div>
            <div className='flex items-center'>
                <p className='w-full text-slate-700 text-[12px] dark:text-slate-200 line-clamp-1'>{lastMessage}</p>
                {unreadMes.length > 0 && <span className='w-4 text-white bg-green-500 text-[10px] rounded-full dark:bg-green-900 flex justify-center items-center'>{unreadMes.length}</span>}
            </div>
        </div>
    </div>
  )
}

export default FriendList