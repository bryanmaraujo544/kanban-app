import { AiOutlinePlus } from 'react-icons/ai';
import { Container } from './styles';

interface Props {
  user: any;
  membersInvited: any[];
  setIsModalOpen: any;
}

export const Header = ({ user, membersInvited, setIsModalOpen }: Props) => {
  console.log('Header');

  function handleSearchMember() {
    setIsModalOpen(true);
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
      </div>
    </Container>
  );
};
