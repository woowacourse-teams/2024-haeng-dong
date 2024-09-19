import {useQuery} from '@tanstack/react-query';

import {requestGetBillDetails} from '@apis/request/bill';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestGetBillDetails = (billId: number) => {
  const eventId = getEventIdByUrl();

  const {data, ...rest} = useQuery({
    queryKey: [QUERY_KEYS.billDetails, billId],
    queryFn: () => requestGetBillDetails({eventId, billId}),
  });

  return {
    reportFromServer: data?.billDetails ?? [],
    ...rest,
  };
};

export default useRequestGetBillDetails;
