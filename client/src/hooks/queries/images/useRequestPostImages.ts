import {useMutation, useQueryClient} from '@tanstack/react-query';

import {requestPostImages, RequestPostImages} from '@apis/request/images';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestPostImages = () => {
  const eventId = getEventIdByUrl();
  const queryClient = useQueryClient();

  const {mutateAsync, ...rest} = useMutation({
    mutationFn: ({formData}: RequestPostImages) => requestPostImages({eventId, formData}),
    onSuccess: () => {
      queryClient.removeQueries({queryKey: [QUERY_KEYS.images, eventId]});
    },
  });

  return {postImages: mutateAsync, ...rest};
};

export default useRequestPostImages;
