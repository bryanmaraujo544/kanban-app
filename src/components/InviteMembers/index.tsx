/* eslint-disable react/no-unused-prop-types */
import { useState, useEffect, useContext } from 'react';
import { GrFormClose } from 'react-icons/gr';
import { motion } from 'framer-motion';
import { AiOutlinePlus } from 'react-icons/ai';
import jwtDecode from 'jwt-decode';

import { toast } from 'react-toastify';
import { parseCookies } from 'nookies';
import { Container, MembersFound, MemberFound } from './styles';
import { Modal } from '../Modal';
import api from '../../services/utils/ApiClient';
import { BoardContext } from '../../contexts/BoardContext';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: any;
  setMembersInvited: any;
  membersInvited: any[];
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
  membersInvited,
}: Props) => {
  const [allUsers, setAllUsers] = useState([]);
  const [, setIsLoading] = useState(false);
  const [memberEmail, setMemberEmail] = useState('');
  const [membersSelectedToInvite, setMembersSelectedToInvite] = useState(
    [] as any
  );
  const [membersFound, setMembersFound] = useState([] as any);
  const { boardInfos } = useContext(BoardContext);

  const cookies = parseCookies();
  const adminUser = jwtDecode(cookies?.token) as any;

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
      const members = allUsers.filter(
        (user: User) =>
          user.email.includes(memberEmail) && user.id !== adminUser.id
      );

      setMembersFound(members);
      setIsLoading(false);
    })();
  }, [memberEmail]);

  function handleAddMemberToSelectedList(user: User) {
    const alreadySelected = membersSelectedToInvite.some(
      (member: any) => member.email === user.email
    );

    const alreadyInvited = membersInvited.some(
      (member: any) => member.email === user.email
    );

    if (alreadyInvited) {
      toast.warning('You already invited this user');
      return;
    }

    if (alreadySelected) {
      toast.error('You already selected this user');
      return;
    }
    setMembersSelectedToInvite((prev: any) => [...prev, user]);
  }

  function handleRemoveMemberFromSelectedList(email: string) {
    setMembersSelectedToInvite((prev: any) =>
      prev.filter((prevMember: any) => prevMember.email !== email)
    );
  }

  function handleInviteMembers() {
    if (membersSelectedToInvite.length === 0) {
      toast.warning('Select someone!');
      return;
    }
    setMembersInvited(membersSelectedToInvite);

    // Say to server that a member was invited

    // Storage in collaborators table the members invited to this board
    // and in server emit an members invited action and in client receive this
    // action and show the notification if the id is equal to the id in invitation
    membersSelectedToInvite.forEach(async (member: User) => {
      await api.post('/collaborators', {
        userId: member.id,
        boardId: boardInfos.id,
      });
    });

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
              <div className="member-selected" key={`list-${email}`}>
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
            <MemberFound isSelected key={`found-${user.email}`}>
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
