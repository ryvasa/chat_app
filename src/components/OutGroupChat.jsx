import React from 'react';
import { BiError, BiLogOutCircle } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import { outGroupChat } from '../utils/api';

function OutGroupChat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const callback = () => {
    navigate('/group');
  };
  const handleClick = (e) => {
    e.preventDefault();
    outGroupChat(id, callback);
  };
  return (
    <div>
      <label
        htmlFor="outGroupChat"
        className="btn btn-circle btn-ghost flex justify-center items-center border-2 border-red-600 hover:border-red-600 btn-sm"
      >
        <BiLogOutCircle className="text-red-600 w-6 h-6" />
      </label>

      <input type="checkbox" id="outGroupChat" className="modal-toggle" />
      <div className="modal text-gray-300 backdrop-blur-sm bg-black/30 shadow-xl">
        <div className="modal-box relative bg-gray-800 h-11/12 overflow-hidden">
          <label
            htmlFor="outGroupChat"
            className="btn btn-xs btn-circle absolute right-2 top-2 bg-red-600 hover:bg-red-700 border-none"
          >
            ✕
          </label>
          <div className="w-full">
            <div className="p-2">
              <div className="flex-col flex w-full gap-3">
                <div className="flex gap-1">
                  <BiError className="text-red-500 w-7 h-7" />
                  <h4 className="text-lg font-semibold">Leave the group</h4>
                </div>
                <p>Are you sure to leave the group?</p>
                <div className="flex gap-2 justify-end">
                  <label
                    htmlFor="outGroupChat"
                    className="btn btn-sm bg-purple-800 hover:bg-purple-700 border-none"
                  >
                    Cancle
                  </label>
                  <button
                    onClick={handleClick}
                    type="button"
                    className="btn btn-sm bg-red-700 hover:bg-red-600 border-none"
                  >
                    Leave
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OutGroupChat;
