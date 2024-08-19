import {useEffect, useState} from 'react';

import {ValidateResult} from '@utils/validate/type';
import {MemberChange} from '@apis/request/member';

import isArraysEqual from '@utils/isArraysEqual';

import useDeleteAllMemberList from './queries/useRequestDeleteAllMemberList';
import usePutAllMemberList from './queries/useRequestPutAllMemberList';

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
  const [deleteInOriginal, setDeleteInOriginal] = useState<string[]>(allMemberList);
  const [deleteMemberList, setDeleteMemberList] = useState<string[]>([]);

  const {mutate: deleteAllMemberList} = useDeleteAllMemberList();
  const {mutate: putAllMemberList} = usePutAllMemberList();

  useEffect(() => {
    setCanSubmit(!isArraysEqual(editedAllMemberList, allMemberList));
  }, [editedAllMemberList]);

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

    deleteAllMemberList(
      {memberName: memberToDelete},
      {
        onSuccess: () => {
          setDeleteMemberList(prev => [...prev, memberToDelete]);
          setDeleteInOriginal(prev => [...prev.slice(0, index), ...prev.slice(index + 1)]);
          setEditedAllMemberList(prev => [...prev.slice(0, index), ...prev.slice(index + 1)]);
        },
      },
    );
    handleCloseAllMemberListModal();
  };

  const handlePutAllMemberList = async () => {
    // deleteMemberList가 비어있지 않은 경우에만 반복문 실행 (삭제 api 요청)
    if (deleteMemberList.length > 0) {
      for (const deleteMember of deleteMemberList) {
        deleteAllMemberList({memberName: deleteMember});
      }
    }

    const editedMemberName: MemberChange[] = deleteInOriginal
      .map((originalName, index) => {
        if (editedAllMemberList[index] !== originalName) {
          return {before: originalName, after: editedAllMemberList[index]};
        }
        return null; // 조건에 맞지 않으면 null을 반환
      })
      .filter(item => item !== null); // null인 항목을 필터링하여 제거

    putAllMemberList({members: editedMemberName});
    handleCloseAllMemberListModal();
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
