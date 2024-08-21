import {useMutation, useQueryClient} from '@tanstack/react-query';

import {requestPutBillAction} from '@apis/request/bill';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

interface PutBillActionMutationProps {
  actionId: number;
  title: string;
  price: number;
  onSuccessCallback?: () => void; // 콜백 함수 타입을 정의
}

const useRequestPutBillAction = () => {
  const eventId = getEventIdByUrl();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({actionId, title, price}: PutBillActionMutationProps) => {
      const response = await requestPutBillAction({eventId, actionId, title, price});
      return response; // response를 반환하여 onSuccess에서 접근할 수 있게 함
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.stepList]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.memberReport]});

      // 콜백 함수가 전달되었다면 실행
      if (variables.onSuccessCallback) {
        variables.onSuccessCallback();
      }
    },
  });
};

export default useRequestPutBillAction;
