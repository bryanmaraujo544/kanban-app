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

export const TextArea = styled.textarea`
  resize: vertical;
  font-size: 1.8rem;
  color: #343a40;
  padding: 0.8rem;
  border: 0.1rem solid #adb5bd;
  border-radius: 0.4rem;
  min-height: 7.2rem;
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-top: 0.8rem;

  .modal-btn {
    border: 0;
    background: #343a40;
    color: #f8f9fa;
    padding: 0.8rem;
    border-radius: 0.4rem;
    transition: background 0.2s linear;
    font-size: 1.6rem;
    font-size: 500;

    &:hover {
      background: #000;
    }

    &:focus {
      background: #343a40;
    }
  }
`;
