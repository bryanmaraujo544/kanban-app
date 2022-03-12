/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-props-no-spreading */
import { useContext } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { BoardContext } from '../../contexts/BoardContext';
import { Column } from '../Column';
import { Container } from './styles';

export function Board() {
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

    console.log({ destination, source, draggableId, type });
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
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}
