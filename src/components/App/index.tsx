// import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import io from 'socket.io-client';
import { StyledToastContainer } from '../StyledToastContainer';
import 'react-toastify/dist/ReactToastify.css';

import { Home } from '../../pages/Home';
import { Register } from '../../pages/Register';
import { Login } from '../../pages/Login';
import { MyBoard } from '../../pages/MyBoard';

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
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/board/:boardId" element={<MyBoard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
