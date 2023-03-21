import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';


import { actions as channelsActions } from '../../slices/chanalSlice';
import slice from '../../slices/index';

import AddChannelModal from '../Modal/AddChannel';
import DeleteChannelModal from '../Modal/DeleteChannelModal';


const socket = io();
socket.on('newChannel', (payload) => {
  console.log(payload); // { id: 6, name: "new channel", removable: true }
  slice.dispatch(channelsActions.addChannel(payload));
  slice.dispatch(channelsActions.setChannelId(payload.id));
});

socket.on('removeChannel', (payload) => {
  slice.dispatch(channelsActions.removeChannel(payload));
  slice.dispatch(channelsActions.setChannelId(1));
});


const Chennal = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channelReduser.channels);
  const channelId = useSelector((state) => state.channelReduser.channelId);
  console.log(channels);

  const [addModalActive, setAddModalActive] = useState(false);
  const [deleteModalActive1, setDeleteModalActive1] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  const getChannelId = (id) => {
    dispatch(channelsActions.setChannelId(id));
  };


  const ChannelDisplay = channels.map((channel) => {
    const { name, id, removable } = channel;
    return (removable === false ? (
      <li className="nav-item w-100" key={id}>
        <button
          type="button"
          className={id === channelId ? 'w-100 rounded-0 text-start btn btn-secondary' : 'w-100 rounded-0 text-start btn'}
          onClick={() => getChannelId(id)}
        >
          <span
            className="me-1"
          >#
          </span>{name}
        </button>
      </li>
    ) : (
      <li className="nav-item w-100" key={id}>
        <Dropdown as={ButtonGroup} className="d-flex show dropdown btn-group">
          <Button
            variant={id === channelId ? 'w-100 rounded-0 text-start btn btn-secondary' : 'w-100 rounded-0 text-start btn'}
            onClick={() => getChannelId(id)}
            id="dropdown-split-basic"
          >
            <span className="me-1">#</span>{name}
          </Button>

          <Dropdown.Toggle
            variant={id === channelId ? 'flex-grow-0 dropdown-toggle dropdown-toggle-split btn btn-secondary' : 'flex-grow-0 dropdown-toggle dropdown-toggle-split btn'}
            id="react-aria9457689434-1"
          />

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1" onClick={() => { setDeleteModalActive1(true); setDeleteId(id); }}>Удалить</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Переименовать</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
    ));
  });

  return (
    <>
      <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
        <div className="d-flex justify-content-between mb-2 ps-4 pe-2"><span>Каналы</span>
          <button
            type="button"
            className="p-0 text-primary btn btn-group-vertical"
            onClick={() => setAddModalActive(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path
                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
              />
              <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
            <span className="visually-hidden">+</span>
          </button>
        </div>
        <ul className="nav flex-column nav-pills nav-fill px-2">
          {ChannelDisplay}
        </ul>
      </div>
      <AddChannelModal active={addModalActive} setActive={setAddModalActive} />
      <DeleteChannelModal
        active={deleteModalActive1}
        setActive={setDeleteModalActive1}
        channelId={deleteId}
      />
    </>


  );
};

export default Chennal;


