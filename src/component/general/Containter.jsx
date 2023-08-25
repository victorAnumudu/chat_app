import React from 'react'

function Containter({children}) {
  return (
    <div className='relative z-10 container flex mx-auto shadow-lg'>
        {children}
    </div>
  )
}

export default Containter