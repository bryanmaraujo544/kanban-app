/* eslint-disable react/jsx-no-constructed-context-values */
import { useState, createContext, ReactNode, useEffect } from 'react';

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
  columnsOrder: string[];
  setColumnsOrder: any;
}

interface BoardProviderProps {
  children: ReactNode;
}

export const BoardContext = createContext({} as ContextProps);

export function BoardContextProvider({ children }: BoardProviderProps) {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [columnsInfos, setColumnsInfos] = useState<Column[]>([]);
  const [columnsOrder, setColumnsOrder] = useState<string[]>([]);

  useEffect(() => {
    setAllTasks([
      {
        id: 'abc',
        content: 'criar',
        label: 'green',
      },
      {
        id: 'acb',
        content: 'criar',
        label: 'green',
      },
      {
        id: 'abcd',
        content: 'criar',
        label: 'green',
      },
      {
        id: 'abcde',
        content: 'criar',
        label: 'green',
      },
    ]);

    setColumnsInfos([
      { id: 'cba', title: 'Sprint BackLog', tasksIds: ['abc', 'acb'] },
      { id: 'ab', title: 'Development', tasksIds: ['abcd', 'abcde'] },
    ]);

    setColumnsOrder(['cba', 'ab']);
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