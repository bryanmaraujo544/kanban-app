/* eslint-disable camelcase */
import { useEffect } from 'react';
import { parseCookies } from 'nookies';
import jwt_decode from 'jwt-decode';

import { useNavigate } from 'react-router-dom';
import { BoardContextProvider } from '../../contexts/BoardContext';
import { Container, Header } from './styles';
import { Board } from '../../components/Board';

interface User {
  id: number;
  name: string;
  profileImageUrl: string;
}

export const Home = () => {
  const cookies = parseCookies();
  const navigate = useNavigate();

  console.log(cookies.token);
  const user = jwt_decode(cookies.token) as User;
  console.log(user);

  useEffect(() => {
    if (!cookies.token) {
      navigate('/login');
    }
  }, []);
  return (
    <BoardContextProvider>
      <Container>
        <Header>
          <div className="user-infos">
            <p>{user?.name}</p>
            <img src={user?.profileImageUrl} alt="user profile" />
          </div>
          {/* <div className="right-actions">

          </div> */}
        </Header>
        <Board />
      </Container>
    </BoardContextProvider>
  );
};
