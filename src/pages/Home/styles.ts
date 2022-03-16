import styled from 'styled-components';

export const Container = styled.div`
  padding: 4.8rem;
  background: #f0ecfe;
  min-height: 100vh;
  height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export const Header = styled.header`
  width: 100%;
  padding: 0 2.4rem;
  display: flex;
  justify-content: space-between;

  .user-infos {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    p {
      font-size: 1.6rem;
      font-size: 500;
    }

    img {
      width: 3.6rem;
      height: 3.6rem;
      object-fit: cover;
      border-radius: 0.4rem;
    }
  }

  .right-actions {
    display: flex;
    gap: 1.6rem;

    .members {
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

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  .members-selected {
    display: flex;
    align-items: center;
    gap: 0.8rem;

    .member-selected {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      height: 3rem;
      background: #dee2e6;
      color: #495057;
      border-radius: 0.4rem;
      padding: 0 0.6rem;
      font-size: 1.2rem;
      font-weight: 500;
    }

    .invite-btn {
      border: none;
      background: #00a8e8;
      height: 3rem;
      padding: 0 1.6rem;
      border-radius: 0.4rem;
      font-size: 1.2rem;
      color: #fff;
      font-weight: 700;
    }
  }

  input {
    background: #e9ecef;
    border: 0;
    height: 3.6rem;
    padding: 0 0.8rem;
    border-radius: 0.4rem;
    font-size: 1.2rem;
    font-weight: 500;
    color: #495057;
  }

  .members-found {
    background: #e9ecef;
    padding: 0.8rem;
    border-radius: 0.4rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    max-height: 15rem;
    overflow-y: scroll;

    .member {
      background: #fff;
      border-radius: 0.4rem;
      padding: 1.2rem;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .infos {
        display: flex;
        align-items: center;
        gap: 1.2rem;

        img {
          width: 3.2rem;
          height: 3.2rem;
          border-radius: 50%;
        }

        .name {
          font-size: 1.4rem;
          font-weight: 700;
          color: #495057;
        }

        .email {
          font-size: 1.2rem;
          font-weight: 500;
          color: #6c757d;
        }
      }

      .icon {
        font-size: 2rem;
        color: #6c757d;
      }
    }
  }
`;
