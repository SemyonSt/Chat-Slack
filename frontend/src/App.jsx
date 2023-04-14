import React from 'react';
import { Provider } from 'react-redux';
import { ErrorBoundary } from '@rollbar/react';

import AuthProvider from './context/AuthProvider';

import Main from './pages/Main';

import store from './slices/index';

const App = () => (

  <ErrorBoundary>
    <Provider store={store}>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </Provider>
  </ErrorBoundary>

);
export default App;
