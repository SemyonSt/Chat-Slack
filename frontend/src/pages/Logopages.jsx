import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Login from '../images/login.jpeg';


const schema = yup.object().shape({
  username: yup.string()
    .min(3, 'Name is short')
    .max(20, 'Name is long')
    .required('Required'),
  password: yup.string()
    .min(6, 'Password is to short')
    .required('Required'),
});

const Logopages = () => {
  const {
    values, errors, touched, handleBlur, handleChange, handleSubmit,
  } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: schema,
    validateOnChange: false,
    // eslint-disable-next-line no-shadow
    onSubmit: (values) => {
      // eslint-disable-next-line no-alert
      alert(JSON.stringify(values, null, 2));
    },
  });
  // console.log(errors)
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
                    required=""
                    placeholder="Ваш ник"
                    id="username"
                    onChange={handleChange}
                    value={values.username}
                    className={errors.username ? 'form-control is-invalid' : 'form-control'}
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
                    required=""
                    placeholder="Пароль"
                    type="password"
                    id="password"
                    onChange={handleChange}
                    value={values.password}
                    className={errors.password ? 'form-control is-invalid' : 'form-control'}
                  />
                  <div className="invalid-tooltip">Неверные имя пользователя или пароль</div>
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
