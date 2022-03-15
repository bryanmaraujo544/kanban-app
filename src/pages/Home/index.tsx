import { useEffect } from 'react';
import { parseCookies } from 'nookies';

import { useNavigate } from 'react-router-dom';
import { BoardContextProvider } from '../../contexts/BoardContext';
import { Container } from './styles';
import { Board } from '../../components/Board';

export const Home = () => {
  const cookies = parseCookies();
  const navigate = useNavigate();
  useEffect(() => {
    if (!cookies.token) {
      navigate('/login');
    }
  }, []);
  return (
    <BoardContextProvider>
      <Container>
        <Board />
      </Container>
    </BoardContextProvider>
  );
};
