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
  gap: 0.8rem;
  padding: 1.2rem;
  background: #f0ecfe;
  font-size: 1.6rem;
  border-radius: 0.4rem;
`;

export const Tag = styled.div<TagProps>`
  width: 10rem;
  height: 1.6rem;
  background: ${({ label }) =>
    label === 'green' ? '#70e000' : label === 'red' ? '#ef233c' : '#f9a620'};
`;
