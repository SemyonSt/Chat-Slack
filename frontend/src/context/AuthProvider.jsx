import React, {
  useState, useMemo, useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';
import routes from '../routes';

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');

  const navigate = useNavigate();

  const logOut = useCallback(() => {
    localStorage.removeItem('userInfo');
    navigate(routes.logOut);
  }, [navigate]);

  const contextValue = useMemo(() => ({ token, setToken, logOut }), [token, setToken, logOut]);
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
