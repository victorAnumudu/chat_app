import React from 'react'

function MainContent({className, children}) {
  return (
    <main className={`w-full h-full bg-white-light text-black dark:bg-brown-light dark:text-white-light overflow-y-auto ${className ? className : ''}`}>
        {children}
    </main>
  )
}

export default MainContent