/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-no-constructed-context-values */
import { useState, createContext, ReactNode, useEffect, useRef } from 'react';
import jwt_decode from 'jwt-decode';
import { parseCookies } from 'nookies';

import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/utils/ApiClient';
import { useLocalStorage } from '../hooks/useLocalStorage';
// import { useLocalStorage } from '../hooks/useLocalStorage';

interface Task {
  id: number;
  title: string;
  tag: 'red' | 'orange' | 'green';
  column_id: number;
  index: number;
  board_id: number;
}

interface Column {
  id: number;
  title: string;
  tasksIds: number[];
}

interface ContextProps {
  allTasks: Task[];
  setAllTasks: any;
  columnsInfos: any[];
  setColumnsInfos: any;
  columnsOrder: number[];
  setColumnsOrder: any;
  boardInfos: any;
}

interface BoardProviderProps {
  children: ReactNode;
}

export const BoardContext = createContext({} as ContextProps);

export function BoardContextProvider({ children }: BoardProviderProps) {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [columnsInfos, setColumnsInfos] = useState<any[]>([]);
  const [columnsOrder, setColumnsOrder] = useState([]);
  const [boardInfos, setBoardInfos] = useState({} as any);
  const cookies = parseCookies();

  const { boardId } = useParams();
  console.log({ boardId });
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        if (boardId === undefined || boardId === null) {
          navigate('/login');
        }
        const user = jwt_decode(cookies?.token) as any;
        if (!user) {
          return;
        }

        const {
          data: { board },
        } = await api.get(`/boards/${user?.id}`);
        setBoardInfos({ id: Number(boardId) });

        const {
          data: { columns },
        } = await api.get(`/columns/${Number(boardId)}`);

        const {
          data: { tasks },
        } = await api.get(`/tasks/${Number(boardId)}`);
        setAllTasks(tasks);

        const columnsWithTasksIds = columns.map((column: any) => {
          const tasksOfTheColumn = tasks.filter(
            (task: any) => task.column_id === column.id
          );
          // Sorting the columns in ascending way by index value
          tasksOfTheColumn.sort((a: any, b: any) => a.index - b.index);

          const tasksIds = tasksOfTheColumn.map((task: any) => task.id);
          return { ...column, tasksIds };
        });
        setColumnsInfos(columnsWithTasksIds);

        const {
          data: { columnsOrder },
        } = await api.get(`/columns-order/${boardId}`);

        const columnsId = columnsOrder.map((column: any) => column.column_id);
        setColumnsOrder(columnsId);
      } catch (err) {
        console.log('Error from BoardContext UseEffect', err);
      }
    })() as any;
  }, []);

  return (
    <BoardContext.Provider
      value={{
        allTasks,
        setAllTasks,
        columnsInfos,
        setColumnsInfos,
        columnsOrder,
        setColumnsOrder,
        boardInfos,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}
