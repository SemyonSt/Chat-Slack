import { Routes, Route } from 'react-router-dom';

import Errorpges from './pages/Errorpges';
import Logopages from './pages/Logopages';
import Registratepages from './pages/Regisrtatpages';


const App = () => (
  <div className="h-100">
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container"><a className="navbar-brand" href="/">Hexlet Chat</a></div>
        </nav>
        <Routes>
          <Route path="/" element={<Logopages />} />
          <Route path="/login" element={<Logopages />} />
          <Route path="/signup" element={<Registratepages />} />
          <Route path="*" element={<Errorpges />} />
        </Routes>
      </div>
      <div className="Toastify" />
    </div>
  </div>
);

export default App;
