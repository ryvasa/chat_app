/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getGroupChats, getPrivateChats, refreshToken } from '../utils/api';
import time from '../utils/timeFormat';
import AddGroupChat from './AddGroupChat';
import AddPrivateChat from './AddPrivateChat';

function Chats() {
  const { id } = useParams();
  const [chats, setChats] = useState([]);
  const [query, setQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState({});
  const user = JSON.parse(localStorage.getItem('user'));
  const setSuccess = (data) => {
    setChats(data);
  };
  const setError = (data) => {
    setErrorMessage(data);
  };

  const location = useLocation();
  const { pathname } = location;
  const currentPath = pathname.split('/')[1];
  useEffect(() => {
    refreshToken().then(() => {
      if (currentPath === 'group') {
        getGroupChats(query, setSuccess, setError);
      } else if (currentPath === 'chats') {
        getPrivateChats(query, setSuccess, setError);
      }
    });
  }, [query, currentPath, id]);
  const callback = () => {
    refreshToken().then(() => {
      if (currentPath === 'group') {
        getGroupChats(query, setSuccess, setError);
      } else if (currentPath === 'chats') {
        getPrivateChats(query, setSuccess, setError);
      }
    });
  };
  return (
    <div className="pl-2 flex-1 ">
      <div className="p-2 w-full border-b-2 border-purple-800 flex justify-center items-center gap-2">
        {currentPath === 'group' ? (
          <>
            <Link to="/chats" className="text-gray-300 btn btn-sm">
              Chat
            </Link>
            <span className="font-bold text-xl text-gray-300">|</span>
            <Link
              to="/group"
              className="text-gray-300 btn btn-sm bg-purple-800 hover:bg-purple-800 border-none "
            >
              Group
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/chats"
              className="text-gray-300 btn btn-sm bg-purple-800 hover:bg-purple-800 border-none "
            >
              Chat
            </Link>
            <span className="font-bold text-xl text-gray-300">|</span>
            <Link to="/group" className="text-gray-300 btn btn-sm">
              Group
            </Link>
          </>
        )}
      </div>
      <div className="flex gap-1 w-full justify-center items-center p-3">
        <div className="flex gap-2 justify-between px-2 w-full">
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Find Contact"
            className="text-gray-300 outline-none bg-transparent border-b-2 w-full border-purple-700"
          />
          <BiSearchAlt className="text-purple-700 w-7 h-7" />
        </div>
        {currentPath === 'group' ? (
          <AddGroupChat callback={callback} />
        ) : (
          <AddPrivateChat callback={callback} chats={chats} />
        )}
      </div>

      <div className="flex flex-col gap-2 overflow-y-scroll h-screen p-3 pb-36">
        {chats.map((chat) => (
          <Link
            key={chat.uuid}
            to={`/${currentPath}/${chat.uuid}`}
            className="flex px-10 bg-gray-800 rounded-lg py-3 w-full items-center"
          >
            <div className=" w-12 h-12 ">
              <div className="inline-block relative rounded-full">
                <img
                  src={
                    chat.receiver_id === user.uuid
                      ? chat.sender?.img ??
                        'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'
                      : chat.sender_id === user.uuid
                      ? chat.receiver?.img ??
                        'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'
                      : 'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'
                  }
                  alt="Avatar"
                  className="object-cover rounded-full h-10 w-10"
                />
                <div className="absolute -inset-1 border-2 border-purple-600 rounded-full" />
              </div>
            </div>
            <div className="flex flex-col  w-full pl-3 text-gray-300">
              <div className="flex justify-between">
                <p className="font-medium text-md">
                  {chat.group_name
                    ? chat.group_name
                    : chat.receiver_id === user.uuid
                    ? chat.sender?.name
                    : chat.receiver?.name}
                </p>
                <p className="font-normal text-md">
                  {time(chat.message[0]?.createdAt)}
                </p>
              </div>
              <p className="font-normal text-sm text-purple-600">
                {chat.message[0]?.message}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Chats;
