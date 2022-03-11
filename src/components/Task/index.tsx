/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useContext, useState } from 'react';
import { BoardContext } from '../../contexts/BoardContext';
import { Container, Tag } from './styles';

interface TaskProps {
  id: string;
  content: string;
  label: string;
}

export function Task({ id, content, label }: TaskProps) {
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

  return (
    <Container label={label}>
      <Tag className="tag" label={label} />
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
  );
}
