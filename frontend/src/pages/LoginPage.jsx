import React, {
  useRef, useEffect, useState,
} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
// import { Redirect } from 'react-router';
// import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

import {
  Button, Form,
} from 'react-bootstrap';

import Login from '../images/login.jpeg';
import routes from '../routes';
import useAuth from '../hooks/authHooks';

const Logopages = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const notifyNetworkError = () => toast.error(t('error.networkError'));
  const notifyServerError = () => toast.error(t('error.serverError'));

  const [error, setError] = useState('');

  const schema = yup.object().shape({
    username: yup
      .string(),
    password: yup
      .string(),
  });

  // Добавление фокусов на инпуты
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  // Прослушиватель событий при нажатии на клавиатуру
  // eslint-disable-next-line consistent-return
  const handleKeyDown = (event, ref) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      return ref.current.focus();
    }
  };

  const {
    values, errors, setSubmitting, isSubmitting, handleChange, handleSubmit,
  } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: schema,
    validateOnChange: false,
    errorToken: false,
    onSubmit: () => {
      setSubmitting(true);
      axios.post(routes.login(), { username: values.username, password: values.password })
        .then((response) => {
          auth.logIn(response);
        })
        .catch((err) => {
          if (err.message === 'Network Error') {
            return notifyNetworkError();
          }
          if (err.response.status === 401) {
            setError(t('error.invalidNameOrPass'));
            return setSubmitting(false);
          }
          if (err.response.status === 500) {
            notifyServerError();
          }
          return setSubmitting(false);
        })
        .finally(() => {
          setSubmitting(true);
        });
    },
  });

  const errClass = cn('form-control', {
    'form-control is-invalid': (errors.password) || (errors.username) || error,
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={Login}
                  className="rounded-circle"
                  alt={t('loginPages.entrance')}
                />
              </div>
              <form onSubmit={handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <Form.Group>
                  <h1 className="text-center mb-4">{t('loginPages.entrance')}</h1>
                  <div className="form-floating mb-3">
                    <Form.Control
                      ref={usernameRef}
                      onKeyDown={(event) => handleKeyDown(event, passwordRef)}
                      name="username"
                      autoComplete="username"
                      required=""
                      placeholder="Ваш ник"
                      id="username"
                      onChange={handleChange}
                      value={values.username}
                      className={errClass}
                    />
                    <label
                      htmlFor="username"
                    >
                      {t('loginPages.nickname')}
                    </label>
                  </div>
                  <div className="form-floating mb-4">
                    <Form.Control
                      ref={passwordRef}
                      onKeyDown={(event) => handleKeyDown(event, btnRef)}
                      name="password"
                      autoComplete="current-password"
                      required=""
                      placeholder={t('loginPages.password')}
                      type="password"
                      id="password"
                      onChange={handleChange}
                      value={values.password}
                      className={errClass}
                    />
                    <div className="invalid-tooltip">{error}</div>
                    <label
                      className="form-label"
                      htmlFor="password"
                    >
                      {t('loginPages.password')}
                    </label>
                  </div>
                  <Button
                    disabled={isSubmitting}
                    ref={btnRef}
                    type="submit"
                    className="w-100 mb-3 btn btn-primary"
                    onClick={() => usernameRef.current.focus()}
                  >
                    {t('loginPages.entrance')}
                  </Button>
                </Form.Group>
              </form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>
                  {t('loginPages.noAccount')}
                  {' '}
                </span>
                <a href="/signup">{t('loginPages.registration')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logopages;
