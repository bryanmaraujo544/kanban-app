import styled from 'styled-components';

export const Container = styled.div`
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  .header {
    border-bottom: 0.1rem solid #ced4da;
    padding: 1.6rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .title {
      font-size: 2.8rem;
      color: #343a40;
      font-weight: 700;
    }

    button {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      border: 0;
      background: #ced4da;
      border-radius: 0.4rem;
      padding: 0.8rem 2rem;
      font-weight: 700;
      font-size: 1.4rem;
      transition: all 0.2s ease-in;

      &:hover {
        background: #adb5bd;
      }
    }
  }
`;

export const BoardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
  flex: 1;
  border-radius: 0.4rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 468px) {
    grid-template-columns: 1fr;
  }
`;

export const Board = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem;
  background: #ced4da;
  border-radius: 0.4rem;
  color: #343a40;

  .crown-icon {
    font-size: 2rem;
  }

  .admin-infos {
    display: flex;
    align-items: center;
    gap: 0.8rem;

    img {
      width: 2.8rem;
      height: 2.8rem;
      border-radius: 50%;
    }

    .admin-name {
      font-weight: 500;
      font-size: 1.4rem;
    }
  }

  .enter-icon {
    font-size: 2.4rem;
    cursor: pointer;
    transition: all 0.2s ease-in;

    &:hover {
      color: #212529;
    }
  }
`;
