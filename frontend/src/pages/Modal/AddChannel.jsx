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
import 'react-toastify/dist/ReactToastify.css';

const socket = io();

const AddChannelModal = ({ active, setActive }) => {
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channelReduser.channels);
  const channelNames = channels.map((i) => i.name);
  const notify = () => toast.success(t('notify.create'));

  const schema = yup.object().shape({
    channelName: yup.string()
      .min(3, t('error.minMaxSymbols'))
      .max(20, t('error.minMaxSymbols'))
      .required(t('error.required'))
      .notOneOf(channelNames, t('error.uniq')),
  });

  const {
    values, errors, handleChange, handleSubmit,
  } = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: schema,
    validateOnChange: false,
    errorToken: false,
    onSubmit: () => {
      try {
        socket.emit('newChannel', { name: values.channelName });
        setActive(!active);
        values.channelName = '';
        notify();
      } catch (error) {
        console.log('ERRROROROOR!!!!!!!!!!!', error);
      }
    },
  });

  const errClass = cn('mb-10 form-control', {
    'mb-10 form-control is-invalid': errors.channelName,
  });

  const inputRef = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line functional/no-conditional-statements
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Modal show={active} centered className="modal-form">
      <Modal.Header closeButton onClick={() => setActive(false)}>
        <Modal.Title>{t('interface.addChannel')}</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            ref={inputRef}
            name="channelName"
            id="channelName"
            className={errClass}
            value={values.channelName}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.channelName}</div>
        </Form.Group>
        <FormGroup className="d-flex justify-content-end mt-3">
          <Button className="me-2 btn-secondary" variant="secondary" onClick={() => setActive(false)}>{t('interface.cancel')}</Button>
          <Button className="btn-primary" variant="primary" type="submit">{t('interface.submit')}</Button>
        </FormGroup>
      </form>
    </Modal>
  );
};
export default AddChannelModal;
