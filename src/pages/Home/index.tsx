/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import jwt_decode from 'jwt-decode';
import { AiOutlinePlus } from 'react-icons/ai';

import { useNavigate } from 'react-router-dom';
import { BoardContextProvider } from '../../contexts/BoardContext';
import { Container, Header } from './styles';
import { Board } from '../../components/Board';
import { InviteMembers } from '../../components/InviteMembers';

interface User {
  id: number;
  name: string;
  profileImageUrl: string;
}

export const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [membersInvited, setMembersInvited] = useState([]);

  const cookies = parseCookies();
  const navigate = useNavigate();
  const user = jwt_decode(cookies.token) as User;

  useEffect(() => {
    if (!cookies.token) {
      navigate('/login');
    }
  }, []);

  function handleSearchMember() {
    setIsModalOpen(true);
  }

  return (
    <BoardContextProvider>
      <Container>
        <Header>
          <div className="user-infos">
            <p>{user?.name}</p>
            <img src={user?.profileImageUrl} alt="user profile" />
          </div>
          <div className="right-actions">
            <div className="members">
              {membersInvited.map((member: any) => (
                <img alt="member" src={member.photo_url} />
              ))}
            </div>
            <button
              type="button"
              onClick={handleSearchMember}
              className="invite-member-btn"
            >
              <AiOutlinePlus className="icon" />
              Invite a Member
            </button>
          </div>
        </Header>
        <Board />
        <InviteMembers
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setMembersInvited={setMembersInvited}
        />
      </Container>
    </BoardContextProvider>
  );
};
