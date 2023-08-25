import React, { useEffect, useState } from 'react'

function AsideSearchFriends({type, icon, placeholder, onChange}) {
    let [searchWord, setSearchWord] = useState('')

    const handleSearch = ({target:{value}}) => {
        setSearchWord(value)
        onChange(value)
    } 
    
    return (
        <div className='relative'>
            {/* <div className='w-full rounded-full overflow-hidden'> */}
                <input 
                    type={type} placeholder={placeholder} 
                    className='px-8 py-1 w-full outline-none rounded-full shadow-sm border bg-slate-200 text-slate-900' 
                    value={searchWord}
                    onChange={handleSearch}
                />
            {/* </div> */}
            {icon && <img className='w-4 h-4 absolute top-1/2 left-2 -translate-y-1/2' src={icon} alt='icon' />}
        </div>
      )
}

export default AsideSearchFriends