import styled from 'styled-components';

export const Buttons = styled.div`
  width: 100%;
  display: flex;
  gap: 0.8rem;

  button {
    flex: 1;
    border-radius: 0.4rem;
    border: 0;
    height: 3.6rem;
    font-weight: 700;
    font-size: 1.6rem;
    color: #f8f9fa;

    &:nth-child(1) {
      background: #adb5bd;
      color: #495057;
    }
    &:nth-child(2) {
      background: #ef233c;
    }
  }
`;
