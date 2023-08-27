import React, { useEffect, useState } from "react";
import Containter from "../general/Containter";
import LeftAside from "../general/AsideComponent";
import MainContent from "../general/MainComponent";
import AsideBg from "../../assets/images/auth/aside_bg.svg";
import Logo from "../../assets/images/logo.svg";
import { Outlet, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import CompleteRegistration from "./CompleteRegistration";
import ForgetPassword from "./ForgetPassword";
import PasswordVerify from "./PasswordVerify";
import UpdatePassword from "./UpdatePassword";
import Error from "./Error";

function AuthPage() {
  return (
    <div className="relative flex h-screen p-5 bg-slate-100 dark:bg-brown-dark">
      <div className="absolute left-0 top-0 z-0 w-full h-28 bg-sky-300 dark:bg-brown-light"></div>
      <Containter>
        <div className="hidden md:block w-1/2">
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
        <div className="w-full md:w-1/2">
          <MainContent>
          <div className='h-full flex flex-col justify-center items-center'>
            <div className='mb-5 w-full md:hidden flex justify-center items-center'>
                <img className='w-[300px]' src={Logo} alt='Site Logo' />
            </div>
              <Routes>
                <Route element={<Outlet />}>
                  <Route path="" element={<Login />} />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="signup_verify" element={<CompleteRegistration />} />

                  <Route path="forget_password" element={<ForgetPassword />} />
                  <Route path="password_verify" element={<PasswordVerify />} />
                  <Route path="update_password" element={<UpdatePassword />} />
                  <Route path="*" element={<Error />} />
                </Route>
              </Routes>
            </div>
          </MainContent>
        </div>
      </Containter>
    </div>
  );
}

export default AuthPage;
