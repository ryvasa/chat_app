import React, { useEffect, useState } from 'react';
import {
  BiInfoCircle,
  BiMailSend,
  BiPhone,
  BiTime,
  BiUserCircle,
} from 'react-icons/bi';
import { getUser, refreshToken } from '../utils/api';
import EditProfile from './EditProfile';

function Profile() {
  const [user, setUser] = useState({});
  const localUser = JSON.parse(localStorage.getItem('user'));
  const id = localUser.uuid;
  const callback = (data) => {
    setUser(data.user);
  };
  useEffect(() => {
    if (id) {
      refreshToken().then(() => {
        getUser(id, callback);
      });
    }
  }, [id]);
  return (
    <div>
      <label
        htmlFor="profile"
        className="cursor-pointer tooltip tooltip-right"
        data-tip="Profile"
      >
        <BiUserCircle className="w-8 h-8 text-gray-300" />
      </label>
      <input type="checkbox" id="profile" className="modal-toggle" />
      <div className="modal text-gray-300 backdrop-blur-sm bg-black/30 shadow-xl">
        <div className="modal-box relative bg-gray-800 h-11/12 overflow-hidden">
          <label
            htmlFor="profile"
            className="btn btn-xs btn-circle absolute right-2 top-2 bg-red-600 hover:bg-red-700 border-none"
          >
            ✕
          </label>
          <div className="flex-1 flex flex-col justify-between text-gray-300 p-2 rounded-lg bg-gray-800 w-full items-center">
            <div className="flex flex-col gap-3 justify-center w-full items-center pt-3">
              <div className="inline-block relative rounded-full w-64 h-64">
                <img
                  src={
                    user.img
                      ? user.img
                      : 'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'
                  }
                  alt="Avatar"
                  className="object-cover rounded-full h-full w-full"
                />
                <div className="absolute -inset-2 border-4 border-purple-600 rounded-full" />
              </div>

              <div className="flex w-4/5 text-gray-300 gap-1 pt-5">
                <div className="flex flex-1 gap-1">
                  <BiUserCircle className="w-7 h-7 text-purple-700" />
                  <div className="flex justify-between w-full">
                    {' '}
                    <span>Username</span>
                    <span>:</span>
                  </div>
                </div>
                <div className="flex-1">
                  <span>{user.name}</span>
                </div>
              </div>
              <div className="flex w-4/5 text-gray-300 gap-1">
                <div className="flex flex-1 gap-1">
                  <BiMailSend className="w-7 h-7 text-purple-700" />
                  <div className="flex justify-between w-full">
                    {' '}
                    <span>Email</span>
                    <span>:</span>
                  </div>
                </div>
                <div className="flex-1">
                  <span>{user.email}</span>
                </div>
              </div>
              <div className="flex w-4/5 text-gray-300 gap-1">
                <div className="flex flex-1 gap-1">
                  <BiPhone className="w-6 h-6 text-purple-700" />
                  <div className="flex justify-between w-full">
                    {' '}
                    <span>Phone</span>
                    <span>:</span>
                  </div>
                </div>
                <div className="flex-1">
                  <span>{user.phone}</span>
                </div>
              </div>
              <div className="flex w-4/5 text-gray-300 gap-1">
                <div className="flex flex-1 gap-1">
                  <BiTime className="w-6 h-6 text-purple-700" />
                  <div className="flex justify-between w-full">
                    {' '}
                    <span>Last Active</span>
                    <span>:</span>
                  </div>
                </div>
                <div className="flex-1">
                  <span>{user.last_online}</span>
                </div>
              </div>
            </div>
            <EditProfile data={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
