import React, { useEffect, useRef, useState } from "react";
import Containter from "../general/Containter";
import AsideComponent from "../general/AsideComponent";
import MainComponent from "../general/MainComponent";

import AsideHeader from "./asideContent/AsideHeader";
import MainHeader from "./mainContent/MainHeader";

import AsideSearchFriends from "./asideContent/AsideSearchFriends";
import FriendList from "./asideContent/FriendList";
import SearchIcon from "../../assets/images/icons/search.svg";

import AllFriendList from "../../backend/AllFriendList";
import { chat } from "../../backend/AllFriendList";

import AsideBg from "../../assets/images/auth/aside_bg.svg";
import Logo from "../../assets/images/logo.svg";

function DashboardPage() {
  const messageBoxSection = useRef();

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

  // FUNCTION TO MAKE SELECTED FRIEND ACTIVE
  const handleClick = (user) => {
    setActiveUser(user);
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
    // console.log(messageBoxSection.scrollTo(0,0))
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

  return (
    <div className="relative flex h-screen p-5 bg-slate-100 dark:bg-brown-dark">
      <div className="absolute left-0 top-0 z-0 w-full h-28 bg-sky-300 dark:bg-brown-light"></div>
      <Containter>
        <div className="hidden md:block w-[500px] border-r-4">
          <AsideComponent className={"flex flex-col"}>
            <AsideHeader />
            <div className="mt-4 mb-2 px-4 md:px-8">
              <AsideSearchFriends
                onChange={filterFriend}
                type="text"
                icon={SearchIcon}
                placeholder="Search or Start new chat"
              />
            </div>
            <div className="pb-2 px-4 md:px-8 flex-grow flex flex-col items-center overflow-y-auto scrollbar">
              {filteredfriends.loading ? (
                <p className="loading-dots">Loading</p>
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
        <div className="w-full">
          <MainComponent className={"flex flex-col"}>
            {activeUser ? (
              <>
                <MainHeader user={activeUser} />
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
                            className="p-2 max-w-[50%] rounded text-[12px] md:text-sm text-slate-200 bg-slate-700 dark:text-slate-700 dark:bg-slate-200 self-start"
                          >
                            {chat?.message}
                          </div>
                        ) : (
                          <div
                            key={chat.id}
                            className="p-2 max-w-[50%] rounded text-[12px] md:text-sm text-slate-200 bg-slate-700 dark:text-slate-700 dark:bg-slate-200 self-end"
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
      </Containter>
    </div>
  );
}

export default DashboardPage;
