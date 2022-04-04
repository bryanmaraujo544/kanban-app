import styled from 'styled-components';

interface MemberImageProps {
  isAdmin: boolean;
}

interface ContainerProps {
  isMenuOpen: boolean;
}

export const Container = styled.header<ContainerProps>`
  width: 100%;
  padding: 0 0 0 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .user-infos {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    p {
      font-size: 1.6rem;
      font-size: 500;
      font-weight: 700;
      color: #212529;
    }

    img {
      width: 3.2rem;
      height: 3.2rem;
      object-fit: cover;
      border-radius: 0.6rem;
    }
  }

  .menu-icon {
    display: none;
    font-size: 2.6rem;

    @media (max-width: 600px) {
      display: block;
    }
  }
  .right-actions {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    transition: all 0.2s linear;

    @media (max-width: 600px) {
      flex-direction: column;
      position: absolute;
      right: ${({ isMenuOpen }) => (isMenuOpen ? '0' : '-100%')};
      top: 0;
      padding: 3.2rem 2.4rem;
      height: 100vh;
      background: #fff;
    }

    .close-menu {
      display: none;
      align-self: flex-start;
      font-size: 2rem;
      margin-top: -0.8rem;
      margin-bottom: 0.8rem;

      @media (max-width: 600px) {
        display: block;
      }
    }

    .members {
      display: flex;
      justify-content: center;
      gap: 0.4rem;

      @media (max-width: 600px) {
        width: 100%;
        justify-content: space-between;
      }
    }

    .invite-member-btn {
      border: 0;
      background: #ced4da;
      color: #495057;
      border-radius: 0.4rem;
      font-size: 1.1rem;
      font-weight: 700;
      padding: 0.8rem;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      transition: all 0.2s ease-in;

      &:hover {
        background: #adb5bd;
      }

      @media (max-width: 600px) {
        width: 100%;
        margin-top: 0.8rem;
      }

      .icon {
        font-size: 1.6rem;
      }
    }

    .my-boards {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      border-radius: 0.4rem;
      font-size: 1.1rem;
      font-weight: 700;
      padding: 0.8rem;
      background: #ced4da;
      color: #495057;
      border: 0;
      transition: all 0.2s ease-in;

      &:hover {
        background: #adb5bd;
      }

      @media (max-width: 600px) {
        width: 100%;
      }
    }

    .logout-btn {
      border: none;
      background: none;

      @media (max-width: 600px) {
        margin-top: 0.8rem;
      }

      .logout-icon {
        font-size: 2.2rem;
        transition: all 0.2s ease-in;

        &:hover {
          color: #495057;
        }
      }
    }
  }
`;

export const MemberImage = styled.img<MemberImageProps>`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  position: relative;
  object-fit: cover;
  border: ${({ isAdmin }) => (isAdmin ? '3px solid #ffc300' : '0')};
`;
