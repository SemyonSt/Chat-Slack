import { useFormik } from 'formik';
import * as yup from 'yup';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import React, { useRef, useEffect } from 'react';
import {
  Modal, Button, Form, FormGroup,
} from 'react-bootstrap';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useApi from '../../hooks/apiHook';
import { actions as channelsActions } from '../../slices/channelsSlice';
import { actions as maodalsActions } from '../../slices/modalsSlice';

const AddChannelModal = () => {
  const apiChat = useApi();
  const dispatch = useDispatch();

  const onHide = () => dispatch(maodalsActions.hideModal());
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channelReducer.channels);
  const channelNames = channels.map((i) => i.name);
  const notify = () => toast.success(t('notify.create'));

  const schema = yup.object().shape({
    channelName: yup.string()
      .min(3, t('error.minMaxSymbols'))
      .max(20, t('error.minMaxSymbols'))
      .required(t('error.required'))
      .notOneOf(channelNames, t('error.uniq'))
      .trim(t('error.required')),
  });

  const {
    values, errors, handleChange, handleSubmit, setSubmitting, isSubmitting,
  } = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: schema,
    validateOnChange: false,
    errorToken: false,
    onSubmit: () => {
      setSubmitting(true);
      apiChat.addChannel(values)
        .then((response) => {
          console.log(response.id);
          dispatch(channelsActions.moveToChannel(response.id));
          values.channelName = '';
          notify();
          onHide();
        })
        .catch((error) => {
          console.log('ERRROROROOR!!!!!!!!!!!', error);
        })
        .finally(() => {
          setSubmitting(false); // сброс isLoading в false после завершения запроса
        });
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
          <Button className="btn-primary" variant="primary" disabled={isSubmitting} type="submit">{t('interface.submit')}</Button>
        </FormGroup>
      </form>

    </Modal>
  );
};
export default AddChannelModal;
