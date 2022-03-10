import { useContext } from 'react';
import { BoardContext } from '../../contexts/BoardContext';
import { Column } from '../Column';
import { Container } from './styles';

export function Board() {
  const { allTasks, columnsInfos, columnsOrder } = useContext(BoardContext);
  console.log({ allTasks, columnsInfos, columnsOrder });

  return (
    <Container>
      {columnsInfos.map(({ id, tasksIds, title }) => (
        <Column key={id} id={id} title={title} tasksIds={tasksIds} />
      ))}
    </Container>
  );
}
