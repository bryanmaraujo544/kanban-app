import { useContext, useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { BsCheck } from 'react-icons/bs';
import api from '../../../services/utils/ApiClient';

import { ModalForm, TextArea, Tag } from './styles';
import { BoardContext } from '../../../contexts/BoardContext';
import { Modal } from '../../Modal';

const cardsTags = [
  { name: 'green', color: '#70e000' },
  { name: 'orange', color: '#f9a620' },
  { name: 'red', color: '#ef233c' },
];

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: any;
  tasksOfTheColumn: any;
  columnId: number;
  tasksIds: number[];
}

export const CreateTaskModal = ({
  isModalOpen,
  setIsModalOpen,
  tasksOfTheColumn,
  columnId,
  tasksIds,
}: Props) => {
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardTag, setNewCardTag] = useState('green');
  const { setAllTasks, setColumnsInfos, boardInfos } = useContext(BoardContext);
  const modalTextAreaRef = useRef<any>();

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
        columnId,
        boardId: boardInfos.id,
        index: tasksOfTheColumn.length,
      });

      setAllTasks((prevAllTasks: any) => [...prevAllTasks, task]);

      setColumnsInfos((prevColumn: any) =>
        prevColumn.map((prevColumn: any) => {
          if (prevColumn.id === columnId) {
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

  return (
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
  );
};
