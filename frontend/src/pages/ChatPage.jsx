import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import axios from 'axios';

import routes from '../routes';

import ChatMessage from './Chat/ChatMessage';
import Chennal from './Chat/Channel';

import { actions as channelsActions } from '../slices/channelsSlice';
import { actions as messageActions } from '../slices/messageSlice';

const ChatPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(routes.getData(), { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` } });
      dispatch(channelsActions.setChannels(response.data.channels));
      dispatch(messageActions.setMessages(response.data.messages));
      // console.log(response.data);
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    // console.log('STORAGE!!!!', localStorage);
    if (!localStorage.getItem('userInfo')) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        {Chennal()}
        {ChatMessage()}
      </div>
    </div>
  );
};

export default ChatPage;
