import * as yup from 'yup';

import React, { useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import Registration from '../images/registrate.jpg';
import useAuth from '../hooks/authHooks';
import routes from '../routes';

const Registratepages = () => {
  const { t } = useTranslation();

  const schema = yup.object().shape({
    username: yup.string()
      .min(3, t('error.minMaxSymbols'))
      .max(20, t('error.minMaxSymbols'))
      .required(t('error.required')),
    password: yup.string()
      .min(6, t('error.min'))
      .required(t('error.required')),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], t('error.passwordMismatch'))
      .required(t('error.required')),
  });

  // Добавление фокусов на инпуты
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
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
  const auth = useAuth();

  const {
    values, errors, touched, handleBlur, setSubmitting, isSubmitting, handleChange, handleSubmit,
  } = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: schema,
    // eslint-disable-next-line no-shadow
    onSubmit: (values) => {
      setSubmitting(true);
      axios.post(routes.creatNewUser(), { username: values.username, password: values.password })
        .then((response) => {
          auth.logIn(response);
        })
        .catch((err) => {
          if (err.message === 'Network Error') {
            return toast.error(t('error.networkError'));
          }
          if (err.response.status === 409) {
            errors.username = t('error.alreadyExists');
            return setSubmitting(false);
          }
          if (err.response.status === 500) {
            toast.error(t('error.serverError'));
          }
          return setSubmitting(false);
        })
        .finally(() => {
          setSubmitting(false); // сброс isLoading в false после завершения запроса
        });
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div
              className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5"
            >
              <div>
                <img
                  src={Registration}
                  className="rounded-circle"
                  alt={t('regisrtatePages.registration')}
                />
              </div>
              <form onSubmit={handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{t('regisrtatePages.registration')}</h1>
                <div className="form-floating mb-3">
                  <input
                    ref={usernameRef}
                    onKeyDown={(event) => handleKeyDown(event, passwordRef)}
                    placeholder="От 3 до 20 символов"
                    name="username"
                    autoComplete="username"
                    required=""
                    id="username"
                    onBlur={handleBlur}
                    className={errors.username && touched.username ? 'form-control is-invalid' : 'form-control'}
                    onChange={handleChange}
                    value={values.username}

                  />
                  <label
                    className="form-label"
                    htmlFor="username"
                  >
                    {t('regisrtatePages.username')}
                  </label>
                  <div className="invalid-tooltip">{errors.username}</div>
                </div>
                <div className="form-floating mb-3">
                  <input
                    ref={passwordRef}
                    onKeyDown={(event) => handleKeyDown(event, confirmPasswordRef)}
                    placeholder="Не менее 6 символов"
                    name="password"
                    aria-describedby="passwordHelpBlock"
                    required=""
                    autoComplete="new-password"
                    type="password"
                    id="password"
                    onBlur={handleBlur}
                    className={errors.password && touched.password ? 'form-control is-invalid' : 'form-control'}
                    onChange={handleChange}
                    value={values.password}
                  />
                  <div className="invalid-tooltip">{errors.password}</div>
                  <label
                    className="form-label"
                    htmlFor="password"
                  >
                    {t('regisrtatePages.password')}
                  </label>
                </div>
                <div className="form-floating mb-4">
                  <input
                    disabled={isSubmitting}
                    ref={confirmPasswordRef}
                    onKeyDown={(event) => handleKeyDown(event, btnRef)}
                    placeholder={t('error.passwordMismatch')}
                    name="confirmPassword"
                    required=""
                    autoComplete="new-password"
                    type="password"
                    id="confirmPassword"
                    onBlur={handleBlur}
                    className={errors.confirmPassword && touched.confirmPassword ? 'form-control is-invalid' : 'form-control'}
                    onChange={handleChange}
                    value={values.confirmPassword}
                  />
                  <div className="invalid-tooltip">{errors.confirmPassword}</div>
                  <label
                    className="form-label"
                    htmlFor="confirmPassword"
                  >
                    {t('regisrtatePages.confirmPassword')}
                  </label>
                </div>
                <button
                  disabled={isSubmitting}
                  ref={btnRef}
                  type="submit"
                  className="w-100 mb-3 btn btn-outline-primary btn-light"
                  onClick={handleSubmit}
                >
                  {t('regisrtatePages.registerButton')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registratepages;
