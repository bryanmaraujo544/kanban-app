import styled from 'styled-components';

interface ModalProps {
  isLarge: boolean;
}

export const Container = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  bottom: 0;
  background: #00000040;
`;

export const ModalContainer = styled.div<ModalProps>`
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
  border-radius: 0.4rem;
  background: #fff;
  padding: 2.4rem;
  /* min-width: 40rem; */
  width: 100%;
  max-width: 40rem;
  margin: 0 1.6rem;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.1rem solid #adb5bd;
    padding-bottom: 1.2rem;

    .title {
      color: #6c757d;
      font-weight: 500;
      font-size: ${({ isLarge }) => (isLarge ? '1.8rem' : '2.2rem')};
    }

    .close-btn {
      background: none;
      border: 0;
      display: flex;

      &:hover .icon {
        color: #000;
      }

      .icon {
        font-size: 2.4rem;
        color: #6c757d;
        transition: color 0.2s ease-in;
      }
    }
  }
`;
