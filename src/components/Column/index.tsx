import { useContext, useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsCheck } from 'react-icons/bs';

import { BoardContext } from '../../contexts/BoardContext';
import { Modal } from '../Modal';
import { Task } from '../Task';
import { Container, TasksContainer, TextArea, ModalForm, Tag } from './styles';

interface ColumnProps {
  title: string;
  id: string;
  tasksIds: string[];
}

const cardsTags = [
  { name: 'green', color: '#70e000' },
  { name: 'orange', color: '#f9a620' },
  { name: 'red', color: '#ef233c' },
];

export function Column({ title, id, tasksIds }: ColumnProps) {
  const [isToEditColumnTitle, setIsToEditColumnTitle] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState(title);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardTag, setNewCardTag] = useState('');

  const { allTasks, setAllTasks, setColumnsInfos } = useContext(BoardContext);
  const tasks = tasksIds.map((taskId) =>
    allTasks.find((task) => task.id === taskId)
  );

  useEffect(() => {
    if (!isModalOpen) {
      setNewCardTitle('');
    }
  }, [isModalOpen]);

  function handleCreateCard(e: any) {
    e.preventDefault();

    const task = {
      id: newCardTitle.replace(' ', ''),
      content: newCardTitle,
      label: newCardTag,
    };

    setAllTasks((prevAllTasks: any) => [...prevAllTasks, task]);

    setColumnsInfos((prevColumn: any) =>
      prevColumn.map(({ id: columnId, title, tasksIds }: any) => {
        if (columnId === id) {
          return {
            id,
            title,
            tasksIds: [...tasksIds, newCardTitle.replace(' ', '')],
          };
        }
        return { id: columnId, title, tasksIds };
      })
    );

    setIsModalOpen(false);
  }

  function handleUpdateColumnTitle(e: any) {
    e.preventDefault();
    setIsToEditColumnTitle(false);
    setColumnsInfos((prevColumns: any) =>
      prevColumns.map((column: any) => {
        if (column.id === id) {
          return { ...column, title: newColumnTitle };
        }
        return column;
      })
    );
  }

  return (
    <>
      <Container>
        <header className="header">
          {isToEditColumnTitle ? (
            <form
              className="edit-form"
              onSubmit={(e) => handleUpdateColumnTitle(e)}
            >
              <input
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
                autoFocus
              />
            </form>
          ) : (
            <h3 onClick={() => setIsToEditColumnTitle(true)}>{title}</h3>
          )}
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
        <ModalForm onSubmit={(e) => handleCreateCard(e)}>
          <TextArea
            placeholder="Enter the card title"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
          />
          <div className="tags">
            {cardsTags.map(({ name, color }) => (
              <Tag color={color} onClick={() => setNewCardTag(name)}>
                {name === newCardTag && <BsCheck />}
              </Tag>
            ))}
          </div>
          <button type="submit" className="modal-btn">
            Create
          </button>
        </ModalForm>
      </Modal>
    </>
  );
}
