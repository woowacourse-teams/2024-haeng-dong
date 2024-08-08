import {useState} from 'react';

import {ValidateResult} from '@utils/validate/type';
import {requestDeleteAllMemberList, requestPutAllMemberList} from '@apis/request/member';

import {useFetch} from '@apis/useFetch';

import useEventId from './useEventId/useEventId';
import {useStepList} from './useStepList/useStepList';

interface UseSetAllMemberListProps {
  validateFunc: (name: string) => ValidateResult;
  allMemberList: string[];
  handleCloseAllMemberListModal: () => void;
}

const useSetAllMemberList = ({
  validateFunc,
  allMemberList,
  handleCloseAllMemberListModal,
}: UseSetAllMemberListProps) => {
  const [editedAllMemberList, setEditedAllMemberList] = useState<string[]>(allMemberList);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorIndexList, setErrorIndexList] = useState<number[]>([]);
  const [canSubmit, setCanSubmit] = useState(false);

  const {refreshStepList} = useStepList();
  const {eventId} = useEventId();
  const {fetch} = useFetch();

  const handleNameChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    const {isValid, errorMessage: validationResultMessage} = validateFunc(value);

    if (isValid && value.length !== 0) {
      setErrorMessage('');

      setEditedAllMemberList(prev => {
        const newList = [...prev];
        newList[index] = value;
        return newList;
      });

      setErrorIndexList(prev => prev.filter(i => i !== index));

      setCanSubmit(true);
    } else if (value.length === 0) {
      setErrorMessage('');

      setEditedAllMemberList(prev => {
        const newList = [...prev];
        newList[index] = value;
        return newList;
      });

      changeErrorIndex(index);

      setCanSubmit(false);
    } else {
      setErrorMessage(validationResultMessage ?? '');

      changeErrorIndex(index);

      setCanSubmit(false);
    }
  };

  const handleClickDeleteButton = async (index: number) => {
    const memberToDelete = editedAllMemberList[index];

    await fetch(() => requestDeleteAllMemberList({eventId, memberName: memberToDelete}));

    setEditedAllMemberList(prev => [...prev.slice(0, index), ...prev.slice(index + 1)]);

    refreshStepList();
  };

  // const putAllMemberList = () =>{
  //   requestPutAllMemberList({eventId, memberName: allMemberList[index], editedMemberName: value});
  // }

  const changeErrorIndex = (index: number) => {
    setErrorIndexList(prev => {
      if (!prev.includes(index)) {
        return [...prev, index];
      }
      return prev;
    });
  };

  return {
    editedAllMemberList,
    canSubmit,
    errorMessage,
    errorIndexList,
    handleNameChange,
    handleClickDeleteButton,
  };
};

export default useSetAllMemberList;
