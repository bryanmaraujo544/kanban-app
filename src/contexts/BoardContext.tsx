/* eslint-disable camelcase */
/* eslint-disable react/jsx-no-constructed-context-values */
import { useState, createContext, ReactNode, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { parseCookies } from 'nookies';

import api from '../services/utils/ApiClient';

interface Task {
  id: string;
  content: string;
  label: 'red' | 'orange' | 'green';
}

interface Column {
  id: string;
  title: string;
  tasksIds: string[];
}

interface ContextProps {
  allTasks: Task[];
  setAllTasks: any;
  columnsInfos: Column[];
  setColumnsInfos: any;
  columnsOrder: any[];
  setColumnsOrder: any;
}

interface BoardProviderProps {
  children: ReactNode;
}

export const BoardContext = createContext({} as ContextProps);

export function BoardContextProvider({ children }: BoardProviderProps) {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [columnsInfos, setColumnsInfos] = useState<Column[]>([]);
  const [columnsOrder, setColumnsOrder] = useState<number[]>([]);

  const cookies = parseCookies();

  useEffect(() => {
    (async () => {
      const user = jwt_decode(cookies.token) as any;
      const {
        data: { board },
      } = await api.get(`/boards/${user?.id}`);

      const {
        data: { columns },
      } = await api.get(`/columns/${board.id}`);

      const columnsWithTasksIds = columns.map((column: any) => ({
        ...column,
        tasksIds: [],
      }));

      console.log(columnsWithTasksIds);

      setColumnsInfos(columnsWithTasksIds);
      setColumnsOrder([1]);
    })();
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
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}
