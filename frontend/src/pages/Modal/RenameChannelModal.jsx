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
import useApi from '../../hooks/apiHook';
import { actions as maodalsActions } from '../../slices/modalsSlice';

const RenameChannelModal = () => {
  const apiChat = useApi();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const onHide = () => dispatch(maodalsActions.hideModal());
  const modalInfo = useSelector((state) => state.modalsReducer.setModalInfo);
  const channelId = modalInfo.item;
  const channels = useSelector((state) => state.channelReducer.channels);
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
    values, errors, handleChange, handleSubmit, setSubmitting, isSubmitting,
  } = useFormik({
    initialValues: {
      channelName: channelToRename ? channelToRename.name : '',
    },
    validationSchema: schema,
    validateOnChange: false,
    errorToken: false,
    onSubmit: () => {
      setSubmitting(true);
      apiChat.renameChannel(channelId, values)
        .then(() => {
          onHide();
          notify();
        })
        .catch((error) => {
          console.log('ERRROROROOR!!!!!!!!!!!', error);
        }).finally(() => {
          setSubmitting(false); // сброс isLoading в false после завершения запроса
        });
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
export default RenameChannelModal;
