import React from 'react';
import { BiChat, BiConversation } from 'react-icons/bi';
import { Link, useLocation, useParams } from 'react-router-dom';
import Chat from '../components/Chat';
import Chats from '../components/Chats';
import Sidebar from '../components/Sidebar';

function Home() {
  const { id } = useParams();
  const location = useLocation();
  const { pathname } = location;
  return (
    <div className="relative">
      <div className="flex fixed w-full">
        <Sidebar />
        <div className="flex bg-gray-900 w-full">
          {pathname === '/' ? (
            <Link
              to="/chats"
              className="flex flex-col gap-5 justify-center items-center w-full"
            >
              <BiChat className="w-96 h-96 text-gray-700" />
              <div className="btn bg-purple-800 hover:bg-purple-700 border-none text-gray-300 shadow-xl">
                Open Chat
              </div>
            </Link>
          ) : (
            <Chats />
          )}
          {id ? (
            <Chat />
          ) : (
            pathname !== '/' && (
              <div className="flex-1 w-full flex items-center justify-center border-l-2 border-gray-700 ">
                <BiConversation className="w-96 h-96 text-gray-700" />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
