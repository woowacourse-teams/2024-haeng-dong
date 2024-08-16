import {useEffect, useState} from 'react';

import {ValidateResult} from '@utils/validate/type';
import {MemberChange, requestDeleteAllMemberList, requestPutAllMemberList} from '@apis/request/member';

import {useFetch} from '@apis/useFetch';

import isArraysEqual from '@utils/isArraysEqual';
import getEventIdByUrl from '@utils/getEventIdByUrl';

import {useStepList} from './useStepList';
import useInput from './useInput';

interface UseSetAllMemberListProps {
  validateFunc: (name: string) => ValidateResult;
  allMemberList: string[];
  handleCloseAllMemberListModal: () => void;
}

interface UseSetAllMemberListReturns {
  editedAllMemberList: string[];
  canSubmit: boolean;
  errorMessage: string;
  errorIndexList: number[];
  handleNameChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickDeleteButton: (index: number) => Promise<void>;
  handlePutAllMemberList: () => Promise<void>;
}

const useSetAllMemberList = ({
  validateFunc,
  allMemberList,
  handleCloseAllMemberListModal,
}: UseSetAllMemberListProps): UseSetAllMemberListReturns => {
  const initialInputList = allMemberList.map((name, index) => ({index, value: name}));
  const {
    inputList,
    errorMessage,
    errorIndexList,
    canSubmit,
    handleChange,
    setInputList: setEditedAllMemberList,
    setCanSubmit,
  } = useInput({validateFunc, initialInputList});

  const [deleteInOriginal, setDeleteInOriginal] = useState<string[]>(allMemberList);
  const [deleteMemberList, setDeleteMemberList] = useState<string[]>([]);

  const editedAllMemberList = inputList.map(input => input.value);

  const {refreshStepList} = useStepList();
  const eventId = getEventIdByUrl();
  const {fetch} = useFetch();

  useEffect(() => {
    setCanSubmit(!isArraysEqual(editedAllMemberList, allMemberList));
  }, [editedAllMemberList]);

  const handleNameChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;

    handleChange(index, value);
  };

  const handleClickDeleteButton = async (index: number) => {
    const memberToDelete = editedAllMemberList[index];

    await fetch({
      queryFunction: () => requestDeleteAllMemberList({eventId, memberName: memberToDelete}),
      onSuccess: () => {
        setDeleteMemberList(prev => [...prev, memberToDelete]);
        setDeleteInOriginal(prev => [...prev.slice(0, index), ...prev.slice(index + 1)]);

        setEditedAllMemberList(prev => [...prev.slice(0, index), ...prev.slice(index + 1)]);
        refreshStepList();
      },
    });
  };

  const handlePutAllMemberList = async () => {
    // deleteMemberList가 비어있지 않은 경우에만 반복문 실행 (삭제 api 요청)
    if (deleteMemberList.length > 0) {
      for (const deleteMember of deleteMemberList) {
        await fetch({queryFunction: () => requestDeleteAllMemberList({eventId, memberName: deleteMember})});
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

    await fetch({
      queryFunction: () => requestPutAllMemberList({eventId, members: editedMemberName}),
      onSuccess: () => {
        refreshStepList();
        handleCloseAllMemberListModal();
      },
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
