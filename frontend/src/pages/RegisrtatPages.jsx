import * as yup from 'yup';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Registration from '../images/registrate.jpg';


const schema = yup.object().shape({
  username: yup.string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('Обязательное поле'),
  password: yup.string()
    .min(6, 'Не менее 6 символов')
    .required('Обязательное поле'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
    .required('Обязательное поле'),
});

const Registratepages = () => {
  const navigate = useNavigate();
  const notify = () => toast.error('Ошибка сети');

  const {
    values, errors, touched, handleBlur, setSubmitting, handleChange, handleSubmit,
  } = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: schema,
    // eslint-disable-next-line no-shadow
    onSubmit: (values) => {
      axios.post('/api/v1/signup', { username: values.username, password: values.password })
        .then((response) => {
          const data = JSON.stringify(response.data);
          localStorage.clear();
          localStorage.setItem('userInfo', data);
          navigate('/');
        })
        .catch((err) => {
          if (err.message === 'Network Error') {
            return notify();
          }
          if (err.response.status === 409) {
            errors.username = 'Такой пользователь уже существует';
            return setSubmitting(false);
          }
          return setSubmitting(false);
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
                  alt="Регистрация"
                />
              </div>
              <form onSubmit={handleSubmit} className="w-50">
                <h1 className="text-center mb-4">Регистрация</h1>
                <div className="form-floating mb-3">
                  <input
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
                  >Имя пользователя
                  </label>
                  <div className="invalid-tooltip">{errors.username}</div>
                </div>
                <div className="form-floating mb-3">
                  <input
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
                    Пароль
                  </label>
                </div>
                <div className="form-floating mb-4">
                  <input
                    placeholder="Пароли должны совпадать"
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
                  >Подтвердите пароль
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-100 mb-3 btn btn-outline-primary btn-light"
                >
                  Зарегистрироваться
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


