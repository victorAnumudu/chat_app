import React from "react";
import Header from "../Header";
import Logo from "../../../assets/images/logo.svg";
import DarkLogo from "../../../assets//images/dark_logo.svg";
import Avatar from "../../../assets/images//avatars/avatar1.jpg";

import { themeContext } from "../../../context/DarkMode";

function AsideHeader() {
  let { theme, handleTheme } = themeContext();

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
        <div
          className="cursor-pointer text-slate-900 dark:text-slate-100"
          onClick={handleTheme}
        >
          <i className="fa-solid fa-moon text-3xl"></i>
        </div>
      </div>
    </Header>
  );
}

export default AsideHeader;
