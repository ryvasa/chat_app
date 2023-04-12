import React, { useEffect, useRef, useState } from 'react';
import { BiSend } from 'react-icons/bi';
import { useLocation, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import {
  getGroupChat,
  getPrivateChat,
  refreshToken,
  sendMessage,
} from '../utils/api';
import time from '../utils/timeFormat';
import OutGroupChat from './OutGroupChat';

function Chat() {
  const socket = useRef();
  const [chat, setChat] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState({});
  const user = JSON.parse(localStorage.getItem('user'));
  const [messages, setMessages] = useState([]);
  const [receivedMessage, setReceivedMessage] = useState({});
  const [room, setRoom] = useState({});
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { pathname } = location;

  const setSuccess = (data) => {
    setChat(data);
  };
  useEffect(() => {
    if (chat) {
      setMessages(chat.message);
    }
  }, [chat]);
  const setError = (data) => {
    setErrorMessage(data);
  };
  const currentPath = pathname.split('/')[1];
  useEffect(() => {
    refreshToken().then(() => {
      currentPath === 'group'
        ? getGroupChat(setSuccess, setError, id)
        : getPrivateChat(setSuccess, setError, id);
    });
  }, [id]);
  const scrollRef = useRef(null);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  const joinRoom = () => {
    if (user.name !== '' && room !== '') {
      socket.current.emit('join_room', room);
    }
  };
  useEffect(() => {
    if (id) {
      setRoom({ id, user: user.uuid });
      socket.current = io('http://localhost:5000');
    }
  }, [id, socket]);

  useEffect(() => {
    socket.current.on('receive_message', (data) => {
      setReceivedMessage(data);
    });
  }, [socket]);
  useEffect(() => {
    if (room && id) {
      joinRoom();
    }
  }, [room]);
  useEffect(() => {
    if (receivedMessage && messages) {
      setMessages(() => {
        if (messages.some((message) => message.uuid === receivedMessage.uuid)) {
          return messages;
        } else {
          return [...messages, receivedMessage];
        }
      });
    }
    // setLoading(false)
  }, [receivedMessage]);

  const handleSend = () => {
    const messageData = {
      user_id: user.uuid,
      message: newMessage,
      uuid: uuidv4(),
      createdAt: Date.now(),
    };
    const data = {
      message: newMessage,
    };
    socket.current.emit('send_message', messageData);

    refreshToken().then(() => {
      sendMessage(data, id).then(() => {
        setLoading(false);
      });
    });
    setLoading(true);
    setNewMessage('');
  };
  return (
    <div className="flex-1 overflow-y-scroll h-screen relative border-l-2 border-gray-700">
      <div className="flex w-1/2 pr-10 bg-gay-600 text-gray-300 justify-center fixed bg-gray-800 px-7 py-3 z-10">
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
          alt="avatar"
          className="object-cover w-10 h-10 rounded-full"
        />
        <div className="flex flex-col w-full pl-3 text-gray-300 justify-center">
          <p className="font-medium text-lg">
            {chat.group_name
              ? chat.group_name
              : chat.receiver_id === user.uuid
              ? chat.sender?.name
              : chat.receiver?.name}
          </p>
        </div>
        {currentPath === 'group' && <OutGroupChat />}
      </div>
      <div className="text-gray-300 px-3 py-20">
        {messages?.map((message) => (
          <div className="" key={message.uuid}>
            {message.user_id === user.uuid ? (
              <div className="chat chat-end">
                <div className="chat-bubble bg-purple-800">
                  {message.message}
                </div>
                <div className="chat-footer pt-1">
                  <time className="text-sm opacity-50">
                    {time(message.createdAt)}
                  </time>
                </div>
              </div>
            ) : (
              <div className="chat chat-start">
                {currentPath === 'group' && (
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        src={
                          message.user?.img
                            ? message.user?.img
                            : 'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'
                        }
                      />
                    </div>
                  </div>
                )}
                <div className="chat-header text-gray-300">
                  {message.user?.name}
                </div>
                <div className="chat-bubble bg-gray-800">{message.message}</div>
                <div className="chat-footer pt-1">
                  <time className="text-sm opacity-50">
                    {time(message.createdAt)}
                  </time>
                </div>
              </div>
            )}
          </div>
        ))}

        <div ref={scrollRef} />
      </div>
      <div className="flex w-1/2 lg:w-full justify-center items-center relative ">
        <div className="fixed bottom-0 h-20 w-1/2 bg-gradient-to-t from-gray-900" />
        <div className="w-[550px]  bg-gray-800 flex justify-center items-center gap-2 rounded-full px-5 fixed bottom-10 shadow-xl py-1 ">
          <input
            value={newMessage}
            placeholder="Type here..."
            onChange={(e) => setNewMessage(e.target.value)}
            type="text"
            onKeyDown={(e) => e.keyCode === 13 && handleSend()}
            className="border-none outline-none bg-transparent w-full text-gray-300 h-10"
          />
          {loading ? (
            <button
              type="button"
              className="btn btn-circle btn-ghost loading text-purple-700"
            >
              {' '}
            </button>
          ) : (
            <button
              disabled={newMessage.length <= 0 || newMessage === ' '}
              type="submit"
              onClick={(e) => handleSend()}
              className="btn btn-circle btn-ghost disabled:btn-ghost disabled:text-gray-600 text-purple-800"
            >
              <BiSend className="w-7 h-7" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
