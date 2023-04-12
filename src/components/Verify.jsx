/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import { BiConversation, BiError, BiLogInCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getFirstToken, getMe, register, verifyOtp } from '../utils/api';

function Verify({ inputs, error }) {
  const [otp, setOtp] = useState('');
  const [verified, setVerified] = useState(false);
  const [token, setToken] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const localUser = JSON.parse(localStorage.getItem('user'));

  const callBack = (data) => {
    setVerified(data);
  };
  const handleSuccess = (data) => {
    setVerified(data.verified);
    setUser(data.user);
  };
  const handleClick = (e) => {
    const data = { otp, email: inputs.email };
    e.preventDefault();
    verifyOtp(data, callBack);
    setLoading(true);
  };
  useEffect(() => {
    if (verified) {
      const { name, email, password } = inputs;
      const dataInputs = { name, email, password };
      register(dataInputs, handleSuccess);
    }
  }, [verified]);
  useEffect(() => {
    const callback = (data) => {
      setToken(data);
    };
    if (user) {
      getFirstToken(user, callback);
    }
  }, [user]);
  useEffect(() => {
    if (token) {
      getMe();
    }
  }, [token]);
  useEffect(() => {
    if (localUser) {
      navigate('/chats');
    }
  }, [localUser]);
  return (
    <div>
      <label
        htmlFor="verify"
        className="flex justify-center items-center w-full"
      >
        Register
        <BiLogInCircle className="w-8 h-8 pl-2" />
      </label>

      <input type="checkbox" id="verify" className="modal-toggle" />
      <div className="modal text-gray-300 backdrop-blur-sm bg-black/30 shadow-xl">
        {error ? (
          <div className="modal-box relative bg-gray-800 overflow-hidden">
            <div className="flex-col justify-center items-center flex w-full gap-3">
              <div className="flex gap-1">
                <BiError className="text-red-500 w-7 h-7" />
                <h4 className="text-lg font-semibold">Error Duplicate</h4>
              </div>
              <p>{error}</p>
              <div className="flex gap-2 justify-end">
                <label
                  htmlFor="verify"
                  className="btn btn-sm bg-red-700 hover:bg-red-600 border-none"
                >
                  Change
                </label>
              </div>
            </div>
          </div>
        ) : (
          <div className="modal-box relative bg-gray-800 h-11/12 overflow-hidden">
            <div className="card-body">
              <div className="flex justify-center">
                <BiConversation className="text-gray-500 w-36 h-36" />
              </div>
              <div className="flex justify-center items-center flex-col gap-2 text-center">
                <div className="flex justify-center items-center  border-b-2 border-purple-800">
                  <input
                    type="text"
                    pattern="[0-9]{6}"
                    maxLength="6"
                    placeholder="******"
                    onChange={(e) => setOtp(e.target.value)}
                    className="outline-none bg-transparent text-gray-300 text-center pb-1 font-bold"
                  />
                </div>
                <p className="text-gray-300 text-sm font-semibold">
                  Enter the OTP code that was sent to your email
                  {inputs && ` ${inputs.email}`}
                </p>
              </div>
              <div className="flex justify-center items-center flex-col pt-5">
                <div className="text-gray-300 text-sm pt-1">
                  <span>Did not receive the message? </span>
                  <button type="button" className="text-purple-700">
                    Resending
                  </button>
                  <span> now!</span>
                </div>
              </div>
              <div className="flex justify-center items-center flex-col">
                <div className="text-gray-300 text-sm pb-3 pt-1">
                  <span>This is not your email? </span>
                  <label htmlFor="verify" className="text-purple-700">
                    Change
                  </label>
                  <span> now!</span>
                </div>
              </div>
              <div className="form-control text-gray-300">
                {loading ? (
                  <button
                    type="button"
                    className="btn bg-gray-800 hover:bg-gray-700 border-none loading text-purple-700"
                  >
                    {' '}
                  </button>
                ) : (
                  <button
                    onClick={handleClick}
                    type="button"
                    disabled={otp.length < 6}
                    className="btn bg-purple-800 hover:bg-purple-600 border-none disabled:text-gray-300"
                  >
                    Verify
                    <BiLogInCircle className="w-8 h-8 pl-2" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
Verify.propTypes = {
  inputs: PropTypes.object,
  error: PropTypes.string,
};
Verify.defaultProps = {
  inputs: 'Unknown',
  error: 'Unknown',
};

export default Verify;
