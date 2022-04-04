/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import { AiFillCrown } from 'react-icons/ai';
import { IoEnter } from 'react-icons/io5';
import { FiLogOut } from 'react-icons/fi';
import jwt_decode from 'jwt-decode';
import { destroyCookie, parseCookies } from 'nookies';

import { useNavigate } from 'react-router-dom';
import api from '../../services/utils/ApiClient';

import { Container, BoardsContainer, Board, LogoutButtons } from './styles';
import { Modal } from '../../components/Modal';

interface BoardAdmin {
  id: number;
  email: string;
  photo_url: string;
  name: string;
}
interface BoardProps {
  id: number;
  admin_id: number;
  user: BoardAdmin;
}
interface MyBoard {
  id: number;
  user_id: number;
  board_id: number;
  board: BoardProps;
}

export const Home = () => {
  const [, setUser] = useState({} as any);
  const [myBoards, setMyBoards] = useState([]);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const cookies = parseCookies();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (!cookies.token) {
        navigate('/login');
      }
      const userDecoded = jwt_decode(cookies.token) as any;
      const { data } = await api.get(`/collaborators/board/${userDecoded.id}`);
      setMyBoards(data);
      setUser(userDecoded);
    })();
  }, []);

  async function handleLogout() {
    setIsLogoutModalOpen(false);
    await destroyCookie(null, 'token');
    navigate('/login');
  }

  async function handleOpenLogouModal() {
    setIsLogoutModalOpen(true);
  }

  return (
    <Container>
      <header className="header">
        <h1 className="title">My Boards</h1>
        <button
          type="button"
          className="logout-btn"
          onClick={handleOpenLogouModal}
        >
          <FiLogOut className="logout-icon" />
          Logout
        </button>
      </header>
      <BoardsContainer>
        {myBoards.map((myBoard: MyBoard) => (
          <Board className="board">
            <div className="admin-infos">
              <img src={myBoard.board.user.photo_url} alt="" />
              <p className="admin-name">{myBoard.board.user.name}</p>
              <AiFillCrown className="crown-icon" />
            </div>
            <IoEnter
              className="enter-icon"
              onClick={() => navigate(`/board/${myBoard.board_id}`)}
            />
          </Board>
        ))}
      </BoardsContainer>
      <Modal
        isOpen={isLogoutModalOpen}
        modalTitle="Do you want logout?"
        setIsOpen={setIsLogoutModalOpen}
      >
        <LogoutButtons>
          <button type="button" onClick={handleLogout}>
            Yes
          </button>
          <button type="button" onClick={() => setIsLogoutModalOpen(false)}>
            No
          </button>
        </LogoutButtons>
      </Modal>
    </Container>
  );
};
