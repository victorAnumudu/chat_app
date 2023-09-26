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

import AllFriendList from "../../backend/AllFriendList";
import { chat } from "../../backend/AllFriendList";

function DashboardHome({onLineUsers, sendMessage, addNewMes, setAddNewMes}) {
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
        time: ''
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

  // CALL API TO POPULATE FRIEND LIST
  useEffect(() => {
    setTimeout(() => {
      let allFriends = onLineUsers ? [...onLineUsers, ...AllFriendList] : AllFriendList
      let friendsWithoutLoggedUser = allFriends.filter(friend => friend.id != userDetails._id) // FILTERS ALL FRIENDS TO REMOVE THE USER THAT IS LOGGED IN
      setFriends({ data: friendsWithoutLoggedUser });
      setFilteredFriends({ loading: false, data: friendsWithoutLoggedUser });
    }, 1000);
  }, [onLineUsers]);


  // CALL API TO POPULATE CHAT
  useEffect(() => {
    // setTimeout(() => {
    //   // setFriends({data:AllFriendList})
    //   setFilteredChats({ loading: false, data: chat });
    // }, 1000);
    setTimeout(() => {
      // setFriends({data:AllFriendList})
      let newData = {}
      if(Object.keys(addNewMes).length){
        newData = filteredChats.data.length ? [...filteredChats.data, addNewMes] : [...chat, addNewMes]
      }else{
        newData = filteredChats.data.length ? filteredChats.data : chat
      }
      setFilteredChats({loading:false, data:[...newData]});
      setAddNewMes({})
    }, 1000);
  }, [activeUser, addNewMes.time]);

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
