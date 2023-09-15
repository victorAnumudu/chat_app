import React from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./middleware/ProtectedRoute";

import DashboardHomePage from "./pages/DashboardHomePage";
import DashboardAddFriendPage from "./pages/DashboardAddFriendPage";
import Auth from "./pages/Auth";
import Login from "./component/authpages/Login";
import Register from "./component/authpages/Register";
import ErrorPage from "./pages/ErrorPage";

function PageRouters() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<DashboardHomePage />} />
        <Route path="/addfriend" element={<DashboardAddFriendPage />} />
      </Route>
      <Route path="/auth/*" element={<Auth />} />
      {/* <Route path='/auth' element={<Auth />}>
            <Route path='' element={<Register />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
        </Route> */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default PageRouters;
