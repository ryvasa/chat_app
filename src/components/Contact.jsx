import React, { useEffect, useState } from 'react';
import {
  BiCommentDetail,
  BiInfoCircle,
  BiMailSend,
  BiPhone,
  BiTime,
  BiUserCircle,
} from 'react-icons/bi';
import { Link, useParams } from 'react-router-dom';
import { getUser } from '../utils/api';
import DeleteContact from './DeleteContact';

function Contact() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const callback = (data) => {
    setUser(data.user);
  };
  useEffect(() => {
    if (id) {
      getUser(id, callback);
    }
  }, [id]);
  return (
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

        <div className="flex w-4/5 text-gray-300 pt-5">
          <div className="flex flex-1 gap-1">
            <BiUserCircle className="w-7 h-7 text-purple-700" />
            <span>Username</span>
          </div>
          <span className="flex-1">: {user.name}</span>
        </div>

        <div className="flex w-4/5 text-gray-300">
          <div className="flex flex-1 gap-1">
            <BiMailSend className="w-6 h-6 text-purple-700" />
            <span>Email</span>
          </div>
          <span className="flex-1">: {user.email}</span>
        </div>
        <div className="flex w-4/5 text-gray-300">
          <div className="flex flex-1 gap-1">
            <BiPhone className="w-6 h-6 text-purple-700" />
            <span>Phone</span>
          </div>
          <span className="flex-1">: {user.phone}</span>
        </div>
        <div className="flex w-4/5 text-gray-300">
          <div className="flex flex-1 gap-1">
            <BiTime className="w-6 h-6 text-purple-700" />
            <span>Last Active</span>
          </div>
          <span className="flex-1">: {user.last_online}</span>
        </div>
      </div>
      <div className="flex-col w-4/5 flex justify-center items-center gap-3">
        <Link
          to="/:id"
          className="w-full btn bg-purple-800 border-none hover:bg-purple-800 text-gray-300 flex justifi-center items-center"
        >
          <BiCommentDetail className="pr-1 w-6 h-6" />
          <span>Chat</span>
        </Link>
        <div className="w-full">
          <DeleteContact />
        </div>
      </div>
    </div>
  );
}

export default Contact;
