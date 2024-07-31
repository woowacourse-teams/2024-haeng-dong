import React, {createContext, PropsWithChildren, useContext, useState} from 'react';

interface GroupInputContextProps {
  hasAnyFocus: boolean;
  setHasAnyFocus: React.Dispatch<React.SetStateAction<boolean>>;
  values: {[key: string]: string};
  setValues: React.Dispatch<React.SetStateAction<{[key: string]: string}>>;
  hasErrors: {[key: string]: boolean};
  setHasErrors: React.Dispatch<React.SetStateAction<{[key: string]: boolean}>>;
}

const GroupInputContext = createContext<GroupInputContextProps | undefined>(undefined);

export const useGroupInputContext = () => {
  const context = useContext(GroupInputContext);
  if (!context) {
    throw new Error('useGroupInputContext must be used within an GroupInputProvider');
  }
  return context;
};

export const GroupInputProvider: React.FC<PropsWithChildren> = ({children}: React.PropsWithChildren) => {
  const [hasAnyFocus, setHasAnyFocus] = useState(false);
  const [values, setValues] = useState<{[key: string]: string}>({});
  const [hasErrors, setHasErrors] = useState<{[key: string]: boolean}>({});

  return (
    <GroupInputContext.Provider value={{hasAnyFocus, setHasAnyFocus, values, setValues, hasErrors, setHasErrors}}>
      {children}
    </GroupInputContext.Provider>
  );
};
