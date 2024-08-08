import {useState} from 'react';

import {ValidateResult} from '@utils/validate/type';
import {requestPutAllMemberList} from '@apis/request/member';

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
      // event.target.value = editedAllMemberList[index];
      console.log(event.target);
      console.log(editedAllMemberList[index]);
      setErrorMessage(errorMessage!);
      setCanSubmit(false);
      // console.log(canSubmit);
    }
  };

  // const putAllMemberList = () =>{
  //   requestPutAllMemberList({eventId, memberName: allMemberList[index], editedMemberName: value});
  // }

  console.log(editedAllMemberList);

  return {
    editedAllMemberList,
    canSubmit,
    handleNameChange,
  };
};

export default useSetAllMemberList;
