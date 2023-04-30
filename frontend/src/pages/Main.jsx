import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';

import { ToastContainer } from 'react-toastify';

import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

import Modal from './Modal';
import ChatPages from './ChatPage';
import RegisrtatPages from './RegisrtatPage';
import LoginPages from './LoginPage';
import ErrorPages from './ErrorPage';
import useAuth from '../hooks/authHooks';

import routes from '../routes';

const changeLanguage = (lng) => {
  i18next.changeLanguage(lng);
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return (
    auth.logIn ? children : auth.logOut
  );
};

const Main = () => {
  const { t } = useTranslation();
  // const navigate = useNavigate();
  const [language, setLanguge] = useState(localStorage.getItem('language') || 'Русский');

  const auth = useAuth();

  useEffect(() => {
    localStorage.setItem('language', language);
  });
  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container"><a className="navbar-brand" href="/">Hexlet Chat</a></div>
            {localStorage.getItem('userInfo') ? <Button onClick={() => auth.logOut()} type="button" className="btn btn-primary">{t('interface.bntExit')}</Button> : null}
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
          <Routes>
            <Route path={routes.logIn} element={<LoginPages />} />
            <Route path={routes.signup} element={<RegisrtatPages />} />
            <Route path={routes.err} element={<ErrorPages />} />
            <Route
              path={routes.main}
              element={(
                <PrivateRoute>
                  <ChatPages />
                </PrivateRoute>
              )}
            />
          </Routes>
          <Modal />
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Main;
