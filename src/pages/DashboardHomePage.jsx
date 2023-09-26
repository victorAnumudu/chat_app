import React, { useEffect, useState } from "react";
import DashboardHome from "../component/dashboard/DashboardHome";

function DashboardHomePage() {
  let [ws, setWS] = useState(null)

  let [onLineUsers, setOnlineUsers] = useState(null)

  let [addNewMes, setAddNewMes] = useState({}) // HOLDS STATE FOR NEWLY ADDED MESSAGE FROM ANOTHER USER

  const handleMessage = (e) => {
    let data = JSON.parse(e.data)
    if(data.message){
      //remove duplicates
      let newData = {}
      Object.keys(data).forEach(element => {
        newData[element] = data[element]
      });
      setAddNewMes(newData)
    }else{
      let dataWithoutDups = [] // Holds data with duplicates
      data.forEach(element => {
        let elementExist = dataWithoutDups.find(item => (
          item.id == element.id
        ))
        if(!elementExist){
          dataWithoutDups = [...dataWithoutDups, {...element, lastMessage: 'Opps, that man na scam',unreadMes: [],about: 'working in power',image: '1', online:true}]
        }
      });
      setOnlineUsers(dataWithoutDups)
    }
  }

  // FUNCTION TO SEND MESSAGE TO SELECTED USER
  const sendMessage = (mesDetails) => {
    ws.send(JSON.stringify({
      ...mesDetails
    }))
  }
  
  useEffect(()=>{ // WEB SOCKET CONNECTION
    const serverLink = process.env.NODE_ENV == "development" ? "ws://localhost:10000": "wss://swift-chat-58zz.onrender.com";
    const ws = new WebSocket(serverLink)
    // const ws = new WebSocket('ws://localhost:10000')
    setWS(ws)
    ws.addEventListener('message', handleMessage)
  },[])

  return (
    <>
      <DashboardHome onLineUsers={onLineUsers} sendMessage={sendMessage} addNewMes={addNewMes} setAddNewMes={setAddNewMes} />
    </>
  );
}

export default DashboardHomePage;
