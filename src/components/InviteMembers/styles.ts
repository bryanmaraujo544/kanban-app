import styled from 'styled-components';

interface MemberFoundProps {
  isSelected: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  .members-selected {
    display: flex;
    align-items: center;
    gap: 0.8rem;

    .member-selected {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      height: 3rem;
      background: #dee2e6;
      color: #495057;
      border-radius: 0.4rem;
      padding: 0 0.6rem;
      font-size: 1.2rem;
      font-weight: 500;
    }

    .invite-btn {
      border: none;
      background: #00a8e8;
      height: 3rem;
      padding: 0 1.6rem;
      border-radius: 0.4rem;
      font-size: 1.2rem;
      color: #fff;
      font-weight: 700;
    }
  }

  input {
    background: #e9ecef;
    border: 0;
    height: 3.6rem;
    padding: 0 0.8rem;
    border-radius: 0.4rem;
    font-size: 1.2rem;
    font-weight: 500;
    color: #495057;
  }
`;

export const MembersFound = styled.div`
  background: #e9ecef;
  padding: 0.8rem;
  border-radius: 0.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  min-height: 15rem;
  max-height: 15rem;
  overflow-y: scroll;
`;

export const MemberFound = styled.div<MemberFoundProps>`
  background: ${({ isSelected }) => (isSelected ? '#CED4DA' : '#fff')};
  border-radius: 0.4rem;
  padding: 1.2rem;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .infos {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    img {
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 50%;
      object-fit: cover;
    }

    .name {
      font-size: 1.4rem;
      font-weight: 700;
      color: #495057;
    }

    .email {
      font-size: 1.2rem;
      font-weight: 500;
      color: #6c757d;
    }
  }

  .icon {
    font-size: 2rem;
    color: #6c757d;
    cursor: pointer;

    &:hover {
      color: #495057;
    }
  }
`;
