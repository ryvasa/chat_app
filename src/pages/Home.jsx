import React from 'react';
import { BiConversation } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import Chat from '../components/Chat';
import Chats from '../components/Chats';
import Sidebar from '../components/Sidebar';

function Home() {
  const { id } = useParams();
  return (
    <div className="relative">
      <div className="flex fixed w-full">
        <Sidebar />
        <div className="flex bg-gray-900 w-full">
          <Chats />
          {id ? (
            <Chat />
          ) : (
            <div className="flex-1 w-full flex items-center justify-center border-l-2 border-gray-700 ">
              <BiConversation className="w-96 h-96 text-gray-700" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
