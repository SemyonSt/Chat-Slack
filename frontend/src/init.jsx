import { io } from 'socket.io-client';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as RollbalProvider } from '@rollbar/react';
import filterWords from 'leo-profanity';

import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import i18next from 'i18next';
import App from './App';

import { actions as channelsActions } from './slices/channelsSlice';
import { actions as messageActions } from './slices/messageSlice';
import slice from './slices/index';
import SocketProvider from './context/ApiProvider';

import resources from './locales/index';

const Init = () => {
  i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      fallbackLng: 'ru',
      resources,
    });

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    payload: {
      environment: 'production',
    },
    captureUncaught: true,
    captureUnhandledRejections: true,
  };

  filterWords.add(filterWords.getDictionary('en'));
  filterWords.add(filterWords.getDictionary('ru'));

  const socket = io();

  socket.on('newChannel', (payload) => {
    slice.dispatch(channelsActions.addChannel(payload));
  });

  socket.on('removeChannel', (payload) => {
    slice.dispatch(channelsActions.removeChannel(payload));
  });

  socket.on('renameChannel', (payload) => {
    slice.dispatch(channelsActions.renameChannel(payload));
  });

  socket.on('newMessage', (payload) => {
    slice.dispatch(messageActions.addMessage(payload));
  });

  return (
    <React.StrictMode>
      <BrowserRouter>
        <RollbalProvider config={rollbarConfig}>
          <SocketProvider socket={socket}>
            <App />
          </SocketProvider>
        </RollbalProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default Init;
