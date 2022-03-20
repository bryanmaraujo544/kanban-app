/* eslint-disable no-use-before-define */
/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
import { useContext, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';

import { BoardContext } from '../../contexts/BoardContext';
import { useClickOutside } from '../../hooks/useClickOutside';
import { Task } from '../Task';
import { CreateTaskModal } from './CreateTaskModal';
import { Container, TasksContainer } from './styles';

interface ColumnProps {
  title: string;
  id: number;
  tasksIds: number[];
  index: number;
}

export function Column({ title, id, tasksIds, index }: ColumnProps) {
  const [isToEditColumnTitle, setIsToEditColumnTitle] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState(title);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { allTasks, setColumnsInfos } = useContext(BoardContext);

  const tasksOfTheColumn = tasksIds?.map(
    (taskId) => allTasks.filter((task) => task.id === taskId)[0]
  );

  console.log(`Tasks of Column - ${title}`, tasksOfTheColumn);

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
      <Draggable draggableId={`column-${id}`} index={index}>
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
              <MdDelete
                className="remove-icon"
                onClick={() => setIsModalOpen(true)}
              />
            </header>

            <Droppable droppableId={id.toString()} type="task">
              {(provided) => (
                <TasksContainer
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {tasksOfTheColumn.map(
                    ({ id: taskId, title, tag }: any, index) => (
                      <Task
                        key={taskId}
                        id={taskId}
                        title={title}
                        tag={tag}
                        index={index}
                      />
                    )
                  )}
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
      <CreateTaskModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        tasksOfTheColumn={tasksOfTheColumn}
        columnId={id}
        tasksIds={tasksIds}
      />
    </>
  );
}
