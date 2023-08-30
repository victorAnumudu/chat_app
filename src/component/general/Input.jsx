import React from 'react'

function Input({type, label, icon, error, name, value, handleChange}) {
  return (
    <div className='relative w-full'>
        {label && <label className='text-sm text-black dark:text-slate-100'>{label} <span className='text-red-500'>{error? error : ''}</span></label>}
        <div className='w-full rounded-full overflow-hidden shadow-sm shadow-black'>
            <input type={type} name={name} onChange={handleChange} value={value} className='px-4 py-2 w-full h-[50px] outline-none border-0' />
        </div>
        {icon && <img className='absolute top-1/2 left-1 -translate-y-1/2' src={icon} alt='icon' />}
    </div>
  )
}

export default Input