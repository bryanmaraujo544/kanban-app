/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import jwt_decode from 'jwt-decode';

import { useNavigate } from 'react-router-dom';
import { BoardContextProvider } from '../../contexts/BoardContext';
import { Container } from './styles';
import { Board } from '../../components/Board';
import { InviteMembers } from '../../components/InviteMembers';
import { Header } from './Header';

interface User {
  id: number;
  name: string;
  profileImageUrl: string;
}

export const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [membersInvited, setMembersInvited] = useState([]);
  const [user, setUser] = useState({} as User);
  const [isLoading, setIsLoading] = useState(true);

  const cookies = parseCookies();
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.token) {
      navigate('/login');
      return;
    }

    setUser(jwt_decode(cookies.token));
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <BoardContextProvider>
      <Container>
        <Header
          membersInvited={membersInvited}
          user={user}
          setIsModalOpen={setIsModalOpen}
        />
        <Board />
        <InviteMembers
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setMembersInvited={setMembersInvited}
          membersInvited={membersInvited}
        />
      </Container>
    </BoardContextProvider>
  );
};
