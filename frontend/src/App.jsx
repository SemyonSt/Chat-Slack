import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import ErrorPages from './pages/ErrorPages';
import LoginPages from './pages/LoginPages';
import RegisrtatPages from './pages/RegisrtatPages';
import ChatPages from './pages/ChatPages';

import AuthContext from './context/AuthContext';

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
const App = () => (
  <div className="h-100">
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container"><a className="navbar-brand" href="/">Hexlet Chat</a></div>
        </nav>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<ChatPages />} />
            <Route path="/login" element={<LoginPages />} />
            <Route path="/signup" element={<RegisrtatPages />} />
            <Route path="*" element={<ErrorPages />} />
          </Routes>
        </AuthProvider>
      </div>
      <div className="Toastify" />
    </div>
  </div>
);

export default App;
