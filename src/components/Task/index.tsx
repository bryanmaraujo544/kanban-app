/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useContext, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { FiMoreHorizontal } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { BoardContext } from '../../contexts/BoardContext';
import { useClickOutside } from '../../hooks/useClickOutside';
import api from '../../services/utils/ApiClient';
import { Container, Tag, Content, MenuContainer } from './styles';

interface TaskProps {
  id: number;
  title: string;
  tag: string;
  index: number;
}

export function Task({ id, title, tag, index }: TaskProps) {
  const [newTitle, setNewTitle] = useState(title);
  const [isToEdit, setIsToEdit] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { setAllTasks, allTasks, setColumnsInfos } = useContext(BoardContext);
  const deleteButtonRef = useClickOutside(() => setIsMenuOpen(false));

  async function handleUpdateTaskContent(e?: any) {
    if (!isToEdit) {
      return;
    }

    if (!newTitle) {
      setNewTitle(title);
      setIsToEdit(false);
      return;
    }

    e?.preventDefault();
    setAllTasks((prevTasks: any) =>
      prevTasks.map((task: any) => {
        if (task.id === id) {
          return { ...task, title: newTitle };
        }
        return task;
      })
    );

    await api.put(`/tasks/${id}`, { title: newTitle });

    setIsToEdit(false);
  }

  function spinTag(oldTag: string) {
    if (oldTag === 'green') return 'orange';
    if (oldTag === 'orange') return 'red';
    return 'green';
  }

  async function handleChangeTag() {
    setAllTasks((prevTasks: any) =>
      prevTasks.map((task: any) => {
        if (task.id === id) {
          const newTag = spinTag(task.tag);
          return { ...task, tag: newTag };
        }
        return task;
      })
    );

    const newTag = spinTag(tag);
    await api.put(`tasks/${id}`, { tag: newTag });
  }

  const contentRef = useClickOutside(handleUpdateTaskContent);

  function handleToggleIsMenuOpen() {
    setIsMenuOpen((prev) => !prev);
  }

  async function handleDeleteTask() {
    try {
      const columnIdFromTask = allTasks.find(
        (task) => task.id === id
      )?.column_id;

      setColumnsInfos((prevColumns: any) =>
        prevColumns.map((column: any) => {
          if (column.id === columnIdFromTask) {
            // Taking out the id the task deleted from taskIds array of column
            // This tasksIds array contains the id the tasks in each column
            const newTasksIds = [...column.tasksIds].filter(
              (taskId) => taskId !== id
            );
            return {
              ...column,
              tasksIds: newTasksIds,
            };
          }
          return column;
        })
      );

      // Taking out the task of the alltasks object
      setAllTasks((prevTasks: any) =>
        prevTasks.filter((task: any) => task.id !== id)
      );

      await api.delete(`/tasks/${id}`);

      setIsMenuOpen(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => (
        <Container
          label={tag}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="task-header">
            <Tag
              className="tag"
              label={tag}
              onClick={() => handleChangeTag()}
            />
            <MenuContainer className="menu-container" ref={deleteButtonRef}>
              <FiMoreHorizontal
                className="menu-icon"
                onClick={() => handleToggleIsMenuOpen()}
              />
              {isMenuOpen && (
                <div className="menu">
                  <button type="button" onClick={() => handleDeleteTask()}>
                    <MdDelete className="delete-icon" />
                    Delete
                  </button>
                </div>
              )}
            </MenuContainer>
          </div>
          {isToEdit ? (
            <form
              onSubmit={(e) => handleUpdateTaskContent(e)}
              ref={contentRef}
              className="edit-form"
            >
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
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
