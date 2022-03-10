/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext, useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import { BoardContext } from '../../contexts/BoardContext';
import { Modal } from '../Modal';
import { Task } from '../Task';
import { Container, TasksContainer, TextArea, ModalForm } from './styles';

interface ColumnProps {
  title: string;
  id: string;
  tasksIds: string[];
}

export function Column({ title, id, tasksIds }: ColumnProps) {
  console.log(id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const { allTasks } = useContext(BoardContext);

  useEffect(() => {
    if (!isModalOpen) {
      setNewCardTitle('');
    }
  }, [isModalOpen]);

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
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        modalTitle="Create Card"
      >
        <ModalForm>
          <TextArea
            placeholder="Enter the card title"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
          />
          <button type="submit" className="modal-btn">
            Create
          </button>
        </ModalForm>
      </Modal>
    </>
  );
}
