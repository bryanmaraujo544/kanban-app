/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-props-no-spreading */
import { useContext, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { AiOutlinePlus } from 'react-icons/ai';
import { toast } from 'react-toastify';

import { BoardContext } from '../../contexts/BoardContext';
import api from '../../services/utils/ApiClient';
import { Column } from '../Column';
import { Container, AddColumn } from './styles';

export function Board() {
  const [isToEditColumn, setIsToEditColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');

  const {
    columnsInfos,
    columnsOrder,
    setColumnsOrder,
    setColumnsInfos,
    boardInfos,
  } = useContext(BoardContext);

  async function onDragEnd({ source, destination, type, draggableId }: any) {
    try {
      if (
        destination.droppableId === source.droppableId &&
        source.index === destination.index
      ) {
        return;
      }

      if (!destination) {
        return;
      }

      console.log({ source, destination });

      if (type === 'column') {
        const newOrder = columnsOrder;
        newOrder.splice(source.index, 1);

        const columnId = draggableId.split('-')[1];
        newOrder.splice(destination.index, 0, Number(columnId));

        // Update the index in database
        const columnsIndexAndId = newOrder.map((columnId, index) => ({
          columnId,
          index,
        }));
        await api.put(`/columns-order`, { columnsIndexAndId });

        setColumnsOrder(newOrder);
      }

      if (type === 'task') {
        if (source.droppableId === destination.droppableId) {
          // The card it was moved from one column to the same column

          let newTasksOrder = [] as any;
          setColumnsInfos((prevColumnInfos: any) =>
            prevColumnInfos.map((column: any) => {
              if (column.id.toString() === destination.droppableId) {
                // Reordering the tasksIds array
                newTasksOrder = [...column.tasksIds];
                newTasksOrder.splice(source.index, 1);
                newTasksOrder.splice(destination.index, 0, Number(draggableId));
                return { ...column, tasksIds: newTasksOrder };
              }
              return column;
            })
          );

          // Saving in the database
          newTasksOrder.forEach((taskId: any, index: any) => {
            (async () => {
              await api.put(`/tasks/${taskId}`, { index });
            })();
          });
        } else {
          // Card it was moved from one column to the other column
          setColumnsInfos((prevColumnInfos: any) =>
            prevColumnInfos.map((column: any) => {
              if (column.id.toString() === source.droppableId) {
                // remove the task from its old column
                const newTasksIds = [...column.tasksIds];
                newTasksIds.splice(source.index, 1);
                return { ...column, tasksIds: newTasksIds };
              }

              if (column.id.toString() === destination.droppableId) {
                // add the card in the new column
                const newTasksIds = [...column.tasksIds];
                newTasksIds.splice(destination.index, 0, Number(draggableId));

                // Changing the task order in the column
                newTasksIds.forEach((taskId, index) => {
                  (async () => {
                    api.put(`/tasks/${taskId}`, { index });
                  })();
                });

                return { ...column, tasksIds: newTasksIds };
              }

              return column;
            })
          );

          // Changing the columnId of the task dragged
          const taskIdDragged = draggableId;
          const columnIdWhereTaskWasDropped = Number(destination.droppableId);
          await api.put(`/tasks/${taskIdDragged}`, {
            column_id: columnIdWhereTaskWasDropped,
          });
        }
      }
    } catch (err: any) {
      console.log('Error in DragEnd Function', err);
    }
  }

  async function handleCreateColumn(e: any) {
    e.preventDefault();
    if (!newColumnTitle) {
      toast.error('Type the column title', { autoClose: 1000 });
      return;
    }

    const {
      data: { column },
    } = await api.post('/columns', {
      title: newColumnTitle,
      boardId: boardInfos.id,
    });

    // Save the new column id in the columnOrder table
    const indexOfNewColumn = columnsInfos.length;
    // Saving the index of the new column in database
    await api.post('/columns-order', {
      boardId: boardInfos.id,
      columnId: column.id,
      index: indexOfNewColumn,
    });

    // console.log({ data });

    setColumnsInfos((prevColumns: any) => [
      ...prevColumns,
      { ...column, tasksIds: [] },
    ]);
    // setColumnsOrder((prevOrder: string[]) => [...prevOrder, column.id]);
    setColumnsOrder([...columnsOrder, column.id]);

    setIsToEditColumn(false);
  }

  if (!columnsOrder || !columnsInfos) {
    return <h1>loading</h1>;
  }

  console.log({ columnsInfos, columnsOrder });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {columnsOrder?.map((columnId: any, index: number) => {
              const { id, tasksIds, title }: any = columnsInfos?.find(
                (columnInfos) => columnInfos.id === columnId
              );
              return (
                <Column
                  key={`column-${id}`}
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
