import {useMutation, useQueryClient} from '@tanstack/react-query';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';
import {requestPostImages, RequestPostImages} from '@apis/request/images';

const useRequestPostImages = () => {
  const eventId = getEventIdByUrl();
  const queryClient = useQueryClient();

  const {mutate, ...rest} = useMutation({
    mutationFn: ({formData}: RequestPostImages) => requestPostImages({eventId, formData}),
    onSuccess: responseData => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.images]});
      return responseData;
    },
  });

  return {postImages: mutate, ...rest};
};

export default useRequestPostImages;
