// import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StyledToastContainer } from '../StyledToastContainer';
import 'react-toastify/dist/ReactToastify.css';
import { Home } from '../../pages/Home';
import { Register } from '../../pages/Register';
import { Login } from '../../pages/Login';
import { Boards } from '../../pages/Boards';

function App() {
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
