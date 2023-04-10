import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Verify from '../components/Verify';
import { getNotRegistered, getOtp } from '../utils/api';

function Register() {
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError('');
  };

  const dataOtp = {
    email: inputs.email,
    from: 'verifyAccount',
  };
  useEffect(() => {
    if (!error && success) {
      getOtp(dataOtp);
    }
  }, [success]);

  const handleError = (err) => {
    setError(err);
  };
  const handleSuccess = (suc) => {
    setSuccess(suc);
  };
  const handleClick = () => {
    const query = { name: inputs.name, email: inputs.name };
    getNotRegistered(query, handleError, handleSuccess);
  };
  useEffect(() => {
    if (inputs.password !== inputs.confirmPassword) {
      setError('Password and current password not match!');
    }
  }, [inputs]);
  return (
    <div className=" bg-gray-800 relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute bottom-0"
      >
        <path
          fill="rgb(107, 33, 168 )"
          fillOpacity="1"
          d="M0,64L24,64C48,64,96,64,144,96C192,128,240,192,288,192C336,192,384,128,432,106.7C480,85,528,107,576,133.3C624,160,672,192,720,213.3C768,235,816,245,864,213.3C912,181,960,107,1008,69.3C1056,32,1104,32,1152,58.7C1200,85,1248,139,1296,149.3C1344,160,1392,128,1416,112L1440,96L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"
        />
      </svg>
      <div className="hero min-h-screen backdrop-blur-sm bg-black/30 shadow-xl">
        <div className="hero-content flex-col lg:flex-row-reverse w-full">
          <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-gray-900">
            <div className="card-body">
              <div className="form-control">
                <span className="text-gray-300 text-sm pb-2">Username</span>
                <input
                  name="name"
                  onChange={handleChange}
                  type="text"
                  placeholder="username"
                  className="input text-gray-300 outline-none bg-transparent border-b-2 border-purple-800"
                />
              </div>
              <div className="form-control">
                <span className="text-gray-300 text-sm pb-2">Email</span>
                <input
                  name="email"
                  onChange={handleChange}
                  type="text"
                  placeholder="email"
                  className="input text-gray-300 outline-none bg-transparent border-b-2 border-purple-800"
                />
              </div>
              <div className="form-control">
                <span className="text-gray-300 text-sm pb-2">Password</span>
                <input
                  name="password"
                  onChange={handleChange}
                  type="text"
                  placeholder="min 6 character"
                  className="input text-gray-300 outline-none bg-transparent border-b-2 border-purple-800"
                />
              </div>
              <div className="form-control">
                <span className="text-gray-300 text-sm pb-2">
                  Confirm Password
                </span>
                <input
                  name="confirmPassword"
                  onChange={handleChange}
                  type="text"
                  placeholder="min 6 character and equel to password"
                  className="input text-gray-300 outline-none bg-transparent border-b-2 border-purple-800"
                />
              </div>
              <div className="text-gray-300 text-sm py-3">
                <span>Have an account? </span>
                <Link to="/login" className="text-purple-700">
                  Login
                </Link>
                <span> now!</span>
              </div>
              <div className="h-7 mb-2">
                {error && (
                  <div className="flex w-full bg-red-400 text-red-800 justify-center items-center mb-2 rounded-lg">
                    <span className="p-2">{error}</span>
                  </div>
                )}
              </div>
              <div className="form-control text-gray-300">
                {!inputs.name ||
                !inputs.email ||
                !inputs.password ||
                !inputs.confirmPassword ? (
                  <button
                    onClick={(e) => handleClick()}
                    type="button"
                    className="rounded-lg p-2   border-none w-full text-gray-500 bg-gray-800"
                  >
                    Please fill out the form
                  </button>
                ) : (
                  <button
                    onClick={(e) => handleClick()}
                    type="button"
                    className="rounded-lg p-2 bg-purple-800 hover:bg-purple-700 border-none text-gray-300 w-full disabled:text-gray-500 disabled:bg-gray-800"
                  >
                    <Verify inputs={inputs} error={error} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
