import React from 'react'

function MainContainer({section, windowWidth, children}) {
  return (
    <div className={`${section=='main' && windowWidth<=767 ? 'w-full':section=='aside' && windowWidth<=767? 'hidden':'md:block w-full'}`}>
        {children}
    </div>
  )
}

export default MainContainer