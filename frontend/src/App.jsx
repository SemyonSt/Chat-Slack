import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState, useMemo } from 'react';
import { Provider } from 'react-redux';
import ErrorPages from './pages/ErrorPages';
import LoginPages from './pages/LoginPages';
import RegisrtatPages from './pages/RegisrtatPages';
import ChatPages from './pages/ChatPages';

import AuthContext from './context/AuthContext';
import store from './slices/index';

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const contextValue = useMemo(() => ({ token, setToken }), [token, setToken]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};


const App = () => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container"><a className="navbar-brand" href="/">Hexlet Chat</a></div>
            <button style={{ marginRight: '250px' }} onClick={() => logOut()} type="button" className="btn btn-primary">Выйти</button>
          </nav>
          <Provider store={store}>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<ChatPages />} />
                <Route path="/login" element={<LoginPages />} />
                <Route path="/signup" element={<RegisrtatPages />} />
                <Route path="*" element={<ErrorPages />} />
              </Routes>
            </AuthProvider>
          </Provider>
        </div>
        <div className="Toastify" />
      </div>
    </div>
  );
};

export default App;
