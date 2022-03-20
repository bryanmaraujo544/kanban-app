import { useContext } from 'react';
import { BoardContext } from '../../../contexts/BoardContext';
import api from '../../../services/utils/ApiClient';
import { Modal } from '../../Modal';
import { Buttons } from './styles';

interface Props {
  isOpen: boolean;
  setIsOpen: any;
  columnId: number;
}

export const DeleteColumnModal = ({ isOpen, setIsOpen, columnId }: Props) => {
  const { setColumnsInfos, columnsInfos, setColumnsOrder } =
    useContext(BoardContext);

  async function handleDeleteColumn() {
    setColumnsOrder((prevOrder: number[]) =>
      prevOrder.filter((orderColumnId: number) => orderColumnId !== columnId)
    );
    setColumnsInfos((prevColumns: any) =>
      // eslint-disable-next-line eqeqeq
      prevColumns.filter((column: any) => column.id != columnId)
    );

    await api.delete(`/columns/${columnId}`);
    // setIsOpen(false);
  }

  return (
    <Modal
      modalTitle="Delete this Column ?"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <Buttons>
        <button type="button" onClick={() => setIsOpen(false)}>
          No
        </button>
        <button type="button" onClick={() => handleDeleteColumn()}>
          Yes
        </button>
      </Buttons>
    </Modal>
  );
};
