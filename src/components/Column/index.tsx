/* eslint-disable no-use-before-define */
/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
import { useContext, useEffect, useState, useRef } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsCheck } from 'react-icons/bs';
import { toast } from 'react-toastify';

import { BoardContext } from '../../contexts/BoardContext';
import { useClickOutside } from '../../hooks/useClickOutside';
import api from '../../services/utils/ApiClient';
import { Modal } from '../Modal';
import { Task } from '../Task';
import { Container, TasksContainer, TextArea, ModalForm, Tag } from './styles';

interface ColumnProps {
  title: string;
  id: number;
  tasksIds: number[];
  index: number;
}

const cardsTags = [
  { name: 'green', color: '#70e000' },
  { name: 'orange', color: '#f9a620' },
  { name: 'red', color: '#ef233c' },
];

export function Column({ title, id, tasksIds, index }: ColumnProps) {
  console.log('column-id: ', id);
  const [isToEditColumnTitle, setIsToEditColumnTitle] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState(title);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardTag, setNewCardTag] = useState('green');

  const { allTasks, setAllTasks, setColumnsInfos, boardInfos } =
    useContext(BoardContext);
  const modalTextAreaRef = useRef<any>();

  const tasks = tasksIds.map(
    (taskId) => allTasks.filter((task) => task.id === taskId)[0]
  );

  console.log('tasks of each column', tasks);

  useEffect(() => {
    if (!isModalOpen) {
      setNewCardTitle('');

      return;
    }
  }, [isModalOpen]);

  async function handleCreateCard(e: any) {
    e.preventDefault();

    if (!newCardTitle) {
      toast.error('Type something');
      return;
    }

    try {
      const {
        data: { task },
      } = await api.post('/tasks', {
        title: newCardTitle,
        tag: newCardTag,
        columnId: id,
        boardId: boardInfos.id,
      });

      setAllTasks((prevAllTasks: any) => [...prevAllTasks, task]);

      setColumnsInfos((prevColumn: any) =>
        prevColumn.map((prevColumn: any) => {
          if (prevColumn.id === id) {
            return {
              ...prevColumn,
              tasksIds: [...tasksIds, task.id],
            };
          }
          return { ...prevColumn };
        })
      );

      setIsModalOpen(false);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  }

  function handleUpdateColumnTitle(e?: any) {
    if (!isToEditColumnTitle) {
      return;
    }

    if (!newColumnTitle) {
      setNewColumnTitle(title);
      setIsToEditColumnTitle(false);
      return;
    }

    e?.preventDefault();
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

  const columnTitleRef = useClickOutside(() => handleUpdateColumnTitle());

  return (
    <>
      <Draggable draggableId={id.toString()} index={index}>
        {(provided) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <header className="header">
              {isToEditColumnTitle ? (
                <form
                  className="edit-form"
                  onSubmit={(e) => handleUpdateColumnTitle(e)}
                  ref={columnTitleRef}
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

            <Droppable droppableId={id.toString()} type="task">
              {(provided) => (
                <TasksContainer
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {tasks.map(({ id: taskId, title, tag }: any, index) => (
                    <Task
                      key={taskId}
                      id={taskId}
                      title={title}
                      tag={tag}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </TasksContainer>
              )}
            </Droppable>

            <button
              type="button"
              className="add-card-btn"
              onClick={() => setIsModalOpen(true)}
            >
              <AiOutlinePlus className="add-icon" />
              <p>Add card</p>
            </button>
          </Container>
        )}
      </Draggable>

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
            ref={modalTextAreaRef}
          />
          <div className="tags">
            {cardsTags.map(({ name, color }) => (
              <Tag color={color} onClick={() => setNewCardTag(name)} key={name}>
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
