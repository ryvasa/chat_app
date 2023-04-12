import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Contacts from './pages/Contacts';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

axios.defaults.withCredentials = true;
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chats" element={<Home />} />
        <Route path="/chats/:id" element={<Home />} />
        <Route path="/group" element={<Home />} />
        <Route path="/group/:id" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/contacts/:id" element={<Contacts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
