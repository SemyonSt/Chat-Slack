import React from 'react';
import {
  Modal, Button,
} from 'react-bootstrap';

import { io } from 'socket.io-client';

const socket = io();

const DeleteChannelModal = ({ active, setActive, channelId }) => {
  const submit = () => {
    socket.emit('removeChannel', { id: channelId });
    setActive(false);
  };

  return (
        <Modal show={active} centered>
            <Modal.Header closeButton onClick={() => setActive(false)}>
                <Modal.Title class="modal-title h4">Удалить канал</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <p className="lead">Уверены?</p>
                </Modal.Body>
                <div className="d-flex justify-content-end">
                <Button variant="secondary" onClick={() => setActive(false)}>Отменить</Button>
                <Button variant="danger" type="submit" onClick={() => submit()}>Удалить</Button>
                </div>
        </Modal>
  );
};
export default DeleteChannelModal;
