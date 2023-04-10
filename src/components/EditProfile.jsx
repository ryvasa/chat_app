/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import {
  BiEdit,
  BiImageAdd,
  BiInfoCircle,
  BiKey,
  BiMailSend,
  BiPhone,
  BiTrashAlt,
  BiUserCircle,
} from 'react-icons/bi';
import { getNotRegistered, refreshToken, updateUser } from '../utils/api';
import updateUserWithImg from '../utils/firebase';

function EditProfile({ data }) {
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(null);
  const [user, setUser] = useState({});
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const localUser = JSON.parse(localStorage.getItem('user'));
  const id = localUser.uuid;
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setUpdated(false);
    setError('');
  };
  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };
  useEffect(() => {
    setUser(data);
    setUpdated(false);
  }, [data]);
  const handleError = (err) => {
    setError(err);
  };
  const handleSuccess = (suc) => {
    setSuccess(suc);
  };
  const handleClick = () => {
    setLoading(true);
    const query = { name: inputs.name, email: inputs.name };
    getNotRegistered(query, handleError, handleSuccess);
  };
  useEffect(() => {
    if (inputs.password !== inputs.confirmPassword) {
      setError('Password and current password not match!');
    }
  }, [inputs]);
  const callback = (response) => {
    setUpdated(response);
    setLoading(false);
  };
  useEffect(() => {
    if (success) {
      if (!file) {
        refreshToken().then(() => {
          updateUser(id, inputs, callback);
        });
      } else if (file !== null) {
        updateUserWithImg(id, file, inputs, callback);
      }
    }
  }, [success]);
  return (
    <div>
      <label
        htmlFor="editprofile"
        className="flex-1 w-96 mt-2 p-2 rounded-lg bg-purple-800 border-none hover:bg-purple-800 text-gray-300 flex justify-center items-center"
      >
        <BiEdit className="pr-1 w-6 h-6" />
        <span>Edit</span>
      </label>
      <input type="checkbox" id="editprofile" className="modal-toggle" />
      <div className="modal text-gray-300 backdrop-blur-sm bg-black/30 shadow-xl">
        <div className="modal-box relative bg-gray-800 h-screen overflow-hidden">
          <div className="flex-1 flex flex-col justify-between text-gray-300 rounded-lg bg-gray-800 w-full items-center">
            <div className="flex flex-col gap-1 justify-center w-full items-center pb-2">
              <div className="group inline-block relative rounded-full w-64 h-64">
                <img
                  src={
                    preview
                      ? preview
                      : user.img
                      ? user.img
                      : 'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'
                  }
                  alt="Avatar"
                  className="object-cover rounded-full h-full w-full"
                />
                <div className="absolute -inset-2 border-4 border-purple-600 rounded-full" />
                <div className="absolute z-10 group-hover:flex hidden  justify-center items-center w-full h-full backdrop-blur-sm bg-black/30 top-0 left-0 rounded-full">
                  <label
                    htmlFor="file"
                    className="btn btn-square border-none bg-purple-800 hover:bg-purple-800"
                  >
                    <BiImageAdd className="w-7 h-7" />
                    <input
                      onChange={loadImage}
                      type="file"
                      id="file"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="flex w-11/12 text-gray-300 gap-1 pt-5">
                <div className="flex flex-1 gap-1">
                  <BiUserCircle className="w-7 h-7 text-purple-700" />
                  <div className="flex justify-between w-full">
                    {' '}
                    <span>Username</span>
                    <span>:</span>
                  </div>
                </div>
                <div className="flex-1">
                  <input
                    name="name"
                    onChange={handleChange}
                    placeholder={user?.name}
                    type="text"
                    className="bg-transparent outline-none border-b-2 border-purple-800 w-full"
                  />
                </div>
              </div>
              <div className="flex w-11/12 text-gray-300 gap-1">
                <div className="flex flex-1 gap-1">
                  <BiMailSend className="w-6 h-6 text-purple-700" />
                  <div className="flex justify-between w-full">
                    {' '}
                    <span>Email</span>
                    <span>:</span>
                  </div>
                </div>
                <div className="flex-1">
                  <input
                    name="email"
                    onChange={handleChange}
                    placeholder={user?.email}
                    type="text"
                    className="bg-transparent outline-none border-b-2 border-purple-800 w-full"
                  />
                </div>
              </div>
              <div className="flex w-11/12 text-gray-300 gap-1">
                <div className="flex flex-1 gap-1">
                  <BiPhone className="w-6 h-6 text-purple-700" />
                  <div className="flex justify-between w-full">
                    {' '}
                    <span>Phone</span>
                    <span>:</span>
                  </div>
                </div>
                <div className="flex-1">
                  <input
                    name="phone"
                    onChange={handleChange}
                    placeholder={user?.phone}
                    type="text"
                    className="bg-transparent outline-none border-b-2 border-purple-800 w-full"
                  />
                </div>
              </div>

              <div className="flex w-11/12 text-gray-300 gap-1">
                <div className="flex flex-1 gap-1">
                  <BiInfoCircle className="w-6 h-6 text-purple-700" />
                  <div className="flex justify-between w-full">
                    {' '}
                    <span>Status</span>
                    <span>:</span>
                  </div>
                </div>
                <div className="flex-1">
                  <input
                    name="status"
                    onChange={handleChange}
                    placeholder={user?.status}
                    type="text"
                    className="bg-transparent outline-none border-b-2 border-purple-800 w-full"
                  />
                </div>
              </div>
              <div className="flex w-11/12 text-gray-300 gap-1">
                <div className="flex flex-1 gap-1">
                  <BiKey className="w-6 h-6 text-purple-700" />
                  <div className="flex justify-between w-full">
                    {' '}
                    <span>Password</span>
                    <span>:</span>
                  </div>
                </div>
                <div className="flex-1">
                  <input
                    name="password"
                    onChange={handleChange}
                    placeholder="******"
                    type="text"
                    className="bg-transparent outline-none border-b-2 border-purple-800 w-full"
                  />
                </div>
              </div>
              <div className="flex w-11/12 text-gray-300 gap-1">
                <div className="flex flex-1 gap-1">
                  <BiKey className="w-6 h-6 text-purple-700" />
                  <div className="flex justify-between w-full">
                    {' '}
                    <span>Confirm Password</span>
                    <span>:</span>
                  </div>
                </div>
                <div className="flex-1">
                  <input
                    name="confirmPassword"
                    onChange={handleChange}
                    placeholder="******"
                    type="text"
                    className="bg-transparent outline-none border-b-2 border-purple-800 w-full"
                  />
                </div>
              </div>
            </div>
            {error ? (
              <div className="h-7 mb-3 flex w-full bg-red-400 text-red-800 justify-center items-center  rounded-lg">
                <span className="py-1 px-2">{error}</span>
              </div>
            ) : updated === true ? (
              <a
                href="/"
                className="mb-2 w-full btn btn-sm bg-green-700 border-none hover:bg-green-600 text-gray-300 flex justify-center items-center"
              >
                <span className="">Click to see changes</span>
              </a>
            ) : (
              <div className="h-7 mb-3" />
            )}
            <div className="gap-2 w-4/5 flex justify-center items-center">
              {loading ? (
                <button
                  type="button"
                  className="btn loading w-full border-none bg-transparent hover:bg-transparent text-gray-300 btn-sm"
                >
                  loading
                </button>
              ) : (
                <>
                  <button
                    disabled={
                      !file &&
                      !inputs.name &&
                      !inputs.email &&
                      !inputs.password &&
                      !inputs.confirmPassword
                    }
                    type="button"
                    onClick={(e) => handleClick()}
                    className="flex-1 disabled:bg-gray-700 disabled:text-gray-500 w-full btn btn-sm bg-purple-800 border-none hover:bg-purple-800 text-gray-300 flex justify-center items-center"
                  >
                    <BiEdit className="pr-1 w-6 h-6" />
                    <span>Update</span>
                  </button>

                  <label
                    htmlFor="editprofile"
                    className=" w-full btn btn-sm bg-red-600 border-none hover:bg-red-600 text-gray-300 flex justify-center items-center flex-1"
                  >
                    <BiTrashAlt className="pr-1 w-6 h-6" />
                    <span>Cancle</span>
                  </label>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
