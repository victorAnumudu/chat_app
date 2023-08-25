import React, { useEffect, useState } from 'react'
import { createContext, useContext } from 'react'

const themeMode = createContext()

function DarkMode({children}) {
    const [theme, setTheme] = useState(null)

    useEffect(() => {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          setTheme("dark");
        } else {
          setTheme("light");
        }
      }, []);
    
      useEffect(() => {
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }, [theme]);

    const handleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    }

    let value = {theme, handleTheme}
  return (
    <themeMode.Provider value={value}>
        {children}
    </themeMode.Provider>
  )
}

export default DarkMode

export const themeContext = () => {
    return useContext(themeMode)
}