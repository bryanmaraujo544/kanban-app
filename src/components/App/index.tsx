// import { ToastContainer } from 'react-toastify';
import { StyledToastContainer } from '../StyledToastContainer';
import 'react-toastify/dist/ReactToastify.css';

import { BoardContextProvider } from '../../contexts/BoardContext';
import { Board } from '../Board';
import { Container } from './styles';

function App() {
  return (
    <BoardContextProvider>
      <StyledToastContainer
        autoClose={2000}
        pauseOnHover={false}
        draggable
        closeOnClick={false}
        position="top-center"
      />
      <Container>
        <Board />
      </Container>
    </BoardContextProvider>
  );
}

export default App;
