import { useState, SetStateAction } from "react";
export const useTimeoutState = <T>(
  initialValue: T,
  timeout
): [T | null, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T | null>(initialValue);

  const setStateValue = (value: SetStateAction<T>) => {
    setValue(value);
    setTimeout(() => {
      setValue(undefined as any);
    }, timeout);
  };

  return [value, setStateValue];
};
