import React, { useEffect, useState } from 'react';
import { BiGroup, BiSearchAlt, BiEdit } from 'react-icons/bi';
import { getContacts, refreshToken } from '../utils/api';

function AddGroupChat() {
  const [contacts, setContacts] = useState([]);
  const [query, setQuery] = useState('');
  const [member, setMember] = useState([]);
  const checked = (id) => {
    setMember([...member, id]);
  };
  const unchecked = (id) => {
    setMember(member.filter((memberId) => memberId !== id));
  };
  const callback = (data) => {
    setContacts(data);
  };
  useEffect(() => {
    refreshToken().then(() => {
      getContacts(query, callback);
    });
  }, [query]);
  return (
    <div>
      <label
        htmlFor="group"
        className="cursor-pointer tooltip tooltip-right"
        data-tip="New Group Chat"
      >
        <BiGroup className="text-gray-300 w-8 h-8" />
      </label>

      <input type="checkbox" id="group" className="modal-toggle" />
      <div className="modal text-gray-300 backdrop-blur-sm bg-black/30 shadow-xl">
        <div className="modal-box relative bg-gray-800 h-11/12 overflow-hidden">
          <label
            htmlFor="group"
            className="btn btn-xs btn-circle absolute right-2 top-2 bg-red-600 hover:bg-red-700 border-none"
          >
            ✕
          </label>
          <div className="flex pr-14 py-3 gap-2  justify-between">
            <BiEdit className="text-purple-700 w-7 h-7" />
            <input
              type="text"
              placeholder="Group Name"
              className="outline-none bg-transparent border-b-2 w-full border-purple-700"
            />
          </div>
          <div className="border-2 border-purple-700 rounded-lg ">
            <div className="flex gap-2 w-full justify-between p-3">
              <div className="flex gap-2">
                <BiGroup className="text-purple-700 w-7 h-7" />
                <div className="text-gray-300 flex gap-1">
                  <span>Member</span>(
                  <span className="text-purple-500">{member.length}</span>)
                </div>
              </div>
              <div className="flex gap-2 justify-between">
                <input
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  placeholder="Find Contact"
                  className="outline-none bg-transparent border-b-2 w-full border-purple-700"
                />
                <BiSearchAlt className="text-purple-700 w-7 h-7" />
              </div>
            </div>
            <div className="overflow-y-scroll h-96 px-2">
              <div className="overflow-x-auto ">
                <table className="table w-full">
                  <tbody>
                    {contacts.map((c) => (
                      <tr className="bg-transparent" key={c.uuid}>
                        <th className="bg-transparent">
                          <label htmlFor={c.contact.uuid}>
                            <input
                              onChange={(e) => {
                                if (e.target.checked) {
                                  checked(c.contact.uuid);
                                } else {
                                  unchecked(c.contact.uuid);
                                }
                              }}
                              id={c.contact.uuid}
                              type="checkbox"
                              className="checkbox border-2 border-gray-300"
                            />
                          </label>
                        </th>
                        <td className="bg-transparent">{c.contact.name}</td>
                        <td className="bg-transparent">{c.contact.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center w-full pt-3">
            <button
              type="button"
              className="btn bg-purple-800 hover:bg-purple-600 border-nonde"
            >
              + Create Group
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddGroupChat;
