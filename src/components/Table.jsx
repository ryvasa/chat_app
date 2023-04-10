import React from 'react';
import { Link } from 'react-router-dom';

function Table({ contacts }) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr className="bg-purple-900 text-gray-300">
            <th className="bg-transparent"> </th>
            <th className="bg-transparent">Name</th>
            <th className="bg-transparent">Email</th>
            <th className="bg-transparent">Last Online</th>
            <th className="bg-transparent"> </th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c, index) => (
            <tr key={c.uuid} className="bg-gray-800 text-gray-300">
              <th className="bg-transparent">{index + 1}</th>
              <td className="bg-transparent">
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={
                          c.contact?.img
                            ? c.contact?.img
                            : 'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'
                        }
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div className="font-bold">{c.contact?.name}</div>
                </div>
              </td>
              <td className="bg-transparent">{c.contact?.email}</td>

              <td className="bg-transparent">{c.contact?.last_online}</td>
              <th className="bg-transparent">
                <Link
                  to={`/contacts/${c.contact?.uuid}`}
                  className="btn btn-sm bg-purple-800 hover:bg-purple-700 border-none text-gray-200"
                >
                  details
                </Link>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Table;
