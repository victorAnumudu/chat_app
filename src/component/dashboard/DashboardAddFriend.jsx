import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import AsideComponent from "../general/AsideComponent";
import MainComponent from "../general/MainComponent";

import AsideHeader from "./asideContent/AsideHeader";
import MainHeader from "./mainContent/MainHeader";

import AsideSearchFriends from "./asideContent/AsideSearchFriends";
import PendingFriendList from "./asideContent/PendingFriendList";
import SearchIcon from "../../assets/images/icons/search.svg";
import LoadingIndicator from "../general/LoadingIndicator";

import AllFriendList from "../../backend/AllFriendList";
import { chat } from "../../backend/AllFriendList";

function DashboardAddFriend() {
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

  return (
    <DashboardLayout>
      <div className="w-full md:block md:w-[500px] md:border-r-4">
        <AsideComponent className={"flex flex-col"}>
          <AsideHeader />
          <div className="mt-4 mb-2 px-4 md:px-8">
            <AsideSearchFriends
              onChange={filterFriend}
              type="text"
              icon={SearchIcon}
              placeholder="Search friend request"
            />
          </div>
          <div className="pb-2 px-4 md:px-8 flex-grow flex flex-col items-center overflow-y-auto scrollbar">
            {filteredfriends.loading ? (
              <LoadingIndicator text='searching' />
            ) : filteredfriends?.data?.length > 0 ? (
              filteredfriends?.data?.map((friend) => (
                <PendingFriendList
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
              <p>No Friends request found</p>
            )}
          </div>
        </AsideComponent>
      </div>
      <div className="hidden md:block md:w-full">
        <MainComponent className={"flex flex-col"}>
            <div className="pb-2 px-4 md:px-8 flex-grow flex flex-col justify-center items-center">
              <div className="flex justify-center items-center gap-2">
                <i className="fa-solid fa-arrow-left text-4xl"></i>
                <p className="text-3xl tect-slate-700">Send friend request</p>
              </div>
            </div>
        </MainComponent>
      </div>
    </DashboardLayout>
  );
}

export default DashboardAddFriend;
