/** @jsxImportSource @emotion/react */
import {createContext, PropsWithChildren, useContext, useState} from 'react';

interface EditableItemContextProps {
  hasAnyFocus: boolean;
  setHasAnyFocus: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditableItemContext = createContext<EditableItemContextProps | null>(null);

export const useEditableItemContext = () => {
  const context = useContext(EditableItemContext);
  if (!context) {
    throw new Error('useEditableItemContext must be used within an EditableItemProvider');
  }
  return context;
};

export const EditableItemProvider: React.FC<PropsWithChildren> = ({children}: React.PropsWithChildren) => {
  const [hasAnyFocus, setHasAnyFocus] = useState(false);

  return <EditableItemContext.Provider value={{hasAnyFocus, setHasAnyFocus}}>{children}</EditableItemContext.Provider>;
};
