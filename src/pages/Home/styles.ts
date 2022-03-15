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
`;
