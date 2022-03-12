import { BoardContextProvider } from '../../contexts/BoardContext';
import { Container } from './styles';
import { Board } from '../../components/Board';

export const Home = () => {
  return (
    <BoardContextProvider>
      <Container>
        <Board />
      </Container>
    </BoardContextProvider>
  );
};
