import {useQuery} from '@tanstack/react-query';

import {requestGetBillDetails} from '@apis/request/bill';
import {WithErrorHandlingStrategy} from '@errors/RequestGetError';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

type UseRequestGetBillDetails = {
  billId: number;
};

const useRequestGetBillDetails = ({billId, ...props}: WithErrorHandlingStrategy<UseRequestGetBillDetails>) => {
  const eventId = getEventIdByUrl();

  const {data, ...rest} = useQuery({
    queryKey: [QUERY_KEYS.billDetails, billId],
    queryFn: () => requestGetBillDetails({eventId, billId, ...props}),
  });

  return {
    members: data?.members ?? [],
    ...rest,
  };
};

export default useRequestGetBillDetails;
