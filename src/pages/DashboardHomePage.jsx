import React, { useEffect, useState } from "react";
import DashboardHome from "../component/dashboard/DashboardHome";

function DashboardHomePage() {
  let [ws, setWS] = useState(null)

  let [onLineUsers, setOnlineUsers] = useState(null)

  const handleMessage = (e) => {
    let data = JSON.parse(e.data)
    let dataWithoutDups = [] // Holds data with duplicates
    data.forEach(element => {
      // dataWithoutDups[element.id] = element.username
      let elementExist = dataWithoutDups.find(item => (
        item.id == element.id
      ))
      if(!elementExist){
        dataWithoutDups = [...dataWithoutDups, {...element, lastMessage: 'Opps, that man na scam',unreadMes: [],about: 'working in power',image: '1', online:true}]
      }
    });
    console.log('HANDLE MESSAGE', dataWithoutDups)
    setOnlineUsers(dataWithoutDups)
  }
  
  useEffect(()=>{ // WEB SOCKET CONNECTION
    const serverLink = process.env.NODE_ENV == "development" ? "ws://localhost:10000": "ws://swift-chat-58zz.onrender.com";
    const ws = new WebSocket(serverLink)
    // const ws = new WebSocket('ws://localhost:10000')
    setWS(ws)
    ws.addEventListener('message', handleMessage)
  },[])

  return (
    <>
      <DashboardHome onLineUsers={onLineUsers} />
    </>
  );
}

export default DashboardHomePage;
