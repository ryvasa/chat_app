import React, { useEffect, useState } from 'react';
import { BiSearchAlt, BiUserCircle } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import { getContacts, refreshToken } from '../utils/api';

import AddContact from '../components/AddContact';
import Contact from '../components/Contact';
import Sidebar from '../components/Sidebar';
import Table from '../components/Table';

function Contacts() {
  const { id } = useParams();
  const [query, setQuery] = useState('');
  const [contacts, setContacts] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  const setSuccess = (data) => {
    setContacts(data);
  };
  const setError = (data) => {
    setErrorMessage(data);
  };
  useEffect(() => {
    refreshToken().then(() => {
      getContacts(query, setSuccess, setError);
    });
  }, [query]);
  return (
    <div className="relative">
      <div className="flex fixed w-full">
        <Sidebar />
        <div className="flex bg-gray-900 w-full p-5 gap-5">
          <div className="flex-[2]">
            <div className="flex py-3 gap-2  justify-between w-full bg-gray-900 text-gray-300">
              <input
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Find Contact"
                className="outline-none bg-transparent border-b-2 w-full border-purple-900"
              />
              <BiSearchAlt className="text-purple-700 w-7 h-7" />
              <AddContact />
            </div>
            <Table contacts={contacts} from="contacts" />
          </div>
          {id ? (
            <Contact />
          ) : (
            <div className="flex-1 flex justify-between text-gray-300 p-2 rounded-lg bg-gray-800 w-full h-full items-center">
              <div className="w-full flex items-center justify-center">
                <BiUserCircle className="w-96 h-96 text-gray-700" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contacts;
