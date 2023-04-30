import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import filterWords from 'leo-profanity';

import { useTranslation } from 'react-i18next';
import { actions as channelsActions } from '../../slices/channelsSlice';
import { actions as maodalsActions } from '../../slices/modalsSlice';

const ChannelDisplay = ({ showModal }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const channels = useSelector((state) => state.channelReducer.channels);
  const activeChannelId = useSelector((state) => state.channelReducer.channelId);
  const setChannelId = (id) => {
    dispatch(channelsActions.setChannelId(id));
  };

  const render = channels.map((channel) => {
    const { name, id, removable } = channel;
    return (removable === false ? (
      <li className="nav-item w-100" key={id}>
        <button
          type="button"
          className={id === activeChannelId ? 'w-100 rounded-0 text-start btn btn-secondary' : 'w-100 rounded-0 text-start btn'}
          onClick={() => setChannelId(id)}
        >
          <span
            className="me-1"
          >
            #
          </span>
          {name}
        </button>
      </li>
    ) : (

      <li className="nav-item w-100" key={id}>

        <Dropdown as={ButtonGroup} className="d-flex">
          <Button
            variant={id === activeChannelId ? 'w-100 rounded-0 text-start text-truncate btn btn-secondary' : 'w-100 rounded-0 text-start text-truncate btn'}
            onClick={() => setChannelId(id)}
            id="dropdown-split-basic"
            className="w-50"
          >
            <span className="me-1">#</span>
            {filterWords.clean(name)}
          </Button>

          <Dropdown.Toggle
            variant={id === activeChannelId ? 'flex-grow-0 dropdown-toggle dropdown-toggle-split btn btn-secondary' : 'flex-grow-0 dropdown-toggle dropdown-toggle-split btn'}
            id="react-aria9457689434-1"
          >
            <span className="visually-hidden">{t('interface.channelManagement')}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1" onClick={() => showModal('delete', id)}>{t('interface.delete')}</Dropdown.Item>
            <Dropdown.Item href="#/action-2" onClick={() => showModal('rename', id)}>{t('interface.rename')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      </li>

    ));
  });
  return render;
};

const Channel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const showModal = (type, item = null) => dispatch(maodalsActions.showModal({ type, item }));

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <span>{t('interface.channels')}</span>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={() => showModal('add')}
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
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        <ChannelDisplay
          showModal={showModal}
        />
      </ul>
    </div>
  );
};

export default Channel;
