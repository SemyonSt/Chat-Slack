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
    navigate(routes.logOut);
  }, [navigate]);

  const iAddedChannel = useCallback(() => {
    localStorage.setItem('userDo', 'Im');
  }, []);

  const contextValue = useMemo(() => ({
    token,
    setToken,
    logOut,
    logIn,
    iAddedChannel,
  }), [token, setToken, logOut, logIn, iAddedChannel]);
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
