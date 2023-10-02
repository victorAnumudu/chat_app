import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'

import DashboardLayout from "./DashboardLayout";

import AsideContainer from "./asideContent/AsideContainer";
import AsideComponent from "../general/AsideComponent";
import AsideHeader from "./asideContent/AsideHeader";
import AsideSearchFriends from "./asideContent/AsideSearchFriends";
import FriendList from "./asideContent/FriendList";

import MainContainer from "./mainContent/MainContainer";
import MainComponent from "../general/MainComponent";
import MainHeader from "./mainContent/MainHeader";

import SearchIcon from "../../assets/images/icons/search.svg";
import LoadingIndicator from "../general/LoadingIndicator";

import Services from '../../services/Services'

import AllFriendList from "../../backend/AllFriendList";
import { chat } from "../../backend/AllFriendList";

function DashboardHome({onLineUsers, sendMessage, addNewMes, setAddNewMes}) {

  const api = new Services()

  let {userDetails} = useSelector(state => state.userDetails) // LOGGED IN USER INFO
  const messageBoxSection = useRef();

  const [section, setSection] = useState('aside') // STATE FOR SECTION SWITCH ON MOBILE VIEW
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const [friends, setFriends] = useState({ data: [] });
  const [filteredfriends, setFilteredFriends] = useState({
    loading: true,
    data: [],
  }); // HOLDS ALL USER FRIEND's LIST

  const [filteredChats, setFilteredChats] = useState({
    loading: true,
    data: [],
  }); // HOLDS SELECTED FRIENDS CHATS

  const [activeUser, setActiveUser] = useState(null);

  const [messageToSend, setMessageToSend] = useState("");

  // FUNCTION TO FILTER FRIENDS LIST
  const filterFriend = (filterWord) => {
    setFilteredFriends((prev) => ({ ...prev, loading: true }));
    var filtered = friends?.data?.filter(({ name }) => {
      return name.toLowerCase().startsWith(filterWord.toLowerCase());
    });
    setTimeout(() => {
      setFilteredFriends({ loading: false, data: filtered });
    }, 200);
  };

  //FUNCTION TO OPEN MAIN/ASIDE SECTION ON MOBILE VIEW
  const toggleSection = () => {
    // const windowWidth = window.innerWidth
    if(windowWidth <= 767){
      setSection(prev => {
        if(prev == 'aside'){
          return 'main'
        }else{
          return 'aside'
        }
      })
    }
  }

  // FUNCTION TO MAKE SELECTED FRIEND ACTIVE
  const handleClick = (user) => {
    setActiveUser(user);
    toggleSection()
  };

  // FUNCTION TO SEND MESSAGE (TEXT MESSAGE)
  const sendTextMessage = (e) => {
    console.log(e.target.name);
    if (messageToSend == "") return;
    if (e.keyCode == 13 || e.target.name == "sendmessage") {
      let mesDetails = {
        message: messageToSend,
        sender: userDetails._id,
        recipient: activeUser.id,
        time: Date.now()
      }
      // setFilteredChats((prev) => ({
      //   ...prev,
      //   data: [
      //     ...prev.data,
      //     mesDetails
      //   ],
      // }));
      setMessageToSend("");
      sendMessage(mesDetails) //CALLS FUNCTION TO SEND MESSAGE TO WEB SOCKET
    }
  };

  // // CALL API TO POPULATE FRIEND LIST
  useEffect(() => {
    api.getUserFriends().then(({data})=>{
      if(data.status < 1){
        setFriends({ data: [] });
        setFilteredFriends({ loading: false, data: [] });
        return
      }
      // ADD THIS FOR NOW
      data.result_data.forEach((item)=>{
        item.id = item._id
        item.lastMessage = 'No last message'
        item.unreadMes = [1]
        item.name = item.username
      })
      let allFriends = onLineUsers ? [...onLineUsers, ...data.result_data] : data.result_data
   
      // removing duplicate
      let allFriendsWithoutDup = []
      allFriends.forEach(element => {
        let elementExist = allFriendsWithoutDup.find(item => (
          item.id == element.id
          ))
          if(!elementExist){
            allFriendsWithoutDup = [...allFriendsWithoutDup, {...element, lastMessage: 'Opps, that man na scam',unreadMes: [],about: 'working in power',image: '1'}]
          }
      });
      let friendsWithoutLoggedUser = allFriendsWithoutDup.filter(friend => friend.id != userDetails._id) // FILTERS ALL FRIENDS TO REMOVE THE USER THAT IS LOGGED IN
      setFriends({ data: friendsWithoutLoggedUser });
      setFilteredFriends({ loading: false, data: friendsWithoutLoggedUser });
    }).catch(error=>{
      setFriends({ data: [] });
      setFilteredFriends({ loading: false, data: [] });
    })
  }, [onLineUsers]);


  // CALL API TO POPULATE CHAT
  useEffect(() => {
    // setTimeout(() => {
    //   // setFriends({data:AllFriendList})
    //   setFilteredChats({ loading: false, data: chat });
    // }, 1000);
    // setFilteredChats({loading: true, data: []})
    setTimeout(() => {
      let newData = {}
      if(Object.keys(addNewMes).length){
        newData = filteredChats.data.length ? [...filteredChats.data, addNewMes] : [...chat, addNewMes]
      }
      else{
        newData = filteredChats.data.length ? filteredChats.data : chat
        // newData = chat
      }
      setFilteredChats({loading:false, data:[...newData]});
      setAddNewMes({})
    }, 500);
  }, [activeUser?.id, addNewMes?.time]);

  useEffect(()=>{  // FUNCTION TO MAKE THE CHAT SECTION ALWAYS SCROLLS TO BUTTON OF THE CHAT BOX SO USER CAN SEE LAST MESSAGE
    messageBoxSection?.current?.scrollTo({top:messageBoxSection.current.scrollHeight, behavior: 'smooth'})
  },[filteredChats])

  useEffect(()=>{ // ADDING ON RESIZE EVENT LISTENER AND SETTING THE WINDOWWIDTH ON BROWSER RESIZE
   const resize =  window.addEventListener('resize', ()=>{
      setWindowWidth(window.innerWidth)
    })
    return ()=>{
      window.removeEventListener('resize', resize)
    }
  },[])

  return (
    <DashboardLayout>
      <AsideContainer section={section} windowWidth={windowWidth}>
        <AsideComponent className={"flex flex-col"}>
          <AsideHeader />
          <div className="mt-2 mb-2 px-4 md:px-8">
            <AsideSearchFriends
              onChange={filterFriend}
              type="text"
              icon={SearchIcon}
              placeholder="Search for friend"
            />
          </div>
          <div className="pb-2 px-4 md:px-8 flex-grow flex flex-col items-center overflow-y-auto scrollbar">
            {filteredfriends.loading ? (
              <LoadingIndicator text='searching' />
            ) : filteredfriends?.data?.length > 0 ? (
              filteredfriends?.data?.map((friend) => (
                <FriendList
                  key={friend.id}
                  avatar={friend.image}
                  name={friend.name}
                  lastMessage={friend.lastMessage}
                  time={new Date()}
                  unreadMes={friend.unreadMes}
                  handleClick={() => handleClick(friend)}
                  active={activeUser?.id == friend.id ? true : false}
                  online={friend.online ? true: false}
                />
              ))
            ) : (
              <p>No Friends found</p>
            )}
          </div>
        </AsideComponent>
      </AsideContainer>

      <MainContainer section={section} windowWidth={windowWidth}>
        <MainComponent className={"flex flex-col"}>
          {activeUser ? (
            <>
              <MainHeader user={activeUser} toggleSection={toggleSection} />
              <div
                ref={messageBoxSection}
                className="flex-grow flex flex-col overflow-y-auto scrollbar"
              >
                <div className="p-8 md:px-20 md:py-8 flex flex-col gap-3">
                  {filteredChats.loading ? (
                    <p className="loading-dots">Loading</p>
                  ) : filteredChats.data.length > 0 ? (
                    filteredChats.data.map((chat, index) => {
                      if(chat.sender == activeUser.id || chat.recipient == activeUser.id){
                        return chat.sender != userDetails._id ? (
                          <div
                            key={chat.id ? chat.id : index+10}
                            className="p-4 max-w-[50%] rounded break-words text-[12px] md:text-sm text-slate-200 bg-slate-700 dark:text-slate-700 dark:bg-slate-200 self-start"
                          >
                            {chat?.message}
                          </div>
                        ) : (
                          <div
                            key={chat.id ? chat.id : index+10}
                            className="p-4 max-w-[50%] rounded break-words text-[12px] md:text-sm text-slate-200  bg-slate-700 dark:text-slate-700 dark:bg-slate-200 self-end"
                          >
                            {chat?.message}
                          </div>
                        );
                      }else{
                        return <p>No chats with {activeUser.name} yet. please send a chat now!</p>
                      }
                    })
                  ) : (
                    <p>No chats found</p>
                  )}
                </div>
              </div>
              <div className="p-4 w-full h-[60px] bg-slate-200 text-slate-700 dark:bg-black dark:text-white flex items-center justify-between gap-2">
                <input
                  className="w-full p-2 rounded-lg bg-slate-50 dark:bg-slate-200 text-slate-700 shadow-lg outline-none"
                  type="text"
                  placeholder="Enter a message"
                  value={messageToSend}
                  onChange={(e) => setMessageToSend(e.target.value)}
                  onKeyDown={sendTextMessage}
                />
                <button
                  className="p-1 outline-none"
                  onClick={sendTextMessage}
                  name="sendmessage"
                >
                  <i className="fa-solid fa-location-arrow text-2xl pointer-events-none"></i>
                    {/* <svg className="pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg> */}
                </button>
              </div>
            </>
          ) : (
            <div className="pb-2 px-4 md:px-8 flex-grow flex flex-col justify-center items-center">
              <div className="flex justify-center items-center gap-2">
                <i className="fa-solid fa-arrow-left text-4xl"></i>
                <p className="text-3xl tect-slate-700">Select a friend</p>
              </div>
            </div>
          )}
        </MainComponent>
      </MainContainer>
    </DashboardLayout>
  );
}

export default DashboardHome;
