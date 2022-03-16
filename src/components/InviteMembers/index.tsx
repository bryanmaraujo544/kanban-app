import { useState, useEffect } from 'react';
import { GrFormClose } from 'react-icons/gr';
import { motion } from 'framer-motion';
import { AiOutlinePlus } from 'react-icons/ai';

import { Container } from './styles';
import { Modal } from '../Modal';
import api from '../../services/utils/ApiClient';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: any;
  setMembersInvited: any;
}

export const InviteMembers = ({
  isModalOpen,
  setIsModalOpen,
  setMembersInvited,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [memberEmail, setMemberEmail] = useState('');
  const [membersSelectedToInvite, setMembersSelectedToInvite] = useState(
    [] as any
  );
  const [membersFound, setMembersFound] = useState([] as any);

  console.log({ isLoading });

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      // const members = allUsers.filter((user) => user.email.includes(memberEmail));
      const { data } = await api.get(`/users/${memberEmail}`);
      setMembersFound(data.users);
      setIsLoading(false);
    })();
  }, [memberEmail]);

  function handleAddMemberToSelectedList(user: any) {
    const alreadySelected = membersSelectedToInvite.some(
      (member: any) => member.email === user.email
    );
    if (!alreadySelected) {
      setMembersSelectedToInvite((prev: any) => [...prev, user]);
    } else {
      window.alert('Already selected');
    }
  }

  function handleRemoveMemberFromSelectedList(email: string) {
    setMembersSelectedToInvite((prev: any) =>
      prev.filter((prevMember: any) => prevMember.email !== email)
    );
  }

  function handleInviteMembers() {
    if (membersSelectedToInvite.length === 0) {
      window.alert('Select someone');
      return;
    }
    setMembersInvited(membersSelectedToInvite);
    setIsModalOpen(false);
    setMembersSelectedToInvite([]);
    setMembersFound([]);
    setMemberEmail('');
  }

  return (
    <Modal
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      modalTitle="Search a member"
    >
      <Container className="search-container">
        <div className="members-selected">
          {membersSelectedToInvite?.map(({ name, email }: any) => (
            <div className="member-selected">
              {name}
              <GrFormClose
                className="icon"
                onClick={() => handleRemoveMemberFromSelectedList(email)}
              />
            </div>
          ))}
          <button
            type="button"
            className="invite-btn"
            onClick={handleInviteMembers}
          >
            Invite
          </button>
        </div>
        <input
          type="text"
          placeholder="Type the member email"
          value={memberEmail}
          onChange={(e) => setMemberEmail(e.target.value)}
        />
        <motion.div
          className="members-found"
          animate={{ display: memberEmail.length > 0 ? 'flex' : 'none' }}
        >
          {membersFound?.map((user: any) => (
            <div className="member">
              <div className="infos">
                <img src={user.photo_url} alt="member" />
                <div className="name-email">
                  <p className="name">{user.name}</p>
                  <p className="email">{user.email}</p>
                </div>
              </div>
              <AiOutlinePlus
                className="icon"
                onClick={() => handleAddMemberToSelectedList(user)}
              />
            </div>
          ))}
        </motion.div>
      </Container>
    </Modal>
  );
};
