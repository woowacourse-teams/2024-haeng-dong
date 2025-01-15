import {useQuery} from '@tanstack/react-query';

import {requestGetImages} from '@apis/request/images';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestGetImages = () => {
  const eventId = getEventIdByUrl();

  const {data, ...rest} = useQuery({
    queryKey: [QUERY_KEYS.images, eventId],
    queryFn: () => requestGetImages({eventId}),
  });

  return {images: data?.images ?? [], ...rest};
};

export default useRequestGetImages;
