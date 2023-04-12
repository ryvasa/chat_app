import React, { useEffect } from 'react';
import { BiLogOutCircle, BiConversation, BiBook } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../utils/api';
import Profile from './Profile';

function Sidebar() {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem('user'));
  const handleLogout = (e) => {
    e.preventDefault();
    logout().then(() => {
      navigate('/login');
    });
  };
  useEffect(() => {
    if (!data) {
      navigate('/login');
    }
  }, [data]);
  return (
    <div className="flex p-2 bg-purple-900 h-screen shadow-lg flex-col gap-5 items-center">
      <div className="w-8 h-8 rounded-full">
        <img
          src={
            data.img
              ? data.img
              : 'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'
          }
          alt="avatar"
          className="object-cover w-8 h-8 rounded-full"
        />
      </div>
      <Profile />
      <Link to="/chats" className="tooltip tooltip-right" data-tip="Chats">
        <BiConversation className="w-8 h-8 text-gray-300" />
      </Link>
      <Link
        to="/contacts"
        className="tooltip tooltip-right"
        data-tip="Contacts"
      >
        <BiBook className="w-8 h-8 text-gray-300" />
      </Link>
      <button
        type="button"
        onClick={handleLogout}
        className="tooltip tooltip-right"
        data-tip="Log Out"
      >
        <BiLogOutCircle className="w-8 h-8 text-gray-300" />
      </button>
    </div>
  );
}

export default Sidebar;
