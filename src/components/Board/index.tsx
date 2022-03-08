import { useContext } from 'react';
import { BoardContext } from '../../contexts/BoardContext';
import { Container } from './styles';

export function Board() {
  const { allTasks, columnsInfos, columnsOrder } = useContext(BoardContext);

  console.log({ allTasks, columnsInfos, columnsOrder });
  return (
    <Container>
      <h1>Board</h1>
    </Container>
  );
}
