import React, { useMemo, useCallback } from 'react';
// import { io } from 'socket.io-client';
import SocketContext from './SocketContext';

// const socket = io();

const SocketProvider = ({ socket, children }) => {
  const addChannel = useCallback((values) => {
    console.log(values.channelName);
    socket.emit('newChannel', { name: values.channelName });
  }, [socket]);

  const renameChannel = useCallback((channelId, values) => {
    socket.emit('renameChannel', { id: channelId, name: values.channelName });
  }, [socket]);

  const removeChannel = useCallback((channelId) => {
    socket.emit('removeChannel', { id: channelId });
  }, [socket]);

  const contextValue = useMemo(() => ({
    addChannel,
    renameChannel,
    removeChannel,
  }), [addChannel, renameChannel, removeChannel]);
  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
