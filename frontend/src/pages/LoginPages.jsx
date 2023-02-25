import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
// import { Redirect } from 'react-router';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import Login from '../images/login.jpeg';
import routes from '../routes';
import AuthContext from '../context/AuthContext';

const schema = yup.object().shape({
  username: yup.string()
    .min(3, 'Name is short')
    .max(20, 'Name is long')
    .required('Required'),
  password: yup.string()
    .min(5, 'Password is to short')
    .required('Required'),
});

const Logopages = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  const {
    values, errors, handleBlur, handleChange, handleSubmit,
  } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: schema,
    validateOnChange: false,
    errorToken: false,
    onSubmit: async () => {
      await axios.post(routes.login(), { username: values.username, password: values.password })
        .then((response) => {
          // console.log('POST Data', response.data);
          localStorage.clear();
          localStorage.setItem('token', response.data.token);
          navigate('/');
          setToken(response.data);
          // console.log('!!!!!!!!!!!!!!!!!!!!', token);
        })
        .catch((err) => {
          // console.log('ERRRROR', err);
          // eslint-disable-next-line functional/no-conditional-statements
          if (err.response.status === 401) {
            errors.password = 'Неверные имя пользователя или пароль';
          }
        });
    },
  });

  const errClass = cn('form-control', {
    'form-control is-invalid': errors.password || errors.username,
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
                  alt="Войти"
                />
              </div>
              <form onSubmit={handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">Войти</h1>
                <div className="form-floating mb-3">
                  <input
                    name="username"
                    autoComplete="username"
                    onBlur={handleBlur}
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
                    Ваш ник
                  </label>
                </div>
                <div className="form-floating mb-4">
                  <input
                    name="password"
                    autoComplete="current-password"
                    onBlur={handleBlur}
                    required=""
                    placeholder="Пароль"
                    type="password"
                    id="password"
                    onChange={handleChange}
                    value={values.password}
                    className={errClass}
                  />
                  <div className="invalid-tooltip">{errors.password}</div>
                  <label
                    className="form-label"
                    htmlFor="password"
                  >
                    Пароль
                  </label>
                </div>
                <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
              </form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center"><span>Нет аккаунта?</span>
                <a href="/signup">Регистрация</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logopages;
