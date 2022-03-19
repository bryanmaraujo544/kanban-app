import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  align-items: flex-start;
  flex: 1;
  padding: 1.6rem;
  overflow-y: hidden;
  overflow-x: scroll;
  height: 100%;

  ::-webkit-scrollbar {
    height: 1rem;
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

export const AddColumn = styled.div`
  min-width: 25rem;
  padding: 1.6rem;
  background: #fff;
  border-radius: 0.4rem;
  margin: 0 0.8rem;
  flex: 1;

  .add-column-suggest-btn {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    background: none;
    border: 0;
    color: #6c757d;
    font-weight: 500;
    width: 100%;
    cursor: pointer;

    .icon {
      font-size: 1.6rem;
    }
  }

  .create-column-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    input {
      background: #e9ecef;
      border: 0;
      padding: 0.6rem;
      border-radius: 0.4rem;
      font-size: 1.4rem;
      color: #495057;

      &:focus {
        outline: #495057 solid 2px;
      }
    }

    footer {
      display: flex;
      gap: 0.8rem;

      button {
        color: #e9ecef;
        border-radius: 0.4rem;
        font-weight: 500;
        font-size: 1.2rem;
        padding: 0.6rem;
      }

      button[type='submit'] {
        background: #495057;
        border: none;
        flex: 1;
      }

      .cancel-btn {
        background: #ef233c;
        border: 0;
        border-radius: 0.4rem;
        padding: 0.6rem 1.2rem;
      }
    }
  }
`;
