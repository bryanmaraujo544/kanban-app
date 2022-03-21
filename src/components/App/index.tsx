// import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import io from 'socket.io-client';
import { StyledToastContainer } from '../StyledToastContainer';
import 'react-toastify/dist/ReactToastify.css';

import { Home } from '../../pages/Home';
import { Register } from '../../pages/Register';
import { Login } from '../../pages/Login';
import { Boards } from '../../pages/Boards';

const socket = io('http://localhost:5000');

function App() {
  console.log(socket);
  useEffect(() => {
    console.log('oi');
  }, []);
  return (
    <>
      <StyledToastContainer
        autoClose={2000}
        pauseOnHover={false}
        draggable
        closeOnClick={false}
        position="top-center"
      />
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/boards" element={<Boards />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
