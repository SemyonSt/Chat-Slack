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

const RenameChannelModal = ({
  active, setActive, channelId, channelToRename,
}) => {
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channelReduser.channels);
  const channelNames = channels.map((i) => i.name);
  const notify = () => toast.success(t('notify.rename'));

  const schema = yup.object().shape({
    channelName: yup.string()
      .min(3, t('error.minMaxSymbols'))
      .max(20, t('error.minMaxSymbols'))
      .required(t('error.required'))
      .notOneOf(channelNames, t('error.uniq')),
  });
  // console.log('1234', channelToRename);

  const {
    values, errors, handleChange, handleSubmit,
  } = useFormik({
    initialValues: {
      channelName: channelToRename,
    },
    validationSchema: schema,
    validateOnChange: false,
    errorToken: false,
    onSubmit: () => {
      socket.emit('renameChannel', { id: channelId, name: values.channelName });
      setActive(!active);
      // values.channelName = '';
      notify();
    },
  });

  const errClass = cn('mb-2 form-control', {
    'mb-2 form-control is-invalid': errors.channelName,
  });


  const inputRef = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line functional/no-conditional-statements
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Modal show={active} centered>
      <Modal.Header closeButton onClick={() => setActive(false)}>
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
            <div className="invalid-feedback">{errors.channelName}</div>
          </Modal.Footer>
        </Form.Group>
        <FormGroup className="d-flex justify-content-end">
          <Button className="me-2 btn-secondary" variant="secondary" onClick={() => setActive(false)}>{t('interface.cancel')}</Button>
          <Button className="btn-primary" variant="primary" type="submit">{t('interface.submit')}</Button>
        </FormGroup>
      </form>
    </Modal>
  );
};
export default RenameChannelModal;
