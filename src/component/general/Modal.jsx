import React from 'react'

function Modal({children, handleLogoutModal}) {
  return (
    <div className='fixed left-0 top-0 w-full h-full bg-slate-900/10 dark:bg-slate-900/20 flex flex-col justify-center items-center' onClick={handleLogoutModal}>
        <div className='p-2 overflow-y-scroll modal-zoom bg-white shadow-md rounded-xl'>
            {children}
        </div>
    </div>
  )
}

export default Modal