import React from 'react';
import { BiError, BiTrashAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';

function DeleteContact() {
  return (
    <div>
      <label
        htmlFor="deleteContact"
        className="cursor-pointer w-full btn bg-red-700 border-none hover:bg-red-700 text-gray-300 flex justifi-center items-center"
      >
        <BiTrashAlt className="pr-1 w-6 h-6" />
        <span>Delete</span>
      </label>

      <input type="checkbox" id="deleteContact" className="modal-toggle" />
      <div className="modal text-gray-300 backdrop-blur-sm bg-black/30 shadow-xl">
        <div className="modal-box relative bg-gray-800">
          <label
            htmlFor="deleteContact"
            className="btn btn-xs btn-circle absolute right-2 top-2 bg-red-700 hover:bg-red-600 border-none"
          >
            ✕
          </label>
          <div className="w-full">
            <div className="p-2">
              <div className="flex-col flex w-full gap-3">
                <div className="flex gap-1">
                  <BiError className="text-red-500 w-7 h-7" />
                  <h4 className="text-lg font-semibold">Delete Contact</h4>
                </div>
                <p>Are you sure to delete this contact?</p>
                <div className="flex gap-2 justify-end">
                  <label
                    htmlFor="deleteContact"
                    className="btn btn-sm bg-purple-800 hover:bg-purple-700 border-none"
                  >
                    Cancle
                  </label>
                  <Link
                    to="/contacts"
                    className="btn btn-sm bg-red-700 hover:bg-red-600 border-none"
                  >
                    Delete
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteContact;
