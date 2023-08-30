import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import AsideComponent from "../general/AsideComponent";
import MainComponent from "../general/MainComponent";

import AsideHeader from "./asideContent/AsideHeader";

import AsideSearchFriends from "./asideContent/AsideSearchFriends";
import PendingFriendList from "./asideContent/PendingFriendList";
import SearchIcon from "../../assets/images/icons/search.svg";
import LoadingIndicator from "../general/LoadingIndicator";

import AllFriendList from "../../backend/AllFriendList";
import Button from "../general/Button";
import Input from "../general/Input";

function DashboardAddFriend() {
  const navigate = useNavigate()
  const [requestStatus, setRequestStatus] = useState({loading: false, status:null, messasge: ''})

  const [friends, setFriends] = useState({ data: [] });
  const [filteredfriends, setFilteredFriends] = useState({
    loading: true,
    data: [],
  }); // HOLDS ALL USER FRIEND's LIST

  const [activeUser, setActiveUser] = useState(null);

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

  let [userNumber, setUserNumber] = useState({number: ''})

    const handleChange = ({target:{name, value}}) => {
        setUserNumber(prev => ({...prev, [name]:value}))
    }

    const handleSendRequest = () => { // FUNCTION TO SEND FRINED REQUEST
        console.log('working')
        setRequestStatus(prev => ({...prev, loading: true}))
        setTimeout(()=>{
            setFilteredFriends(prev => ({...prev,
                data: [...prev.data, {
                    name: 'James Mark',
                    lastMessage: 'testing the chat app',
                    unreadMes: [1,2,3],
                    about: 'Opps',
                    image: '1',
                    id: Math.random()
                }]
            }))
            setRequestStatus(prev => ({...prev, loading: false}))
        }, 3000)
        // navigate('/')
    }

  // CALL API TO POPULATE FRIEND LIST
  useEffect(() => {
    setTimeout(() => {
      setFriends({ data: AllFriendList });
      setFilteredFriends({ loading: false, data: AllFriendList });
    }, 1000);
  }, []);

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
                  time={new Date()}
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
                <div className='p-3 w-full min-w-[400px] rounded-md flex flex-col justify-center'>
                    <div className='w-[70%] min-w-[350px] mx-auto'>
                        <div className='w-full'>
                            <Input type='text' name='number' handleChange={handleChange} label={`Enter Friend's Number`} value={userNumber.number} />
                        </div>
                        <div className='my-1 text-black dark:text-white flex justify-end items-center'>
                            <p className='text-[12px]'> <Link to='/'>Back to Home</Link></p>
                        </div>
                        <div className='w-full text-center'>
                            {requestStatus.loading ?
                            <LoadingIndicator text='Loading' />
                            :
                            <Button name='Send Friend Request' onClick={handleSendRequest} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </MainComponent>
      </div>
    </DashboardLayout>
  );
}

export default DashboardAddFriend;
