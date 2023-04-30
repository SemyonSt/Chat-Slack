import React, {
  useState, useMemo, useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';
import routes from '../routes';

const AuthProvider = ({ children }) => {
  const initialState = JSON.parse(localStorage.getItem('userInfo'));
  const [token, setToken] = useState(initialState ?? null);

  const navigate = useNavigate();

  const logIn = useCallback((response) => {
    const data = JSON.stringify(response.data);
    localStorage.clear();
    localStorage.setItem('userInfo', data);
    setToken(data);
    navigate('/');
  }, [navigate]);

  const logOut = useCallback(() => {
    localStorage.removeItem('userInfo');
    navigate(routes.logIn);
  }, [navigate]);

  const contextValue = useMemo(() => ({
    token,
    setToken,
    logOut,
    logIn,
  }), [token, setToken, logOut, logIn]);
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
