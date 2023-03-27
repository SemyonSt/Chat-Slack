import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import filterWords from 'leo-profanity';
import { actions as messageActions } from '../../slices/messageSlice';


import slice from '../../slices/index';

const socket = io();
socket.on('newMessage', (payload) => {
  slice.dispatch(messageActions.addMessage(payload));
});

const ChatMessage = () => {
  filterWords.loadDictionary('ru');

  const [message, setMessage] = useState('');
  const channels = useSelector((state) => state.channelReduser.channels);
  const channelsId = useSelector((state) => state.channelReduser.channelId);
  const messages = useSelector((state) => state.messageReducer.message);

  // отправка сообщений на сервер
  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('newMessage', {
      body: message,
      channelId: channelsId,
      username: JSON.parse(localStorage.getItem('userInfo')).username,
    });
    setMessage('');
  };

  // какая то фигня (отображение ID активного канала)
  const ActivChannelName = (channels1) => {
    const filter = channels1.filter((channel) => channel.id === channelsId).map((i) => i.name);
    return filter[0];
  };

  // фильтрация сообщений по каналам
  const chennaMessage = messages.filter((mes) => mes.channelId === channelsId);

  // отображение сообщений в общем поле
  const outputMessage = chennaMessage.map((mes) => {
    const { body, username, id } = mes;
    return (
      <div className="text-break mb-2" key={id}><b>{username}</b>: {filterWords.clean(body)}</div>
    );
  });

  // окончание "сообщения(ий/ие)"
  const numberOfMessages = (number) => {
    number %= 100;
    if (number >= 5 && number <= 20) {
      return 'сообщений';
    }
    number %= 10;
    if (number === 1) {
      return 'сообщение';
    }
    if (number >= 2 && number <= 4) {
      return 'сообщения';
    }
    return 'сообщений';
  };

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># {ActivChannelName(channels)} </b>
          </p>
          <span
            className="text-muted"
          >
            {chennaMessage.length} {numberOfMessages((chennaMessage.length))}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {outputMessage}
        </div>
        <div className="mt-auto px-5 py-3">
          <form noValidate="" className="py-1 border rounded-2" onSubmit={sendMessage}>
            <div className="input-group has-validation">
              <input
                name="body"
                aria-label="Новое сообщение"
                placeholder="Введите сообщение..."
                className="border-0 p-0 ps-2 form-control"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type="submit"
                disabled=""
                className="btn btn-group-vertical"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                  />
                </svg>
                <span className="visually-hidden">Отправить</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;


