import styled from 'styled-components';

interface TagProps {
  color: string;
}

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
