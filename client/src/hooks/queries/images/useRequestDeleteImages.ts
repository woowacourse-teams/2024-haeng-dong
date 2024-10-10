import {useMutation, useQueryClient} from '@tanstack/react-query';

import {requestDeleteImage, RequestDeleteImage} from '@apis/request/images';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestDeleteImage = () => {
  const eventId = getEventIdByUrl();
  const queryClient = useQueryClient();

  const {mutate, ...rest} = useMutation({
    mutationFn: ({imageId}: RequestDeleteImage) => requestDeleteImage({eventId, imageId}),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.images]});
    },
  });

  return {deleteImage: mutate, ...rest};
};

export default useRequestDeleteImage;
