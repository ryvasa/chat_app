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
        <Route path="/:id" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/contacts/:id" element={<Contacts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
