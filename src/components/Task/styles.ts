import styled from 'styled-components';

interface Props {
  label: string;
}

export const Container = styled.div<Props>`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem;
  background: #f0ecfe;
  font-size: 1.6rem;
  border-radius: 0.4rem;
`;
