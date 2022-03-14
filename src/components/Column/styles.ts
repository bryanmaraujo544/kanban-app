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
  margin: 0 0.8rem;
  box-shadow: 0 0.2rem 0.4rem #00000005;
  cursor: default !important;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.8rem;

    h3 {
      color: #495057;
      cursor: text;
    }

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
      color: #495057;
      cursor: pointer;
      transition: color 0.2s linear;

      &:hover {
        color: #000;
      }
    }
  }

  .add-card-btn {
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    background: #e9ecef;
    color: #6c757d;
    padding: 0.4rem;
    border-radius: 0.4rem;
    box-shadow: 0 0.1rem 0.2rem #00000010;
    transition: all 0.2s linear;

    &:hover {
      background: #ced4da;
      color: #495057;
    }

    .add-icon {
      font-size: 1.8rem;
    }

    p {
      font-weight: 500;
    }
  }
`;

export const TasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 0.8rem;
  flex: 1;
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
    border-radius: 0.4rem;

    &:hover {
      background: #6c757d;
    }

    &:active {
      background: #495057;
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

  &:focus {
    outline: 0.2rem solid #495057;
  }
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
