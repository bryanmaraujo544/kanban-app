import { BoardContextProvider } from '../../contexts/BoardContext';
import { Board } from '../Board';
import { Container } from './styles';

function App() {
  return (
    <BoardContextProvider>
      <Container>
        <Board />
      </Container>
    </BoardContextProvider>
  );
}

export default App;
