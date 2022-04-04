import { useState } from 'react';
import { destroyCookie } from 'nookies';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { HiMenuAlt3 } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

import { Container, MemberImage, LogoutButtons } from './styles';
import { Modal } from '../../../components/Modal';

interface Props {
  user: any;
  collaborators: any[];
  setIsModalOpen: any;
}

interface User {
  id: number;
  name: string;
  email: string;
  photo_url: string;
}

interface Board {
  admin_id: number;
  user: User;
}
interface Member {
  id: number;
  user_id: number;
  user: User;
  board_id: number;
  board: Board;
}

export const Header = ({ user, collaborators, setIsModalOpen }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const navigate = useNavigate();
  const boardAdminId = collaborators[0].board.admin_id;

  function handleSearchMember() {
    setIsModalOpen(true);
  }

  async function handleLogout() {
    setIsLogoutModalOpen(false);
    await destroyCookie(null, 'token');
    navigate('/login');
  }

  async function handleOpenLogouModal() {
    setIsLogoutModalOpen(true);
  }

  function checkIfUserIsBoardAdmin({ userId, adminId }: any) {
    return userId === adminId;
  }

  return (
    <Container isMenuOpen={isMenuOpen}>
      <div className="user-infos">
        <p>{user?.name}</p>
        <img src={user?.profileImageUrl} alt="user profile" />
      </div>

      <HiMenuAlt3 className="menu-icon" onClick={() => setIsMenuOpen(true)} />
      <div className="right-actions">
        <AiOutlineClose
          className="close-menu"
          onClick={() => setIsMenuOpen(false)}
        />
        <div className="members">
          {collaborators?.map((member: Member) => (
            <MemberImage
              alt="member"
              src={member.user.photo_url}
              key={member.user.email}
              isAdmin={checkIfUserIsBoardAdmin({
                userId: member.user_id,
                adminId: member.board.admin_id,
              })}
            />
          ))}
        </div>
        {checkIfUserIsBoardAdmin({
          userId: user.id,
          adminId: boardAdminId,
        }) && (
          <button
            type="button"
            onClick={handleSearchMember}
            className="invite-member-btn"
          >
            <AiOutlinePlus className="icon" />
            Invite Members
          </button>
        )}
        <button
          type="button"
          className="my-boards"
          onClick={() => navigate('/')}
        >
          My Boards
        </button>
        <button
          type="button"
          className="logout-btn"
          onClick={handleOpenLogouModal}
        >
          <FiLogOut className="logout-icon" />
        </button>
      </div>
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
