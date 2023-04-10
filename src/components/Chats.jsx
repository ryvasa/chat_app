import React, { useEffect, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { getChats, refreshToken } from '../utils/api';
import time from '../utils/timeFormat';

function Chats() {
  const [chats, setChats] = useState([]);
  const [query, setQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState({});
  const setSuccess = (data) => {
    setChats(data);
  };
  const setError = (data) => {
    setErrorMessage(data);
  };
  useEffect(() => {
    refreshToken().then(() => {
      getChats(query, setSuccess, setError);
    });
  }, [query]);
  return (
    <div className="pl-2 flex-1 ">
      <div className="flex gap-2 justify-between pt-5 pb-2 px-2">
        <input
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Find Contact"
          className="text-gray-300 outline-none bg-transparent border-b-2 w-full border-purple-700"
        />
        <BiSearchAlt className="text-purple-700 w-7 h-7" />
      </div>
      <div className="flex flex-col gap-2 overflow-y-scroll h-screen p-3 pb-16">
        {chats.map((chat) => (
          <Link
            key={chat.uuid}
            to={`/${chat.uuid}`}
            className="flex px-10 bg-gray-800 rounded-lg py-3 w-full items-center"
          >
            <div className=" w-12 h-12 ">
              <div className="inline-block relative rounded-full">
                <img
                  src={
                    chat.privateChat[0]?.contact?.contact?.img
                      ? chat.privateChat[0]?.contact?.contact?.img
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
                  {chat.privateChat[0]?.contact?.contact?.name ||
                    chat.groupChat[0]?.group_name}
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
