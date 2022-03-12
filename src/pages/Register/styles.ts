import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  width: 100%;
  max-width: 40rem;
  background: #e9ecef;
  border-radius: 0.4rem;
  padding: 2.4rem;
  box-shadow: 0 0.2rem 0.4rem #00000020;

  .header {
    color: #495057;
    text-align: center;

    .title {
      font-size: 2rem;
    }

    .description {
      font-size: 1.4rem;

      a {
        color: #3f454c;
        font-weight: 500;
        text-decoration: none;
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1.6rem;

    button {
      border: 0;
      height: 3.2rem;
      background: #495057;
      color: #e9ecef;
      border-radius: 0.4rem;
      font-weight: 500;
      margin-top: 0.8rem;
      transition: background 0.2s ease-in;

      &:hover {
        background: #212529;
      }
    }
  }
`;

export const InputGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  input {
    border: none;
    height: 3.6rem;
    padding: 0 1.2rem;
    border-radius: 0.4rem;
    color: #6c757d;
    box-shadow: 0 0.1rem 0.3rem #00000005;
    font-size: 1.4rem;
    font-weight: 500;
  }
`;
