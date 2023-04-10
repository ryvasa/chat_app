import React, { useEffect, useState } from 'react';
import { BiSearchAlt, BiUserPlus } from 'react-icons/bi';
import { getAllUsers } from '../utils/api';
import time from '../utils/timeFormat';

function AddContact() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');

  const callback = (data) => {
    setUsers(data);
  };
  useEffect(() => {
    getAllUsers(name, callback);
  }, [name]);
  return (
    <>
      <label
        htmlFor="addContact"
        className="btn btn-sm bg-purple-800 hover:bg-purple-700 border-none text-gray-300 flex"
      >
        <BiUserPlus className="pr-1 w-7 h-7" />
        <span>Add Contact</span>
      </label>

      <input type="checkbox" id="addContact" className="modal-toggle" />
      <div className="modal text-gray-300 backdrop-blur-sm bg-black/30 shadow-xl">
        <div className="modal-box relative bg-gray-800 overflow-hidden">
          <label
            htmlFor="addContact"
            className="btn btn-xs btn-circle absolute right-2 top-2 bg-red-600 hover:bg-red-700 border-none"
          >
            ✕
          </label>

          <div className="w-full p-2">
            <div className="flex gap-2 justify-between">
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Find user by username"
                className="outline-none bg-transparent border-b-2 w-full border-purple-700"
              />
              <BiSearchAlt className="text-purple-700 w-7 h-7" />
            </div>
            <div className="overflow-y-scroll h-96 px-2">
              <div className="overflow-x-auto ">
                <table className="table w-full">
                  <tbody>
                    {users.map((user) => (
                      <tr className="bg-transparent flex " key={user.uuid}>
                        <td className="bg-transparent flex flex-[3] justify-start">
                          {user.name}
                        </td>
                        <td className="bg-transparent flex flex-1 justify-center">
                          {time(user.last_online)}
                        </td>
                        <td className="bg-transparent flex flex-1 justify-center">
                          <button
                            type="button"
                            className="btn btn-sm btn-square bg-purple-800 border-none hover:bg-purple-600"
                          >
                            <BiUserPlus className="w-6 h-6 text-gray-300" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddContact;
