import React from 'react';
import {
  Modal, Button, FormGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

const socket = io();

const DeleteChannelModal = (props) => {
  const { onHide, modalInfo } = props;
  const channelId = modalInfo.item;
  const { t } = useTranslation();
  const notify = () => toast.success(t('notify.delete'));
  const submit = () => {
    socket.emit('removeChannel', { id: channelId });
    // setActive(false);
    onHide();
    notify();
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title className="modal-title h4">{t('interface.deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('interface.sure')}</p>
      </Modal.Body>
      <FormGroup className="d-flex justify-content-end m-3">
        <Button className="me-2 btn-secondary" variant="secondary" onClick={() => onHide()}>{t('interface.cancel')}</Button>
        <Button className="btn-primary" variant="danger" type="submit" onClick={() => submit()}>{t('interface.delete')}</Button>
      </FormGroup>
    </Modal>
  );
};
export default DeleteChannelModal;
