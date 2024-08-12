import type {MemberType, Bill, BillAction, BillStep, MemberStep} from 'types/serviceType.ts';

import {PropsWithChildren, createContext, useContext, useEffect, useState} from 'react';

import {requestPostBillList} from '@apis/request/bill';
import {requestGetAllMemberList, requestPostMemberList} from '@apis/request/member';
import {requestGetStepList} from '@apis/request/stepList';

import useEventId from '@hooks/useEventId';

import {useFetch} from '@apis/useFetch';

interface StepListContextProps {
  stepList: (BillStep | MemberStep)[];
  allMemberList: string[];
  getTotalPrice: () => number;
  addBill: (billList: Bill[], onSuccess: () => void) => Promise<void>;
  updateMemberList: ({type, memberNameList}: {type: MemberType; memberNameList: string[]}) => Promise<void>;
  refreshStepList: () => Promise<void>;
}

export const StepListContext = createContext<StepListContextProps | null>(null); // TODO: (@weadie) 인자를 어떻게 줘야 하는지 고민하기.

const StepListProvider = ({children}: PropsWithChildren) => {
  const {fetch} = useFetch();
  const [stepList, setStepList] = useState<(BillStep | MemberStep)[]>([]);
  const [allMemberList, setAllMemberList] = useState<string[]>([]);

  const {eventId} = useEventId();

  useEffect(() => {
    if (eventId === '') return;

    refreshStepList();

    // TODO: (@weadie) useEffect를 꼭 써야하는가?
  }, [eventId]);

  const refreshStepList = async () => {
    const stepList = await fetch({queryFunction: () => requestGetStepList({eventId})});

    getAllMemberList();
    setStepList(stepList);
  };

  const updateMemberList = async ({type, memberNameList}: {type: MemberType; memberNameList: string[]}) => {
    try {
      await fetch({queryFunction: () => requestPostMemberList({eventId, type, memberNameList})});

      refreshStepList();
    } catch (error) {
      alert(error);
    }
  };

  const getAllMemberList = async () => {
    const allMembers = await requestGetAllMemberList({eventId});

    setAllMemberList(allMembers.memberNames);
  };

  const addBill = async (billList: Bill[], onSuccess: () => void) => {
    // TODO: (@weadie) 에러 처리
    await fetch({
      queryFunction: () => requestPostBillList({eventId, billList}),
      onSuccess: () => {
        refreshStepList();
        onSuccess();
      },
    });
  };

  const calculateBillSum = (actions: BillAction[]) => {
    return actions.reduce((sum, {price}) => sum + price, 0);
  };

  const getTotalPrice = () => {
    return stepList.reduce((sum, {type, actions}) => {
      if (type === 'BILL') {
        return sum + calculateBillSum(actions);
      }
      return sum;
    }, 0);
  };

  return (
    <StepListContext.Provider
      value={{
        addBill,
        getTotalPrice,
        updateMemberList,
        stepList,
        allMemberList,
        refreshStepList,
      }}
    >
      {children}
    </StepListContext.Provider>
  );
};

export const useStepList = () => {
  const context = useContext(StepListContext);

  if (!context) {
    throw new Error('useStepList는 StepListProvider 내에서 사용되어야 합니다.');
  }
  return context;
};

export default StepListProvider;
