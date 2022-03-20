/* eslint-disable no-nested-ternary */
import styled from 'styled-components';

interface Props {
  label: string;
}

interface TagProps {
  label: string;
}

interface ContentProps {
  isLarge?: boolean;
}

export const Container = styled.div<Props>`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem;
  background: #f0ecfe;
  font-size: 1.6rem;
  border-radius: 0.4rem;
  margin: 0.4rem 0;
  max-width: 100%;
  cursor: default !important;

  .task-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    width: 100%;
  }

  .edit-form {
    input {
      font-size: 1.4rem;
      color: #495057;
      /* padding: 0.6rem; */
      background: #f8f9fa;
      padding: 0.4rem;
      border: none;
      border-radius: 0.4rem;
      outline: none;
      box-shadow: 0 0.1rem 0.3rem #00000002;
      width: 100%;
    }
  }
`;

export const Content = styled.p<ContentProps>`
  font-size: ${({ isLarge }) => (isLarge ? '1.4rem' : '1.6rem')};
  font-weight: 400;
  color: #495057;
  word-break: break-word;
  cursor: text;
  width: fit-content;
`;

export const Tag = styled.div<TagProps>`
  width: 4.8rem;
  height: 1rem;
  border-radius: 0.3rem;
  background: ${({ label }) =>
    label === 'green' ? '#70e000' : label === 'red' ? '#' : '#f9a620'};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const MenuContainer = styled.div`
  position: relative;

  .menu-icon {
    cursor: pointer;
  }

  .menu {
    position: absolute;
    right: 0;
    z-index: 999;
    /* background-color: #e9ecef; */
    /* padding: 0.6rem; */
    border-radius: 0.4rem;

    button {
      background: #fff;
      border: none;
      display: flex;
      gap: 0.4rem;
      align-items: center;
      border-radius: 0.4rem;
      padding: 0.6rem 0.8rem;
      font-size: 1.2rem;
      font-weight: 500;
      color: #495057;
      transition: all 0.2s ease-in;
      box-shadow: 0 0.1rem 0.3rem #00000005;

      &:hover {
        background: #dee2e6;
      }

      .delete-icon {
        color: #ef233c;
        font-size: 1.4rem;
      }
    }
  }
`;
