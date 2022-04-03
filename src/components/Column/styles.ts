import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 31rem;
  max-height: 100%;
  padding: 2rem 1.6rem;
  margin: 0 0.8rem;
  box-shadow: 0 0.2rem 0.4rem #00000005;
  overflow-y: hidden;
  cursor: default !important;
  background: #fff;
  border-radius: 0.4rem;

  @media (max-width: 768px) {
    min-width: 22rem;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.8rem;

    h3 {
      color: #495057;
      cursor: text;
      font-size: 1.8rem;
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
    .remove-icon {
      font-size: 2.4rem;
      color: #495057;
      cursor: pointer;
      transition: color 0.2s linear;

      &:hover {
        color: #ef233c;
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
  /* flex: 1; */
  overflow-y: scroll;
  padding: 0 0.8rem;
  height: 100%;
  overflow-x: hidden;
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
