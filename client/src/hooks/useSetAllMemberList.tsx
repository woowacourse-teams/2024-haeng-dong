import {useState} from 'react';

import {ValidateResult} from '@utils/validate/type';
import {requestDeleteAllMemberList, requestPutAllMemberList} from '@apis/request/member';

import useEventId from './useEventId/useEventId';

interface UseSetAllMemberListProps {
  validateFunc: (name: string) => ValidateResult;
  allMemberList: string[];
}

const useSetAllMemberList = ({validateFunc, allMemberList}: UseSetAllMemberListProps) => {
  const [editedAllMemberList, setEditedAllMemberList] = useState<string[]>(allMemberList);
  const [errorMessage, setErrorMessage] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);

  const {eventId} = useEventId();

  const handleNameChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    const {isValid, errorMessage} = validateFunc(value);

    if (isValid && value.length !== 0) {
      setErrorMessage('');
      setEditedAllMemberList(prev => {
        const newList = [...prev];
        newList[index] = value;
        return newList;
      });
      setCanSubmit(true);
    } else if (value.length === 0) {
      setErrorMessage(errorMessage!);
      setCanSubmit(false);
      setEditedAllMemberList(prev => {
        const newList = [...prev];
        newList[index] = value;
        return newList;
      });
    } else {
      setErrorMessage(errorMessage!);
      setCanSubmit(false);
    }
  };

  const handleClickDeleteButton = async (index: number) => {
    const memberToDelete = editedAllMemberList[index];

    await requestDeleteAllMemberList({eventId, memberName: memberToDelete});

    setEditedAllMemberList(prev => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  };

  // const putAllMemberList = () =>{
  //   requestPutAllMemberList({eventId, memberName: allMemberList[index], editedMemberName: value});
  // }

  console.log(editedAllMemberList);

  return {
    editedAllMemberList,
    canSubmit,
    handleNameChange,
    handleClickDeleteButton,
  };
};

export default useSetAllMemberList;
