/* eslint-disable no-nested-ternary */
import styled from 'styled-components';

interface Props {
  label: string;
}

interface TagProps {
  label: string;
}

export const Container = styled.div<Props>`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 1.2rem;
  background: #f0ecfe;
  font-size: 1.6rem;
  border-radius: 0.4rem;

  p {
    font-size: 1.8rem;
    font-weight: 500;
    color: #495057;
  }

  .edit-form {
    margin-top: 0.8rem;

    input {
      font-size: 1.8rem;
      font-weight: 500;
      color: #495057;
      padding: 0.6rem;
      background: #fff;
      border: none;
      border-radius: 0.4rem;
      outline: none;
      box-shadow: 0 0.1rem 0.3rem #00000002;
    }
  }
`;

export const Tag = styled.div<TagProps>`
  width: 4.8rem;
  height: 0.8rem;
  border-radius: 0.2rem;
  background: ${({ label }) =>
    label === 'green' ? '#70e000' : label === 'red' ? '#ef233c' : '#f9a620'};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
