import { useFormik } from 'formik';
import * as yup from 'yup';
import cn from 'classnames';

import React from 'react';
import {
  Modal, Button, Form,
} from 'react-bootstrap';
import { io } from 'socket.io-client';

const socket = io();

const schema = yup.object().shape({
  channelName: yup.string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('Обязательное поле'),
});


const AddChannelModal = ({ active, setActive }) => {
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
      socket.emit('newChannel', { name: values.channelName });
      setActive(!active);
    },
  });

  const errClass = cn('mb-2 form-control', {
    'mb-2 form-control is-invalid': errors.channelName,
  });


  return (
    <Modal show={active} centered>
      <Modal.Header closeButton onClick={() => setActive(false)}>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <input name="channelName" id="channelName" className={errClass} value={values.channelName} onChange={handleChange} onBlur={handleBlur} />
          <div className="invalid-feedback">{errors.channelName}</div>
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={() => setActive(false)}>Отменить</Button>
          <Button variant="primary" type="submit">Отправить</Button>
        </div>

      </form>
    </Modal>
  );
};
export default AddChannelModal;
