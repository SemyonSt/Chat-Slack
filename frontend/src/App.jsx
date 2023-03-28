import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState, useMemo, useEffect } from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { ToastContainer } from 'react-toastify';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ErrorPages from './pages/ErrorPages';
import LoginPages from './pages/LoginPages';
import RegisrtatPages from './pages/RegisrtatPages';
import ChatPages from './pages/ChatPages';

import AuthContext from './context/AuthContext';
import store from './slices/index';
import resources from './locales/index';


const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const contextValue = useMemo(() => ({ token, setToken }), [token, setToken]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'ru',
    resources,
  });

const changeLanguage = (lng) => {
  i18next.changeLanguage(lng);
};


const App = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [language, setLanguge] = useState(localStorage.getItem('language') || 'Русский');

  useEffect(() => {
    localStorage.setItem('language', language);
  });

  const logOut = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="container"><a className="navbar-brand" href="/">Hexlet Chat</a></div>
            {localStorage.getItem('userInfo') ? <button style={{ marginRight: '10px' }} onClick={() => logOut()} type="button" className="btn btn-primary">{t('interface.bntExit')}</button> : null}
            <div>
              <DropdownButton
                id="dropdown-basic-button"
                title={language}
                className="btn-language"
                variant="light"
                style={{ marginRight: '200px' }}
              >
                <Dropdown.Item href="#/action-2" onClick={() => { changeLanguage('ru'); setLanguge('Русский'); }}>Русский</Dropdown.Item>
                <Dropdown.Item href="#/action-1" onClick={() => { changeLanguage('en'); setLanguge('English'); }}>English</Dropdown.Item>
              </DropdownButton>
            </div>

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
        <ToastContainer />
      </div>
    </div>
  );
};

export default App;
