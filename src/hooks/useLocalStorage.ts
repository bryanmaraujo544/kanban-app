import { useCallback, useState } from 'react';

export const useLocalStorage = (key: string, initialValue: any) => {
  const [state, setState] = useState(() => {
    try {
      const stateStoraged = localStorage.getItem(key);
      console.log({ stateStoraged, initialValue });
      return stateStoraged ? JSON.parse(stateStoraged) : initialValue;
    } catch {
      console.log('error');
      return initialValue;
    }
  });

  console.log('State', state);

  console.log({ key: state });

  const setValue = useCallback(
    (value: any) => {
      console.log({ value });
      try {
        setState(value);
        localStorage.setItem(key, JSON.stringify(value));
      } catch (err: any) {
        console.log('error in setValue', err);
      }
    },
    [key]
  );

  // function setValue(value: any) {
  //   try {
  //     localStorage.setItem(key, JSON.stringify(value));
  //     setState(value);
  //   } catch (err) {
  //     console.log('err from useLocal', err);
  //   }
  // }

  return [state, setValue];
};
