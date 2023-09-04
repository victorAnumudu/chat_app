import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import AsideComponent from "../general/AsideComponent";
import MainComponent from "../general/MainComponent";

import AsideHeader from "./asideContent/AsideHeader";
import MainHeader from "./mainContent/MainHeader";

import AsideSearchFriends from "./asideContent/AsideSearchFriends";
import FriendList from "./asideContent/FriendList";
import SearchIcon from "../../assets/images/icons/search.svg";
import LoadingIndicator from "../general/LoadingIndicator";

import AllFriendList from "../../backend/AllFriendList";
import { chat } from "../../backend/AllFriendList";

function DashboardHome() {
  const messageBoxSection = useRef();

  const [section, setSection] = useState('aside')
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
    const windowWidth = window.innerWidth
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
      setFilteredChats((prev) => ({
        ...prev,
        data: [
          ...prev.data,
          {
            id: Math.random() / Math.random(),
            message: messageToSend,
            sender: 1,
          },
        ],
      }));
      setMessageToSend("");
    }
  };

  // CALL API TO POPULATE FRIEND LIST
  useEffect(() => {
    setTimeout(() => {
      setFriends({ data: AllFriendList });
      setFilteredFriends({ loading: false, data: AllFriendList });
    }, 1000);
  }, []);

  // CALL API TO POPULATE CHAT
  useEffect(() => {
    setTimeout(() => {
      // setFriends({data:AllFriendList})
      setFilteredChats({ loading: false, data: chat });
    }, 1000);
  }, [activeUser]);

  useEffect(()=>{  // FUNCTION TO MAKE THE CHAT SECTION ALWAYS SCROLLS TO BUTTON OF THE CHAT BOX SO USER CAN SEE LAST MESSAGE
    messageBoxSection?.current?.scrollTo({top:messageBoxSection.current.scrollHeight, behavior: 'smooth'})
  },[filteredChats])

  useEffect(()=>{
   const resize =  window.addEventListener('resize', ()=>{
      setWindowWidth(window.innerWidth)
    })
    return ()=>{
      window.removeEventListener('resize', resize)
    }
  },[])

  return (
    <DashboardLayout>
      <div className={`${section=='aside' && windowWidth<=767 ?'w-full':section=='main' && windowWidth<=767?'hidden':'w-full md:w-[500px]'} md:border-r-4`}>
        <AsideComponent className={"flex flex-col"}>
          <AsideHeader />
          <div className="mt-4 mb-2 px-4 md:px-8">
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
                />
              ))
            ) : (
              <p>No Friends found</p>
            )}
          </div>
        </AsideComponent>
      </div>
      <div className={`${section=='main' && windowWidth<=767 ? 'w-full':section=='aside' && windowWidth<=767? 'hidden':'md:block w-full'}`}>
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
                    filteredChats.data.map((chat) => {
                      return chat.sender == 2 ? (
                        <div
                          key={chat.id}
                          className="p-4 max-w-[50%] rounded break-words text-[12px] md:text-sm text-slate-200 bg-slate-700 dark:text-slate-700 dark:bg-slate-200 self-start"
                        >
                          {chat?.message}
                        </div>
                      ) : (
                        <div
                          key={chat.id}
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
                  {/* <i className="fa-solid fa-play text-2xl pointer-events-none"></i> */}
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
      </div>
    </DashboardLayout>
  );
}

export default DashboardHome;
