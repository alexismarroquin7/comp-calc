import { useState } from 'react';

const useLocalStorage = (key, initialValue) => {
  const isClient = typeof window === 'object';

  // Get the initial value from local storage or use the provided initialValue
  const initialStoredValue = isClient ? localStorage.getItem(key) : null;
  const initialValueToUse = isClient && initialStoredValue ? JSON.parse(initialStoredValue) : initialValue;

  // State to hold the current value
  const [value, setValue] = useState(initialValueToUse);

  // Function to update the value in local storage and state
  const setStoredValue = (newValue) => {
    setValue(newValue);
    isClient && localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue];
};

export default useLocalStorage;
