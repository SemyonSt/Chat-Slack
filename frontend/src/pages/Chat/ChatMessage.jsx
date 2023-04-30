import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import filterWords from 'leo-profanity';
import useApi from '../../hooks/apiHook';

const ChatMessage = () => {
  const { t } = useTranslation();

  const apiChat = useApi();

  const [message, setMessage] = useState('');
  const channels = useSelector((state) => state.channelReducer.channels);
  const channelsId = useSelector((state) => state.channelReducer.channelId);
  const messages = useSelector((state) => state.messageReducer.message);

  // Создание фокуса на инпут сообщения
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

  // отправка сообщений на сервер
  const sendMessage = (e) => {
    e.preventDefault();
    apiChat.newMessage(message, channelsId)
      .then(() => {
        setMessage('');
      })
      .catch((error) => {
        console.log('ERRROROROOR!!!!!!!!!!!', error);
      });
  };

  // какая то фигня (отображение ID активного канала)
  const ActivChannelName = (channels1) => {
    const channelData = channels1.find((channel) => channel.id === channelsId);
    return channelData ? channelData.name : 'No channel found';
  };

  // фильтрация сообщений по каналам
  const chennalMessage = messages.filter((mes) => mes.channelId === channelsId);

  // отображение сообщений в общем поле
  const outputMessage = chennalMessage.map((mes) => {
    const { body, username, id } = mes;
    return (
      <div className="text-break mb-2" key={id}>
        <b>
          {username}
        </b>
        :
        {' '}
        {filterWords.clean(body)}
      </div>
    );
  });

  // перемотка скрола на новое сообщение
  const messagesBoxRef = useRef(null);

  // вызываем scrollTop при обновлении outputMessage
  useEffect(() => {
    messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
  }, [outputMessage]);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {' '}
              {ActivChannelName(channels)}
              {' '}
            </b>
          </p>
          <span
            className="text-muted"
          >
            {' '}
            {`${chennalMessage.length} ${t('messagesCounter.messagesCount', { count: (chennalMessage.length) })}`}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 " ref={messagesBoxRef}>
          {outputMessage}
        </div>
        <div className="mt-auto px-5 py-3">
          <form noValidate="" className="py-1 border rounded-2" onSubmit={sendMessage}>
            <div className="input-group has-validation">
              <Form.Control
                ref={inputRef}
                name="body"
                aria-label={t('interface.newMessage')}
                placeholder={t('interface.enterMessage')}
                className="border-0 p-0 ps-2 form-control"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type="submit"
                disabled={!message}
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
                <span className="visually-hidden">{t('interface.submit')}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
