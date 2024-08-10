import {useEffect, useState} from 'react';

import {ValidateResult} from '@utils/validate/type';
import {MemberChange, requestDeleteAllMemberList, requestPutAllMemberList} from '@apis/request/member';

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

  useEffect(() => {
    if (arraysEqual(editedAllMemberList, allMemberList)) {
      setCanSubmit(false);
    } else {
      setCanSubmit(true);
    }
  }, [editedAllMemberList]);

  const arraysEqual = (arr1: string[], arr2: string[]) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

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
    } else {
      setErrorMessage(validationResultMessage ?? '');

      changeErrorIndex(index);
    }
  };

  const handleClickDeleteButton = async (index: number) => {
    const memberToDelete = editedAllMemberList[index];

    await fetch({
      queryFunction: () => requestDeleteAllMemberList({eventId, memberName: memberToDelete}),
      onSuccess: () => {
        setEditedAllMemberList(prev => [...prev.slice(0, index), ...prev.slice(index + 1)]);
        refreshStepList();
      },
    });
  };

  const handlePutAllMemberList = async () => {
    const editedMemberName: MemberChange[] = allMemberList
      .map((originalName, index) => {
        if (editedAllMemberList[index] !== originalName) {
          return {before: originalName, after: editedAllMemberList[index]};
        }
        return null; // 조건에 맞지 않으면 null을 반환
      })
      .filter(item => item !== null); // null인 항목을 필터링하여 제거

    await fetch({
      queryFunction: () => requestPutAllMemberList({eventId, members: editedMemberName}),
      onSuccess: () => {
        refreshStepList();
        handleCloseAllMemberListModal();
      },
    });
  };

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
    handlePutAllMemberList,
  };
};

export default useSetAllMemberList;
