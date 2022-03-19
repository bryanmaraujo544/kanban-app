import { AiFillCrown } from 'react-icons/ai';
import { IoEnter } from 'react-icons/io5';

import { Container, BoardsContainer, Board } from './styles';

export const Boards = () => (
  // console.log('boards');

  <Container>
    <header className="header">
      <h1 className="title">My Boards</h1>
    </header>
    <BoardsContainer>
      <Board className="board">
        <div className="admin-infos">
          <img
            src="https://media-exp1.licdn.com/dms/image/C4E03AQEJJ1GdZsPXXA/profile-displayphoto-shrink_200_200/0/1624297772968?e=1652918400&v=beta&t=VN4GKIbucL0uifgr4LoPZ8hgb7aF825cXPVPmHF-vZo"
            alt=""
          />
          <p className="admin-name">Bryan Martins</p>
          <AiFillCrown className="crown-icon" />
        </div>
        <IoEnter className="enter-icon" />
      </Board>
      <Board className="board">
        <div className="admin-infos">
          <img
            src="https://media-exp1.licdn.com/dms/image/C4E03AQEJJ1GdZsPXXA/profile-displayphoto-shrink_200_200/0/1624297772968?e=1652918400&v=beta&t=VN4GKIbucL0uifgr4LoPZ8hgb7aF825cXPVPmHF-vZo"
            alt=""
          />
          <p className="admin-name">Bryan Martins</p>
          <AiFillCrown className="crown-icon" />
        </div>
        <IoEnter className="enter-icon" />
      </Board>
    </BoardsContainer>
  </Container>
);
