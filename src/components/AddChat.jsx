import React, { useEffect, useState } from 'react';
import { BiCommentAdd, BiSearchAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { getContacts, refreshToken } from '../utils/api';

function AddChat() {
  const [contacts, setContacts] = useState([]);
  const [query, setQuery] = useState('');
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
        htmlFor="my-modal-3"
        className="cursor-pointer tooltip tooltip-right"
        data-tip="New Chat"
      >
        <BiCommentAdd className="text-gray-300 w-7 h-7" />
      </label>

      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal text-gray-300 backdrop-blur-sm bg-black/30 shadow-xl">
        <div className="modal-box relative bg-gray-800">
          <label
            htmlFor="my-modal-3"
            className="btn btn-xs btn-circle absolute right-2 top-2 bg-red-700 hover:bg-red-600 border-none"
          >
            ✕
          </label>
          <div className="w-full">
            <div className="flex pr-14 py-3 gap-2  justify-between">
              <input
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Find Contact"
                className="outline-none bg-transparent border-b-2 w-full border-purple-700"
              />
              <BiSearchAlt className="text-purple-700 w-7 h-7" />
            </div>
            <div className="overflow-y-scroll h-96 px-2  border-2 border-purple-800 rounded-lg">
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <tbody>
                    {/* row 1 */}
                    {contacts.map((c) => (
                      <tr key={c.contact.uuid} className="bg-transparent">
                        <td className="bg-transparent">{c.contact.name}</td>
                        <td className="bg-transparent">
                          {c.contact.last_online}
                        </td>
                        <td className="bg-transparent">
                          <Link
                            to="/:id"
                            className=" btn btn-circle bg-purple-800 hover:bg-purple-800 border-none"
                          >
                            <BiCommentAdd className="text-gray-300 w-7 h-7" />
                          </Link>
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
    </div>
  );
}

export default AddChat;
