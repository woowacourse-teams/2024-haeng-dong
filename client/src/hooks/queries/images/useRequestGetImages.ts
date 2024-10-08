import {useQuery} from '@tanstack/react-query';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';
import {RequestGetImages, requestGetImages} from '@apis/request/images';

const useRequestGetImages = ({...props}: RequestGetImages) => {
  const eventId = getEventIdByUrl();

  const {data, ...rest} = useQuery({
    queryKey: [QUERY_KEYS.images],
    queryFn: () => requestGetImages({eventId, ...props}),
  });

  return {iamges: data?.eventId ?? [], ...rest};
};

export default useRequestGetImages;
