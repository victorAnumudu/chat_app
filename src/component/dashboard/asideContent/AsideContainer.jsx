import React from 'react'

function AsideContainer({section, windowWidth, children}) {
  return (
    <div className={`${section=='aside' && windowWidth<=767 ?'w-full':section=='main' && windowWidth<=767?'hidden':'w-full md:w-[500px]'} md:border-r-4`}>
        {children}
    </div>
  )
}

export default AsideContainer