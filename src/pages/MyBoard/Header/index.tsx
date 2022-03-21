import { destroyCookie } from 'nookies';
import { AiOutlinePlus } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Container } from './styles';

interface Props {
  user: any;
  membersInvited: any[];
  setIsModalOpen: any;
}

export const Header = ({ user, membersInvited, setIsModalOpen }: Props) => {
  const navigate = useNavigate();
  function handleSearchMember() {
    setIsModalOpen(true);
  }

  async function handleLogout() {
    await destroyCookie(null, 'token');
    navigate('/login');
  }

  return (
    <Container>
      <div className="user-infos">
        <p>{user?.name}</p>
        <img src={user?.profileImageUrl} alt="user profile" />
      </div>
      <div className="right-actions">
        <div className="members">
          {membersInvited?.map((member: any) => (
            <img alt="member" src={member.photo_url} key={member.email} />
          ))}
        </div>
        <button
          type="button"
          onClick={handleSearchMember}
          className="invite-member-btn"
        >
          <AiOutlinePlus className="icon" />
          Invite Members
        </button>
        <button
          type="button"
          className="my-boards"
          onClick={() => navigate('/')}
        >
          My Boards
        </button>
        <button type="button" className="logout-btn" onClick={handleLogout}>
          <FiLogOut className="logout-icon" />
        </button>
      </div>
    </Container>
  );
};
