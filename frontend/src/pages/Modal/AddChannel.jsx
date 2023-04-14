import { useFormik } from 'formik';
import * as yup from 'yup';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import React, { useRef, useEffect } from 'react';
import {
  Modal, Button, Form, FormGroup,
} from 'react-bootstrap';
// import { io } from 'socket.io-client';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useAuth from '../../hooks/authHooks';
import useSocket from '../../hooks/socketHook';

// const socket = io();

const AddChannelModal = (props) => {
  const { onHide } = props;
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channelReducer.channels);
  const channelNames = channels.map((i) => i.name);
  const notify = () => toast.success(t('notify.create'));

  const auth = useAuth();
  const socket = useSocket();

  const schema = yup.object().shape({
    channelName: yup.string()
      .min(3, t('error.minMaxSymbols'))
      .max(20, t('error.minMaxSymbols'))
      .required(t('error.required'))
      .notOneOf(channelNames, t('error.uniq'))
      .trim(t('error.required')),
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
        // socket.emit('newChannel', { name: values.channelName });
        socket.addChannel(values);
        auth.iAddedChannel();
        // setActive(!active);
        values.channelName = '';
        notify();
        onHide();
      } catch (error) {
        console.log('ERRROROROOR!!!!!!!!!!!', error);
      }
    },
  });

  const errClass = cn('mb-10 form-control', {
    'mb-10 form-control is-invalid': errors.channelName,
  });

  const inputRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 1);
  }, []);

  return (
    <Modal show centered className="modal-form">
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('interface.addChannel')}</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Modal.Footer>
            <Form.Control
              ref={inputRef}
              name=""
              id="channelName"
              className={errClass}
              value={values.channelName}
              onChange={handleChange}
            />
            <Form.Label className="visually-hidden" htmlFor="channelName">{t('interface.channelName')}</Form.Label>
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
export default AddChannelModal;
