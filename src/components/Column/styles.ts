import styled from 'styled-components';

interface TagProps {
  color: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  /* flex: 1; */
  min-width: 30rem;
  max-width: 30rem;
  padding: 2.4rem 2rem;
  background: #fff;
  border-radius: 0.4rem;
  max-height: 100%;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.8rem;

    .edit-form {
      input {
        background: #f0ecfe;
        border: none;
        font-size: 1.8rem;
        font-weight: 700;
        padding: 0.4rem;
        border-radius: 0.4rem;
        outline: none;
      }
    }
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
  min-height: 12.5rem;
  overflow-y: scroll;
  padding: 0 0.8rem;

  ::-webkit-scrollbar {
    width: 1rem;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: #adb5bd;
    box-shadow: 0 0.2rem 0.8rem #00000030;
    border-radius: 0.4rem;

    &:hover {
      background: #00a8e8;
    }
  }
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

  .tags {
    display: flex;
    gap: 0.8rem;
  }

  .modal-btn {
    border: 0;
    background: #343a40;
    color: #f8f9fa;
    padding: 0.8rem;
    border-radius: 0.4rem;
    transition: background 0.2s linear;
    font-size: 1.6rem;
    font-size: 500;
    margin-top: 1.2rem;

    &:hover {
      background: #000;
    }

    &:focus {
      background: #343a40;
    }
  }
`;

export const Tag = styled.div<TagProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 2rem;
  padding: 0.2rem;
  color: #fff;
  border-radius: 0.4rem;
  background: ${({ color }) => color};
  cursor: pointer;
`;
