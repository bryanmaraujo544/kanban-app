/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useContext, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { BoardContext } from '../../contexts/BoardContext';
import { useClickOutside } from '../../hooks/useClickOutside';
import { Container, Tag, Content } from './styles';

interface TaskProps {
  id: string;
  title: string;
  tag: string;
  index: number;
}

export function Task({ id, title, tag, index }: TaskProps) {
  const [isToEdit, setIsToEdit] = useState(false);
  const [newContent, setNewContent] = useState(title);
  const { setAllTasks } = useContext(BoardContext);

  function handleUpdateTaskContent(e?: any) {
    if (!isToEdit) {
      return;
    }
    if (!newContent) {
      setNewContent(title);
      setIsToEdit(false);
      return;
    }

    e?.preventDefault();
    setAllTasks((prevTasks: any) =>
      prevTasks.map((task: any) => {
        if (task.id === id) {
          return { ...task, content: newContent };
        }
        return task;
      })
    );
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

  const contentRef = useClickOutside(handleUpdateTaskContent);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Container
          label={tag}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Tag className="tag" label={tag} onClick={() => handleChangeTag()} />
          {isToEdit ? (
            <form
              onSubmit={(e) => handleUpdateTaskContent(e)}
              ref={contentRef}
              className="edit-form"
            >
              <input
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                autoFocus
              />
            </form>
          ) : (
            <Content
              onClick={() => setIsToEdit(true)}
              isLarge={title.length > 20}
            >
              {title}
            </Content>
          )}
        </Container>
      )}
    </Draggable>
  );
}
