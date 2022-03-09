import { useContext } from 'react';
import { BoardContext } from '../../contexts/BoardContext';
import { Task } from '../Task';
import { Container, TasksContainer } from './styles';

interface ColumnProps {
  title: string;
  id: string;
  tasksIds: string[];
}

export function Column({ title, id, tasksIds }: ColumnProps) {
  console.log(id);
  const { allTasks } = useContext(BoardContext);
  const tasks = tasksIds.map((taskId) =>
    allTasks.find((task) => task.id === taskId)
  );
  return (
    <Container>
      <h3>{title}</h3>
      <TasksContainer>
        {tasks.map(({ id: taskId, content, label }: any) => (
          <Task id={taskId} content={content} label={label} />
        ))}
      </TasksContainer>
    </Container>
  );
}
