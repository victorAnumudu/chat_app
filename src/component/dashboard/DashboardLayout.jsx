import React from 'react'
import Containter from '../general/Containter';

function DashboardLayout({children}) {
    return (
        <div className="relative flex h-screen p-5 bg-slate-100 dark:bg-brown-dark">
          <div className="absolute left-0 top-0 z-0 w-full h-28 bg-sky-300 dark:bg-brown-light"></div>
          <Containter>
            {children}
          </Containter>
        </div>
      );
}

export default DashboardLayout