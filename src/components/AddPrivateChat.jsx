import React, { useEffect, useState } from 'react';
import { BiMailSend, BiCommentAdd, BiSearchAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { addPrivateChats, getContacts, refreshToken } from '../utils/api';

function AddPrivateChat({ callback, chats }) {
  const [contacts, setContacts] = useState([]);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const getcallback = (data) => {
    setContacts(data);
  };
  useEffect(() => {
    refreshToken().then(() => {
      getContacts(query, getcallback);
    });
  }, [query]);
  const handleCallback = (data) => {
    callback();
    setSuccess(true);
    navigate(`/chats/${data.uuid}`);
  };
  const handleClick = (id) => {
    const data = { receiverId: id };
    addPrivateChats(data, handleCallback);
  };
  const handleSuccess = () => {
    setSuccess(false);
  };
  useEffect(() => {
    if (success) {
      setTimeout(handleSuccess, 3000);
    }
  }, [success]);
  const contactIdsInChat = chats.map((chat) => chat.receiver_id);

  const contactsNotInChat = contacts.filter(
    (contact) => !contactIdsInChat.includes(contact.user_id),
  );

  return (
    <div>
      <label
        htmlFor="addprivatechat"
        className="btn btn-square bg-purple-800 hover:bg-purple-700 tooltip tooltip-right flex justify-center items-center border-none"
        data-tip="New Chat"
      >
        <BiCommentAdd className="text-gray-300 w-7 h-7" />
      </label>

      <input type="checkbox" id="addprivatechat" className="modal-toggle" />
      <div className="modal text-gray-300 backdrop-blur-sm bg-black/30 shadow-xl">
        <div className="modal-box relative bg-gray-800">
          <label
            htmlFor="addprivatechat"
            className="btn btn-xs btn-circle absolute right-2 top-2 bg-red-700 hover:bg-red-600 border-none"
          >
            ✕
          </label>
          {success ? (
            <label
              htmlFor="addprivatechat"
              className="flex justify-center items-center gap-2 flex-col"
            >
              <BiMailSend className="w-20 h-20 text-gray-600" />
              <span className="text-gray-300 btn p-2 bg-purple-800 hover:bg-purple-800 rounded-lg border-none">
                Send message
              </span>
            </label>
          ) : (
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
                      {contactsNotInChat.map((contact) => (
                        <tr key={contact.uuid} className="bg-transparent flex">
                          <td className="bg-transparent flex-1">
                            {contact.user?.name}
                          </td>
                          <td className="bg-transparent flex-1">
                            {contact.user?.last_online
                              ? contact.user?.last_online
                              : 'Unknown'}
                          </td>
                          <td className="bg-transparent flex-1 flex justify-end">
                            <button
                              type="button"
                              onClick={(e) => handleClick(contact.user?.uuid)}
                              className=" btn btn-circle btn-sm bg-purple-800 hover:bg-purple-800 border-none"
                            >
                              <BiCommentAdd className="text-gray-300 w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddPrivateChat;
