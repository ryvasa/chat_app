import axios from 'axios';

const url = 'http://localhost:5000';
const user = JSON.parse(localStorage.getItem('user'));

export const getNotRegistered = async (query, handleError, handleSuccess) => {
  try {
    const response = await axios.get(
      `${url}/find/users?name=${query.name}&email=${query.email}`,
    );
    handleSuccess(true);
    return response;
  } catch (error) {
    handleError(error.response.data.message);
    return error;
  }
};

export const login = async (data, handleError) => {
  try {
    const response = await axios.post(`${url}/auth/login`, data);
    return response;
  } catch (error) {
    handleError(error.response.data.message);
    return error;
  }
};
export const register = async (data, handleSuccess) => {
  try {
    const response = await axios.post(`${url}/auth/register`, data);
    handleSuccess({ verified: true, user: response.data.user });
    return response;
  } catch (error) {
    return error;
  }
};
export const getOtp = async (data) => {
  try {
    const response = await axios.post(`${url}/otp/get`, data);
    return response;
  } catch (error) {
    return error;
  }
};
export const verifyOtp = async (data, callback) => {
  try {
    const response = await axios.post(`${url}/otp/verify`, data);
    callback(true);
    return response;
  } catch (error) {
    return error;
  }
};
export const logout = async () => {
  try {
    const response = await axios.delete(`${url}/auth/logout`);
    localStorage.removeItem('user');
    return response;
  } catch (error) {
    return error;
  }
};
export const getFirstToken = async (data, callback) => {
  try {
    const response = await axios.get(`${url}/auth/first_token/${data.uuid}`);
    callback(true);
    return response;
  } catch (error) {
    return error;
  }
};
export const getMe = async () => {
  try {
    const response = await axios.get(`${url}/auth/me`);
    localStorage.setItem('user', JSON.stringify(response.data));
    return response;
  } catch (error) {
    return error;
  }
};
export const refreshToken = async () => {
  try {
    const response = await axios.get(`${url}/token/${user.uuid}`);
    return response;
  } catch (error) {
    return error;
  }
};
export const getContacts = async (query, setSuccess, setError) => {
  try {
    const response = await axios.get(`${url}/contacts?name=${query}`);
    setSuccess(response.data);
  } catch (error) {
    setError(error);
  }
};
export const addPrivateChats = async (data, callback) => {
  try {
    const response = await axios.post(`${url}/private_chats`, data);
    callback(response.data);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const getPrivateChats = async (query, setSuccess, setError) => {
  try {
    const response = await axios.get(`${url}/private_chats?name=${query}`);
    setSuccess(response.data);
  } catch (error) {
    setError(error);
  }
};
export const getGroupChats = async (query, setSuccess, setError) => {
  try {
    const response = await axios.get(`${url}/group_chats?name=${query}`);
    setSuccess(response.data);
  } catch (error) {
    setError(error);
  }
};
export const getPrivateChat = async (setSuccess, setError, id) => {
  try {
    const response = await axios.get(`${url}/private_chats/${id}`);
    setSuccess(response.data);
  } catch (error) {
    setError(error);
  }
};
export const addGroupChat = async (data, callback) => {
  try {
    const response = await axios.post(`${url}/group_chats`, data);
    callback();
    return response;
  } catch (error) {
    return error;
  }
};
export const getGroupChat = async (setSuccess, setError, id) => {
  try {
    const response = await axios.get(`${url}/group_chats/${id}`);
    setSuccess(response.data);
  } catch (error) {
    setError(error);
  }
};
export const outGroupChat = async (id, callback) => {
  try {
    const response = await axios.put(`${url}/group_chats/${id}`);
    callback();
    return response;
  } catch (error) {
    return error;
  }
};
export const sendMessage = async (data, id) => {
  try {
    const response = await axios.post(`${url}/messages/${id}`, data);
    return response;
  } catch (error) {
    return error;
  }
};
export const getAllUsers = async (data, callback) => {
  try {
    const response = await axios.get(`${url}/users?name=${data}`);
    callback(response.data);
    return response;
  } catch (error) {
    return error;
  }
};
export const getUser = async (id, callback) => {
  try {
    const response = await axios.get(`${url}/users/${id}`);
    callback(response.data);
    return response;
  } catch (error) {
    return error;
  }
};
export const updateUser = async (id, data, callback) => {
  try {
    const response = await axios.put(`${url}/users/${id}`, data);
    callback(true);
    return response;
  } catch (error) {
    return error;
  }
};
export const addContact = async (data, callback) => {
  try {
    const response = await axios.post(`${url}/contacts`, data);
    callback();
    return response;
  } catch (error) {
    return error;
  }
};
