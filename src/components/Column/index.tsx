import { useContext, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import { BoardContext } from '../../contexts/BoardContext';
import { Modal } from '../Modal';
import { Task } from '../Task';
import { Container, TasksContainer } from './styles';

interface ColumnProps {
  title: string;
  id: string;
  tasksIds: string[];
}

export function Column({ title, id, tasksIds }: ColumnProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(id);
  const { allTasks } = useContext(BoardContext);

  const tasks = tasksIds.map((taskId) =>
    allTasks.find((task) => task.id === taskId)
  );

  return (
    <>
      <Container>
        <header className="header">
          <h3>{title}</h3>
          <AiOutlinePlus
            className="add-icon"
            onClick={() => setIsModalOpen(true)}
          />
        </header>

        <TasksContainer>
          {tasks.map(({ id: taskId, content, label }: any) => (
            <Task id={taskId} content={content} label={label} />
          ))}
        </TasksContainer>
      </Container>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <p>uoool modal</p>
      </Modal>
    </>
  );
}
