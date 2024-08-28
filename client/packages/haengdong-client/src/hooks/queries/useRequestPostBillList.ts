import {useMutation, useQueryClient} from '@tanstack/react-query';

import {requestPostBillList} from '@apis/request/bill';
import {Bill} from 'types/serviceType';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

interface PostBillActionMutationProps {
  billList: Bill[];
}

const useRequestPostBillList = () => {
  const eventId = getEventIdByUrl();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({billList}: PostBillActionMutationProps) => requestPostBillList({eventId, billList}),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.stepList]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.memberReport]});
    },
  });
};

export default useRequestPostBillList;
