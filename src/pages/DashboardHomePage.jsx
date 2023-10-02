import React, { useEffect, useState } from "react";
import DashboardHome from "../component/dashboard/DashboardHome";
import Services from "../services/Services";

// import AllFriendList from "../backend/AllFriendList";

function DashboardHomePage() {
  const api = new Services()
  let [ws, setWS] = useState(null)

  //  const [friends, setFriends] = useState({ data: [] });
  //  const [filteredfriends, setFilteredFriends] = useState({
  //   loading: true,
  //   data: [],
  // }); // HOLDS ALL USER FRIEND's LIST

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
      let dataWithoutDups = [] // Holds data without duplicates
      data.forEach(element => {
        let elementExist = dataWithoutDups.find(item => (
          item.id == element.id
          ))
          if(!elementExist){
            dataWithoutDups = [...dataWithoutDups, {...element, lastMessage: 'Opps, that man na scam',unreadMes: [],about: 'working in power',image: '1', online:true}]
          }
          // console.log('DATA',dataWithoutDups)
        // console.log('EXISTING', elementExist, 'dataWithoutDups',dataWithoutDups)
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


    // CALL API TO POPULATE FRIEND LIST
    // useEffect(() => {
    //   api.getUserFriends().then(({data})=>{
    //     if(data.status < 1){
    //       setFriends({ data: [] });
    //       setFilteredFriends({ loading: false, data: [] });
    //       return
    //     }
    //     // ADD THIS FOR NOW
    //     data.result_data.forEach((item)=>{
    //       item.id = item._id
    //       item.lastMessage = 'No last message'
    //       item.unreadMes = [1]
    //       item.name = item.username
    //     })
    //     let allFriends = onLineUsers ? [...onLineUsers, ...data.result_data] : data.result_data
    //     let friendsWithoutLoggedUser = allFriends.filter(friend => friend.id != userDetails._id) // FILTERS ALL FRIENDS TO REMOVE THE USER THAT IS LOGGED IN
    //     console.log('dataooooooo',friendsWithoutLoggedUser)
    //     setFriends({ data: friendsWithoutLoggedUser });
    //     setFilteredFriends({ loading: false, data: friendsWithoutLoggedUser });
    //   }).catch(error=>{
    //     setFriends({ data: [] });
    //     setFilteredFriends({ loading: false, data: [] });
    //   })
    //   // setTimeout(() => {
    //   //   let allFriends = onLineUsers ? [...onLineUsers, ...AllFriendList] : AllFriendList
    //   //   let friendsWithoutLoggedUser = allFriends.filter(friend => friend.id != userDetails._id) // FILTERS ALL FRIENDS TO REMOVE THE USER THAT IS LOGGED IN
    //   //   setFriends({ data: friendsWithoutLoggedUser });
    //   //   setFilteredFriends({ loading: false, data: friendsWithoutLoggedUser });
    //   // }, 1000);
    // }, [onLineUsers]);

  return (
    <>
      <DashboardHome onLineUsers={onLineUsers} sendMessage={sendMessage} addNewMes={addNewMes} setAddNewMes={setAddNewMes} />
    </>
  );
}

export default DashboardHomePage;
