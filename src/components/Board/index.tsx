/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-props-no-spreading */
import { useContext } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { BoardContext } from '../../contexts/BoardContext';
import { Column } from '../Column';
import { Container } from './styles';

export function Board() {
  const { columnsInfos, columnsOrder, setColumnsOrder } =
    useContext(BoardContext);

  function onDragEnd({ source, destination, type, draggableId }: any) {
    console.log({ destination, source, draggableId, type });
    if (destination.droppableId === 'board') {
      const newOrder = columnsOrder;
      newOrder.splice(source.index, 1);
      newOrder.splice(destination.index, 0, draggableId);
      setColumnsOrder(newOrder);
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
            {/* {columnsInfos.map(({ id, tasksIds, title }, index) => (
              <Column
                key={id}
                id={id}
                title={title}
                tasksIds={tasksIds}
                index={index}
              />
            ))} */}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}
