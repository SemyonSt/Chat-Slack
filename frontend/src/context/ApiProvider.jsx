import React, { useMemo, useCallback } from 'react';
// import { io } from 'socket.io-client';
import SocketContext from './ApiContext';

// const socket = io();

const ApiProvider = ({ socket, children }) => {
  const addChannel = useCallback((values) => new Promise((resolve, reject) => {
    socket.emit('newChannel', { name: values.channelName }, (response) => {
      if (response.status === 'ok') {
        resolve(response.data);
        localStorage.setItem('userDo', 'Im');
      } else {
        reject(response.error);
      }
    });
  }), [socket]);

  const renameChannel = useCallback((channelId, values) => new Promise((resolve, reject) => {
    socket.emit('renameChannel', { id: channelId, name: values.channelName }, (response) => {
      if (response.status === 'ok') {
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  }), [socket]);

  const removeChannel = useCallback((channelId) => new Promise((resolve, reject) => {
    socket.emit('removeChannel', { id: channelId }, (response) => {
      if (response.status === 'ok') {
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  }), [socket]);

  const newMessage = useCallback((message, channelsId) => new Promise((resolve, reject) => {
    socket.emit('newMessage', {
      body: message,
      channelId: channelsId,
      username: JSON.parse(localStorage.getItem('userInfo')).username,
    }, (response) => {
      if (response.status === 'ok') {
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  }), [socket]);

  const contextValue = useMemo(() => ({
    addChannel,
    renameChannel,
    removeChannel,
    newMessage,
  }), [addChannel, renameChannel, removeChannel, newMessage]);

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};

export default ApiProvider;
