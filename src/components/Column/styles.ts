import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  /* flex: 1; */
  min-width: 30rem;
  padding: 2.4rem;
  background: #fff;
  border-radius: 0.4rem;

  .header {
    display: flex;
    justify-content: space-between;

    .add-icon {
      font-size: 2.4rem;
      color: #0f013c;
      cursor: pointer;
      transition: color 0.2s linear;

      &:hover {
        color: #7a52fc;
      }
    }
  }
`;

export const TasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;
