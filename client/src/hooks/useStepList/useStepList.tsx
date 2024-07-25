import {PropsWithChildren, createContext, useEffect, useState} from 'react';

import {Bill, BillAction, MemberType, StepList} from 'types/stepList';
import {requestStepList} from '@apis/request/stepList';
import useEventId from '@hooks/useEventId/useEventId';
import {requestAddBillList} from '@apis/request/bill';
import {requestUpdateMemberList} from '@apis/request/member';

import stepListJsonData from '@mocks/stepList.json';

interface StepListContext {
  stepList: StepList;
  getTotalPrice: () => number;
  addBill: (billList: Bill[]) => Promise<void>;
  updateMemberList: ({type, memberNameList}: {type: MemberType; memberNameList: string[]}) => Promise<void>;
}

const stepListMockData = stepListJsonData as StepList;

const useStepList = () => {
  const [stepList, setStepList] = useState<StepList>(stepListMockData);
  const {eventId} = useEventId();

  useEffect(() => {
    if (eventId === '') return;

    const getStepList = async () => {
      // TODO: (@weadie) 아직 구현 안된 api입니다.
      // const stepList = await requestStepList({eventId});
      console.log(stepList);

      setStepList(stepList);
    };

    getStepList();
    // TODO: (@weadie) useEffect를 꼭 써야하는가?
    // 초기 리스트 불러서 setActionList
  }, [eventId]);

  const updateMemberList = async ({type, memberNameList}: {type: MemberType; memberNameList: string[]}) => {
    await requestUpdateMemberList({eventId, type, memberNameList});
  };

  const addBill = async (billList: Bill[]) => {
    // TODO: (@weadie) 에러 처리
    await requestAddBillList({eventId, billList});
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

  return {stepList, getTotalPrice, addBill, updateMemberList};
};

// TODO: (@soha) any 수정
export const StepListContext = createContext<StepListContext | undefined>([]); // TODO: (@weadie) 인자를 어떻게 줘야 하는지 고민하기.

const StepListProvider = ({children}: PropsWithChildren) => {
  const stepListProps = useStepList();

  return <StepListContext.Provider value={stepListProps}>{children}</StepListContext.Provider>;
};

export {useStepList, StepListProvider};
