import React from 'react'

function AsideContent({AsideBg, className, children}) {
  return (
    // <aside className={`w-full h-full bg-white text-black dark:bg-brown-dark dark:text-white overflow-y-auto ${className ? className : ''}`}>
    //     {children}
    // </aside>
    <aside className={`w-full h-full bg-white text-black dark:bg-brown-dark dark:text-white overflow-y-auto bg-center bg-cover bg-no-repeat ${className ? className : ''}`} style={{backgroundImage: `url(${AsideBg})`}}>
        {children}
    </aside>
    // <aside className={`w-full h-full bg-white text-black dark:bg-brown-dark dark:text-white overflow-y-auto bg-[url(../../assets/auth/bg.svg)] bg-center bg-cover bg-no-repeat`}>
    //     {children}
    // </aside>
  )
}

export default AsideContent