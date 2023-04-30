import React, { useRef, useEffect } from 'react';
import {
  Modal, Button, FormGroup,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

import useApi from '../../hooks/apiHook';
import { actions as maodalsActions } from '../../slices/modalsSlice';

const DeleteChannelModal = () => {
  const dispatch = useDispatch();
  const apiChat = useApi();

  const onHide = () => dispatch(maodalsActions.hideModal());
  const modalInfo = useSelector((state) => state.modalsReducer.setModalInfo);

  const channelId = modalInfo.item;
  const { t } = useTranslation();
  const notify = () => toast.success(t('notify.delete'));

  const {
    handleSubmit, setSubmitting, isSubmitting,
  } = useFormik({
    initialValues: {
      removingChannelId: null,
    },
    onSubmit: () => {
      setSubmitting(true);
      apiChat.removeChannel(channelId)
        .then(() => {
          onHide();
          notify();
        })
        .catch((error) => {
          console.log('ERRROROROOR!!!!!!!!!!!', error);
        })
        .finally(() => {
          setSubmitting(false); // сброс isLoading в false после завершения запроса
        });
    },
  });

  const inputRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 1);
  }, []);

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title className="modal-title h4">{t('interface.deleteChannel')}</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <p className="lead">{t('interface.sure')}</p>
        </Modal.Body>
        <FormGroup className="d-flex justify-content-end m-3">
          <Button className="me-2 btn-secondary" variant="secondary" onClick={() => onHide()}>{t('interface.cancel')}</Button>
          <Button className="btn-primary" variant="danger" ref={inputRef} type="submit" disabled={isSubmitting}>{t('interface.delete')}</Button>
        </FormGroup>
      </form>
    </Modal>

  );
};
export default DeleteChannelModal;
