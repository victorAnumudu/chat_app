import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";

import AsideContainer from "./asideContent/AsideContainer";
import AsideComponent from "../general/AsideComponent";
import AsideHeader from "./asideContent/AsideHeader";
import AsideSearchFriends from "./asideContent/AsideSearchFriends";
import PendingFriendList from "./asideContent/PendingFriendList";

import MainContainer from "./mainContent/MainContainer";
import MainComponent from "../general/MainComponent";
import MainHeader from "./mainContent/MainHeader";

import SearchIcon from "../../assets/images/icons/search.svg";
import LoadingIndicator from "../general/LoadingIndicator";

import AllFriendList from "../../backend/AllFriendList";
import Button from "../general/Button";
import Input from "../general/Input";

function DashboardAddFriend() {
  const navigate = useNavigate()

  const [section, setSection] = useState('aside') // STATE FOR SECTION SWITCH ON MOBILE VIEW
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

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

  //FUNCTION TO OPEN MAIN/ASIDE SECTION ON MOBILE VIEW
  const toggleSection = () => {
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

  // CALL API TO POPULATE FRIEND LIST
  useEffect(() => {
    setTimeout(() => {
      setFriends({ data: AllFriendList });
      setFilteredFriends({ loading: false, data: AllFriendList });
    }, 1000);
  }, []);


  useEffect(()=>{  // ADDING ON RESIZE EVENT LISTENER AND SETTING THE WINDOWWIDTH ON BROWSER RESIZE
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
            <div className="w-full flex justify-end items-center mb-2">
              <button 
                className="md:hidden px-2 py-1 text-[10px] bg-green-700 text-white hover:bg-green-500 rounded-full transition-all duration-500" 
                // className='md:hidden px-2 py-1 text-[10px] bg-[#ff6610] text-white hover:bg-[#ffb285] rounded-full transition-all duration-500'
                onClick={toggleSection}
              >
                Add Friend
              </button>
            </div>
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
      </AsideContainer>

      <MainContainer section={section} windowWidth={windowWidth}>
        <MainComponent className={"flex flex-col"}>
            <MainHeader toggleSection={toggleSection}/>
            <div className="pb-2 px-4 md:px-8 flex-grow flex flex-col justify-center items-center">
                <div className='p-3 w-full rounded-md flex flex-col justify-center'>
                    <div className='w-[90%] lg:w-[70%] mx-auto'>
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
      </MainContainer>
    </DashboardLayout>
  );
}

export default DashboardAddFriend;
