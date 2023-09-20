import React, { useState } from "react";
import Header from "../Header";
import Logo from "../../../assets/images/logo.svg";
import DarkLogo from "../../../assets//images/dark_logo.svg";
import Avatar from "../../../assets/images//avatars/avatar1.jpg";

import { themeContext } from "../../../context/DarkMode";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { updateUserDetails } from "../../../store/UserDetails";
import { useDispatch } from "react-redux";
import Modal from "../../general/Modal";

function AsideHeader() {
  let {pathname} = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  let { theme, handleTheme } = themeContext();

  let [menuIsOpen, setMenuIsOpen] = useState(false) // FOR HANDLING ASIDE MENU SHOW/HIDE

  let [logoutModal, setLogoutModal] = useState({show:false})

  const handleOpenMenu = () => {
    setMenuIsOpen(prev => !prev)
  }

  const logout = () => {
    dispatch(updateUserDetails({}))
    localStorage.removeItem('id')
    localStorage.removeItem('token')
    navigate('/auth/login', {replace:true})
  }

  const handleLogoutModal = (e) => {
    e.stopPropagation()
    setMenuIsOpen(false)
    setLogoutModal(prev => ({...prev, show:!prev.show}))
  }

  return (
    <Header>
      <div className="h-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* User Avatar */}
          <img
            className="w-20 h-20 rounded-full cursor-pointer"
            src={Avatar}
            alt="User Image"
          />
          {/* Site Logo */}
          <div className="">
            {theme === "light" ? (
              <img className="w-40" src={Logo} alt="Site Logo" />
            ) : (
              <img className="w-40" src={DarkLogo} alt="Site Logo" />
            )}
            <p className="text-green-500">Online</p>
          </div>
        </div>
        {/* dark mode toggle */}
        {/* <div
          className="cursor-pointer text-slate-900 dark:text-slate-100"
          onClick={handleTheme}
        >
          <i className="fa-solid fa-moon text-3xl"></i>
        </div> */}

        {/* MENU BAR*/}
        <div
          className="relative text-slate-900 dark:text-slate-100"
        >
          <i onClick={handleOpenMenu} className="fa-solid fa-ellipsis-vertical text-3xl cursor-pointer p-4"></i>
          <div className={`${menuIsOpen ? 'right-0':'-right-[300px]'} absolute z-auto transition-all duration-300 top-full w-[200px] bg-white dark:bg-slate-900 text-slate-900 dark:text-white`}>
            <ul>
              <li className="">
                <Link 
                  className={`w-full flex gap-2 items-center p-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all ${pathname=='/'?'border-b-4 border-slate-700':''}`} 
                  to='/'
                >
                  <span><i className="fa-solid fa-house"></i></span>Home
                </Link>
              </li>
              <li className="">
                <Link 
                  className={`w-full flex gap-2 items-center p-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all ${pathname=='/addfriend'?'border-b-4 border-slate-700':''}`} 
                  to='/addfriend'
                >
                  <span><i className="fa-solid fa-user-group"></i></span>Add friend
                </Link>
              </li>
              {/* <li></li> */}
            </ul>
            <button className="w-full flex gap-2 items-center p-2 mt-10 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all" onClick={handleTheme}>
              <span><i className="fa-solid fa-moon"></i></span> Switch Mode
            </button>
            <button className="w-full flex gap-2 items-center p-2 bg-red-500" onClick={handleLogoutModal}>
              <span><i className="fa-solid fa-right-from-bracket"></i></span> Logout
            </button>
          </div>
        </div>
      </div>

      {/* CONFIRM LOGOUT MODAL */}
      {logoutModal.show &&
      <Modal handleLogoutModal={handleLogoutModal}>
        <div className='p-2 w-[500px] h-[500px] flex flex-col justify-center items-center'>
            <button className="px-2 py-1 rounded-lg shadow-md" onClick={logout}>Logout</button>
            <button className="px-2 py-1 rounded-lg shadow-md" onClick={handleLogoutModal}>Cancel</button>
        </div>
      </Modal>
      }
    </Header>
  );
}

export default AsideHeader;
