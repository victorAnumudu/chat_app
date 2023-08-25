import React, { useEffect, useState } from "react";
import Containter from "../general/Containter";
import LeftAside from "../general/AsideComponent";
import MainContent from "../general/MainComponent";
import AsideBg from "../../assets/images/auth/aside_bg.svg";
import Logo from "../../assets/images/logo.svg";
import { Outlet, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Error from "./Error";

function AuthPage() {
  return (
    <div className="relative flex h-screen p-5 bg-slate-100 dark:bg-brown-dark">
      <div className="absolute left-0 top-0 z-0 w-full h-28 bg-sky-300 dark:bg-brown-light"></div>
      <Containter>
        <div className="hidden md:block w-[500px]">
          <LeftAside
            className={"flex flex-col items-center justify-center"}
            AsideBg={AsideBg}
          >
            <img
              className="w-[90%] shadow-md shadow-white"
              src={Logo}
              alt="Site Logo"
            />
          </LeftAside>
        </div>
        {/* <div className='w-full'>
                <MainContent>
                    <Outlet />
                </MainContent>
            </div> */}
        <div className="w-full">
          <MainContent>
            <Routes>
              <Route element={<Outlet />}>
                <Route path="" element={<Login />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<Error />} />
              </Route>
            </Routes>
          </MainContent>
        </div>
      </Containter>
    </div>
  );
}

export default AuthPage;
