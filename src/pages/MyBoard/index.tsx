/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import jwt_decode from 'jwt-decode';

import { useNavigate, useParams } from 'react-router-dom';
import { BoardContextProvider } from '../../contexts/BoardContext';
import { Container } from './styles';
import { Board } from '../../components/Board';
import { InviteMembers } from '../../components/InviteMembers';
import { Header } from './Header';
import api from '../../services/utils/ApiClient';

interface User {
  id: number;
  name: string;
  profileImageUrl: string;
}

export const MyBoard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [membersInvited, setMembersInvited] = useState([]);
  const [user, setUser] = useState({} as User);
  const [isLoading, setIsLoading] = useState(true);
  const [collaborators, setCollaborators] = useState([]);

  const cookies = parseCookies();
  const navigate = useNavigate();
  const { boardId } = useParams();

  useEffect(() => {
    (async () => {
      if (!cookies.token) {
        navigate('/login');
        return;
      }
      const userDecoded = jwt_decode(cookies.token) as any;
      const {
        data: { collaborators },
      } = await api.get(`/collaborators/${boardId}`);
      setCollaborators(collaborators);

      const isOneOfMyBoards = collaborators.some(
        ({ user }: any) => user.id === userDecoded.id
      );

      if (!isOneOfMyBoards) {
        navigate('/');
      }

      setUser(userDecoded);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <p>.</p>;
  }

  return (
    <BoardContextProvider>
      <Container>
        <Header
          collaborators={collaborators}
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
