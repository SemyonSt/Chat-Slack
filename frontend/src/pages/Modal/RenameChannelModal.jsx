import { useFormik } from 'formik';
import * as yup from 'yup';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import React, { useRef, useEffect } from 'react';
import {
  Modal, Button, Form, FormGroup,
} from 'react-bootstrap';

import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

const socket = io();

const RenameChannelModal = (props) => {
  const { t } = useTranslation();
  const { onHide, modalInfo } = props;
  const channelId = modalInfo.item;
  const channels = useSelector((state) => state.channelReduser.channels);
  const channelNames = channels.map((i) => i.name);
  const notify = () => toast.success(t('notify.rename'));

  const schema = yup.object().shape({
    channelName: yup.string()
      .min(3, t('error.minMaxSymbols'))
      .max(20, t('error.minMaxSymbols'))
      .required(t('error.required'))
      .notOneOf(channelNames, t('error.uniq'))
      .trim(t('error.required')),
  });

  const channelToRename = channels.find((i) => i.id === channelId);
  const {
    values, errors, handleChange, handleSubmit,
  } = useFormik({
    initialValues: {
      channelName: channelToRename ? channelToRename.name : '',
    },
    validationSchema: schema,
    validateOnChange: false,
    errorToken: false,
    onSubmit: () => {
      socket.emit('renameChannel', { id: channelId, name: values.channelName });
      onHide();
      notify();
    },
  });

  const errClass = cn('mb-2 form-control', {
    'mb-2 form-control is-invalid': errors.channelName,
  });


  const inputRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      // inputRef.current.focus();
      inputRef.current.select();
    }, 1);
  }, []);

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('interface.renameChannel')}</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Modal.Footer>
            <Form.Control
              ref={inputRef}
              name="channelName"
              id="channelName"
              className={errClass}
              value={values.channelName}
              onChange={handleChange}
            />
            <Form.Label className="visually-hidden" htmlFor="newChannelName">{t('interface.channelName')}</Form.Label>
            <div className="invalid-feedback">{errors.channelName}</div>
          </Modal.Footer>
        </Form.Group>
        <FormGroup className="d-flex justify-content-end m-3">
          <Button className="me-2 btn-secondary" variant="secondary" onClick={() => onHide()}>{t('interface.cancel')}</Button>
          <Button className="btn-primary" variant="primary" type="submit">{t('interface.submit')}</Button>
        </FormGroup>
      </form>
    </Modal>
  );
};
export default RenameChannelModal;
