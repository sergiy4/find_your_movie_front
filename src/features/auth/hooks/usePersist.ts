import { useState, useEffect } from 'react';

const usePersist = (): [boolean, () => void] => {
  // Get flag from local storage
  const adminPanelPersist = localStorage.getItem('FYM_persist');

  // If the flag exists, then we return true, if not, false
  const persistState = adminPanelPersist
    ? JSON.parse(adminPanelPersist)
    : false;

  const [persist, setPersist] = useState<boolean>(persistState);

  // Create a flag toggle function
  const togglePersist = () => setPersist((prev) => !prev);

  useEffect(() => {
    // Set the value of the flag
    localStorage.setItem('FYM_persist', JSON.stringify(persist));
  }, [persist]);

  return [persist, togglePersist];
};

export default usePersist;
