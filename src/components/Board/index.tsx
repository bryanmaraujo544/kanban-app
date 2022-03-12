/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-props-no-spreading */
import { useContext, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { AiOutlinePlus } from 'react-icons/ai';

import { BoardContext } from '../../contexts/BoardContext';
import { Column } from '../Column';
import { Container, AddColumn } from './styles';

export function Board() {
  const [isToEditColumn, setIsToEditColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');

  const { columnsInfos, columnsOrder, setColumnsOrder, setColumnsInfos } =
    useContext(BoardContext);

  function onDragEnd({ source, destination, type, draggableId }: any) {
    if (
      destination.droppableId === source.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (!destination) {
      return;
    }

    if (type === 'column') {
      const newOrder = columnsOrder;
      newOrder.splice(source.index, 1);
      newOrder.splice(destination.index, 0, draggableId);
      setColumnsOrder(newOrder);
    }

    if (type === 'task') {
      if (source.droppableId === destination.droppableId) {
        // The card it was moved from one column to the same column
        setColumnsInfos((prevColumnInfos: any) =>
          prevColumnInfos.map((column: any) => {
            if (column.id === destination.droppableId) {
              const newTasksOrder = [...column.tasksIds];
              newTasksOrder.splice(source.index, 1);
              newTasksOrder.splice(destination.index, 0, draggableId);
              return { ...column, tasksIds: newTasksOrder };
            }
            return column;
          })
        );
      } else {
        // Card it was moved from one column to the other column
        setColumnsInfos((prevColumnInfos: any) =>
          prevColumnInfos.map((column: any) => {
            if (column.id === source.droppableId) {
              // remove the task from its old column
              const newTasksIds = [...column.tasksIds];
              newTasksIds.splice(source.index, 1);
              return { ...column, tasksIds: newTasksIds };
            }

            if (column.id === destination.droppableId) {
              // add the card in the new column
              const newTasksIds = [...column.tasksIds];
              newTasksIds.splice(destination.index, 0, draggableId);
              return { ...column, tasksIds: newTasksIds };
            }

            return column;
          })
        );
      }
    }
  }

  function handleCreateColumn(e: any) {
    e.preventDefault();
    const newColumn = {
      id: newColumnTitle.replace(' ', ''),
      title: newColumnTitle,
      tasksIds: [],
    };
    setColumnsInfos((prevColumns: any) => [...prevColumns, newColumn]);
    setColumnsOrder((prevOrder: string[]) => [
      ...prevOrder,
      newColumnTitle.replace(' ', ''),
    ]);
    setIsToEditColumn(false);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {columnsOrder.map((columnId, index) => {
              const { id, tasksIds, title } = columnsInfos.filter(
                (columnInfos) => columnInfos.id === columnId
              )[0];
              return (
                <Column
                  key={id}
                  id={id}
                  title={title}
                  tasksIds={tasksIds}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
            <AddColumn>
              {isToEditColumn ? (
                <form
                  className="create-column-form"
                  onSubmit={handleCreateColumn}
                >
                  <input
                    type="text"
                    placeholder="Type the column title"
                    value={newColumnTitle}
                    onChange={(e) => setNewColumnTitle(e.target.value)}
                    autoFocus
                  />
                  <footer>
                    <button type="submit">Create Column</button>
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => setIsToEditColumn(false)}
                    >
                      Cancel
                    </button>
                  </footer>
                </form>
              ) : (
                <button
                  type="button"
                  className="add-column-suggest-btn"
                  onClick={() => setIsToEditColumn(true)}
                >
                  <AiOutlinePlus className="icon" />
                  <p>Add a new column</p>
                </button>
              )}
            </AddColumn>
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}
