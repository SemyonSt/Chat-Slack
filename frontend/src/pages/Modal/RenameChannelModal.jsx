import { useFormik } from 'formik';
import * as yup from 'yup';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import React, { useRef } from 'react';
import {
  Modal, Button, Form,
} from 'react-bootstrap';

import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

const socket = io();

const RenameChannelModal = ({ active, setActive, channelId }) => {
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channelReduser.channels);
  const channelNames = channels.map((i) => i.name);
  const notify = () => toast.success('Канал переименован');

  const schema = yup.object().shape({
    channelName: yup.string()
      .min(3, t('error.minMaxSymbols'))
      .max(20, t('error.minMaxSymbols'))
      .required(t('error.required'))
      .notOneOf(channelNames, t('error.uniq')),
  });

  const {
    values, errors, handleBlur, handleChange, handleSubmit,
  } = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: schema,
    validateOnChange: false,
    errorToken: false,
    onSubmit: () => {
      socket.emit('renameChannel', { id: channelId, name: values.channelName });
      setActive(!active);
      values.channelName = '';
      notify();
    },
  });

  const errClass = cn('mb-2 form-control', {
    'mb-2 form-control is-invalid': errors.channelName,
  });


  const inputRef = useRef(null);

  const handleShowModal = () => {
    inputRef.current.focus();
  };

  return (
    <Modal show={active} centered onShow={handleShowModal}>
      <Modal.Header closeButton onClick={() => setActive(false)}>
        <Modal.Title>{t('interface.renameChannel')}</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <input
            ref={inputRef}
            name="channelName"
            id="channelName"
            className={errClass}
            value={values.channelName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className="invalid-feedback">{errors.channelName}</div>
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={() => setActive(false)}>{t('interface.cancel')}</Button>
          <Button variant="primary" type="submit">{t('interface.submit')}</Button>
        </div>
      </form>
    </Modal>
  );
};
export default RenameChannelModal;
