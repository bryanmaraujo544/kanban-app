import { useState } from 'react';

export const useLocalStorage = (key: string, initialValue: any) => {
  const [state, setState] = useState(() => {
    try {
      const stateStoraged = localStorage.getItem(key);
      return stateStoraged ? JSON.parse(stateStoraged) : initialValue;
    } catch {
      return initialValue;
    }
  });

  function setValue(value: any) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      setState(value);
    } catch (err) {
      console.log(err);
    }
  }

  return [state, setValue];
};
