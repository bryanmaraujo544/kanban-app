/* eslint-disable react/no-unused-prop-types */
import { useState, useEffect } from 'react';
import { GrFormClose } from 'react-icons/gr';
import { motion } from 'framer-motion';
import { AiOutlinePlus } from 'react-icons/ai';

import { Container, MembersFound, MemberFound } from './styles';
import { Modal } from '../Modal';
import api from '../../services/utils/ApiClient';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: any;
  setMembersInvited: any;
}

interface User {
  id: number;
  name: string;
  photo_url: string;
  email: string;
}

export const InviteMembers = ({
  isModalOpen,
  setIsModalOpen,
  setMembersInvited,
}: Props) => {
  const [allUsers, setAllUsers] = useState([]);
  const [, setIsLoading] = useState(false);
  const [memberEmail, setMemberEmail] = useState('');
  const [membersSelectedToInvite, setMembersSelectedToInvite] = useState(
    [] as any
  );
  const [membersFound, setMembersFound] = useState([] as any);

  useEffect(() => {
    (async () => {
      const {
        data: { users },
      } = await api.get('users');
      setAllUsers(users);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const members = allUsers.filter((user: User) =>
        user.email.includes(memberEmail)
      );

      setMembersFound(members);
      setIsLoading(false);
    })();
  }, [memberEmail]);

  function handleAddMemberToSelectedList(user: User) {
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
          {membersSelectedToInvite?.map(
            ({ name, email }: { name: string; email: string }) => (
              <div className="member-selected">
                {name}
                <GrFormClose
                  className="icon"
                  onClick={() => handleRemoveMemberFromSelectedList(email)}
                />
              </div>
            )
          )}
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
        <MembersFound
          as={motion.div}
          className="members-found"
          animate={{ display: memberEmail.length > 0 ? 'flex' : 'none' }}
        >
          {membersFound?.map((user: User) => (
            <MemberFound isSelected>
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
            </MemberFound>
          ))}
        </MembersFound>
      </Container>
    </Modal>
  );
};
