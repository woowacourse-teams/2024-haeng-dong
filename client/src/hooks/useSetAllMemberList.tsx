import {useState} from 'react';

import {ValidateResult} from '@utils/validate/type';
import {requestPutAllMemberList} from '@apis/request/member';

import useEventId from './useEventId/useEventId';

interface UseSetAllMemberListProps {
  validateFuc?: (name: string) => ValidateResult;
  allMemberList: string[];
}

const useSetAllMemberList = ({validateFuc, allMemberList}: UseSetAllMemberListProps) => {
  const [editedAllMemberList, setEditedAllMemberList] = useState<string[]>(allMemberList);
  const [errorMessage, setErrorMessage] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);

  const {eventId} = useEventId();

  const handleNameChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;

    setEditedAllMemberList(prev => {
      const newList = [...prev];
      newList[index] = value;
      return newList;
    });
  };

  // const putAllMemberList = () =>{
  //   requestPutAllMemberList({eventId, memberName: allMemberList[index], editedMemberName: value});
  // }

  console.log(editedAllMemberList);

  return {
    editedAllMemberList,
    handleNameChange,
  };
};

export default useSetAllMemberList;
