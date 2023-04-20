import React, { useState } from 'react';
import {
  Modal, Button, FormGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
// import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

// const socket = io();
import useApi from '../../hooks/apiHook';

const DeleteChannelModal = (props) => {
  const { onHide, modalInfo } = props;
  const channelId = modalInfo.item;
  const { t } = useTranslation();
  const notify = () => toast.success(t('notify.delete'));
  const apiChat = useApi();

  const [isLoading, setIsLoading] = useState(false);

  const submit = () => {
    setIsLoading(true);
    apiChat.removeChannel(channelId)
      .then(() => {
        onHide();
        notify();
      })
      .catch((error) => {
        console.log('ERRROROROOR!!!!!!!!!!!', error);
      })
      .finally(() => {
        setIsLoading(false); // сброс isLoading в false после завершения запроса
      });
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
        <Button className="btn-primary" variant="danger" type="submit" disabled={isLoading} onClick={() => submit()}>{t('interface.delete')}</Button>
      </FormGroup>
    </Modal>
  );
};
export default DeleteChannelModal;
