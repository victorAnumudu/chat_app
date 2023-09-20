import React, { useEffect, useState } from "react";
import DashboardHome from "../component/dashboard/DashboardHome";

function DashboardHomePage() {
  let [ws, setWS] = useState(null)

  const handleMessage = (e) => {
    console.log('HANDLE MESSAGE',e)
  }
  
  useEffect(()=>{ // WEB SOCKET CONNECTION
    const ws = new WebSocket('ws://localhost:10000')
    setWS(ws)
    ws.addEventListener('message', handleMessage)
  },[])

  return (
    <>
      <DashboardHome />
    </>
  );
}

export default DashboardHomePage;
