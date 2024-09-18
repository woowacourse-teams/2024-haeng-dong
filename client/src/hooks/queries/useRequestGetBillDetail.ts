import {useQuery} from '@tanstack/react-query';

import {requestGetBillDetail} from '@apis/request/bill';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestGetBillDetail = (billId: number) => {
  const eventId = getEventIdByUrl();

  return useQuery({
    queryKey: [QUERY_KEYS.billDetail, billId],
    queryFn: () => requestGetBillDetail({eventId, billId}),
  });
};

export default useRequestGetBillDetail;
