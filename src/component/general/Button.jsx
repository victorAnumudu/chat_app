import React from 'react'

function Button({name, onClick, className}) {
  return (
    <button 
      onClick={onClick} 
      className={`px-4 py-2 w-full text-base md:text-xl bg-[#ff6610] rounded-full hover:bg-sky-600 transition-all duration-500 ${className && className}`} 
      name={name}
    >
      {name}
    </button>
  )
}

export default Button