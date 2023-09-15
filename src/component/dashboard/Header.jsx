import React from 'react'

function Header({children}) {
  return (
    <div className='relative z-10 p-4 w-full h-[100px] bg-slate-200 text-slate-700 dark:bg-black dark:text-white'>
      {children}
    </div>
  )
}

export default Header