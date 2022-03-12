// import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StyledToastContainer } from '../StyledToastContainer';
import 'react-toastify/dist/ReactToastify.css';
import { Home } from '../../pages/Home';
import { Register } from '../../pages/Register';
import { Login } from '../../pages/Login';

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
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
