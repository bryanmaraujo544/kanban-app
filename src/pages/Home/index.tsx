/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import jwt_decode from 'jwt-decode';
import { AiOutlinePlus } from 'react-icons/ai';
import { GrFormClose } from 'react-icons/gr';

import { useNavigate } from 'react-router-dom';
import { BoardContextProvider } from '../../contexts/BoardContext';
import { Container, Header, SearchContainer } from './styles';
import { Board } from '../../components/Board';
import { Modal } from '../../components/Modal';

interface User {
  id: number;
  name: string;
  profileImageUrl: string;
}

export const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
              <img
                alt="member"
                src="https://avatars.githubusercontent.com/u/62571814?v=4"
              />
              <img
                alt="member"
                src="https://avatars.githubusercontent.com/u/62571814?v=4"
              />
              <img
                alt="member"
                src="https://avatars.githubusercontent.com/u/62571814?v=4"
              />
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
        <Modal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          modalTitle="Search a member"
        >
          <SearchContainer className="search-container">
            <div className="members-selected">
              <div className="member-selected">
                Henrique
                <GrFormClose className="icon" />
              </div>
              <button type="button" className="invite-btn">
                Invite
              </button>
            </div>
            <input type="text" placeholder="Type the member email" />
            <div className="members-found">
              <div className="member">
                <div className="infos">
                  <img
                    src="https://avatars.githubusercontent.com/u/62571814?v=4"
                    alt="member"
                  />
                  <div className="name-email">
                    <p className="name">Bryan Martins</p>
                    <p className="email">bryan.araujo4@etec.com</p>
                  </div>
                </div>
                <AiOutlinePlus className="icon" />
              </div>
              <div className="member">
                <div className="infos">
                  <img
                    src="https://avatars.githubusercontent.com/u/62571814?v=4"
                    alt="member"
                  />
                  <div className="name-email">
                    <p className="name">Bryan Martins</p>
                    <p className="email">bryan.araujo4@etec.com</p>
                  </div>
                </div>
                <AiOutlinePlus className="icon" />
              </div>
              <div className="member">
                <div className="infos">
                  <img
                    src="https://avatars.githubusercontent.com/u/62571814?v=4"
                    alt="member"
                  />
                  <div className="name-email">
                    <p className="name">Bryan Martins</p>
                    <p className="email">bryan.araujo4@etec.com</p>
                  </div>
                </div>
                <AiOutlinePlus className="icon" />
              </div>
            </div>
          </SearchContainer>
        </Modal>
      </Container>
    </BoardContextProvider>
  );
};
