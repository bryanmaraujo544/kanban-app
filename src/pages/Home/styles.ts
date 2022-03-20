import styled from 'styled-components';

export const Container = styled.div`
  padding: 3.2rem;
  background: #f0ecfe;
  min-height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const Header = styled.header`
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

  .right-actions {
    display: flex;
    align-items: center;
    gap: 1.6rem;

    .members {
      display: flex;
      gap: 0.4rem;

      img {
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
        position: relative;
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

      .icon {
        font-size: 1.6rem;
      }
    }
  }
`;

export const SearchContainer = styled.div``;
