import { io } from 'socket.io-client';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as RollbalProvider } from '@rollbar/react';

import App from './App';

import { actions as channelsActions } from './slices/channelsSlice';
import slice from './slices/index';
import SocketProvider from './context/SocketProvider';

const Init = () => {
  const rollbarConfig = {
    accessToken: 'e4529ece2f6d496e8e58ff3c0243ff6b',
    environment: 'testenv',
  };

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

  return (
    <React.StrictMode>
      <BrowserRouter>
        <RollbalProvider config={rollbarConfig}>
          <SocketProvider store={socket}>
            <App />
          </SocketProvider>
        </RollbalProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default Init;