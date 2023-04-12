import React, { useEffect, useState } from 'react';
import { BiConversation, BiSearchAlt, BiUserPlus } from 'react-icons/bi';
import { addContact, getAllUsers, getContacts } from '../utils/api';
import time from '../utils/timeFormat';

function AddContact() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [contacts, setContacts] = useState([]);
  const [arrayContacts, setArrayContacts] = useState(contacts);

  const userCallBack = (data) => {
    setUsers(data);
  };
  const contactCallBack = (data) => {
    setContacts(data);
  };
  const filterContactsByName = () => {
    return contacts.filter((contact) => contact.user.name.includes(name));
  };
  useEffect(() => {
    setArrayContacts(filterContactsByName);
  }, [name, contacts]);
  useEffect(() => {
    getContacts(name, contactCallBack);
    getAllUsers(name, userCallBack);
  }, [name]);
  const nonContacts = users.filter(
    (obj) => !contacts.find(({ user }) => obj.uuid === user.uuid),
  );
  const callBackAdd = () => {
    getAllUsers(name, userCallBack);
    getContacts(name, contactCallBack);
    setArrayContacts(filterContactsByName);
  };
  const handleClick = (id) => {
    const data = { userId: id };
    addContact(data, callBackAdd);
  };
  return (
    <>
      <label
        htmlFor="addContact"
        className="btn btn-sm btn-square bg-purple-800 hover:bg-purple-700 border-none text-gray-300 flex"
      >
        <BiUserPlus className="pr-1 w-7 h-7" />
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
                    {nonContacts.map((user) => (
                      <tr className="bg-transparent flex " key={user.uuid}>
                        <td className="bg-transparent flex flex-[3] justify-start">
                          {user.name}
                        </td>
                        <td className="bg-transparent flex flex-1 justify-center">
                          {time(user.last_online)}
                        </td>
                        <td className="bg-transparent flex flex-1 justify-center">
                          <button
                            onClick={(e) => handleClick(user.uuid)}
                            type="button"
                            className="btn btn-sm btn-square bg-purple-800 border-none hover:bg-purple-600"
                          >
                            <BiUserPlus className="w-6 h-6 text-gray-300" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {arrayContacts.map((contact) => (
                      <tr
                        className="bg-transparent flex "
                        key={contact.user?.uuid}
                      >
                        <td className="bg-transparent flex flex-[3] justify-start">
                          {contact.user?.name}
                        </td>
                        <td className="bg-transparent flex flex-1 justify-center">
                          {time(contact.user?.last_online)}
                        </td>
                        <td className="bg-transparent flex flex-1 justify-center">
                          <button
                            type="button"
                            className="btn btn-sm btn-square bg-purple-800 border-none hover:bg-purple-600"
                          >
                            <BiConversation className="w-6 h-6 text-gray-300" />
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
