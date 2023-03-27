import React from 'react';
import {
  Modal, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

const socket = io();

const DeleteChannelModal = ({ active, setActive, channelId }) => {
  const { t } = useTranslation();
  const notify = () => toast.success('Канал удален');
  const submit = () => {
    socket.emit('removeChannel', { id: channelId });
    setActive(false);
    notify();
  };

  return (
        <Modal show={active} centered>
            <Modal.Header closeButton onClick={() => setActive(false)}>
                <Modal.Title className="modal-title h4">{t('interface.deleteChannel')}</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <p className="lead">{t('interface.sure')}</p>
                </Modal.Body>
                <div className="d-flex justify-content-end">
                <Button variant="secondary" onClick={() => setActive(false)}>{t('interface.cancel')}</Button>
                <Button variant="danger" type="submit" onClick={() => submit()}>{t('interface.delete')}</Button>
                </div>
        </Modal>
  );
};
export default DeleteChannelModal;
