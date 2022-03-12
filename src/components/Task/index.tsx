/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useContext, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { BoardContext } from '../../contexts/BoardContext';
import { Container, Tag } from './styles';

interface TaskProps {
  id: string;
  content: string;
  label: string;
  index: number;
}

export function Task({ id, content, label, index }: TaskProps) {
  const [isToEdit, setIsToEdit] = useState(false);
  const [newContent, setNewContent] = useState(content);
  const { setAllTasks } = useContext(BoardContext);

  function updateTask() {
    setAllTasks((prevTasks: any) =>
      prevTasks.map((task: any) => {
        if (task.id === id) {
          return { ...task, content: newContent };
        }
        return task;
      })
    );
  }

  function handleUpdateTaskContent(e: any) {
    e.preventDefault();
    updateTask();
    setIsToEdit(false);
  }

  function spinTag(oldTag: string) {
    if (oldTag === 'green') return 'orange';
    if (oldTag === 'orange') return 'red';
    return 'green';
  }

  function handleChangeTag() {
    setAllTasks((prevTasks: any) =>
      prevTasks.map((task: any) => {
        if (task.id === id) {
          const newTag = spinTag(task.label);
          return { ...task, label: newTag };
        }
        return task;
      })
    );
  }

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Container
          label={label}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Tag
            className="tag"
            label={label}
            onClick={() => handleChangeTag()}
          />
          {isToEdit ? (
            <form
              onSubmit={(e) => handleUpdateTaskContent(e)}
              className="edit-form"
            >
              <input
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                autoFocus
              />
            </form>
          ) : (
            <p onClick={() => setIsToEdit(true)}>{content}</p>
          )}
        </Container>
      )}
    </Draggable>
  );
}
