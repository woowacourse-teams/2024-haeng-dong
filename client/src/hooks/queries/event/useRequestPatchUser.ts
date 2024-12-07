import {useMutation, useQueryClient} from '@tanstack/react-query';

import {RequestPatchUser, requestPatchUser} from '@apis/request/event';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestPatchUser = () => {
  const queryClient = useQueryClient();

  const {mutateAsync, ...rest} = useMutation({
    mutationFn: (args: RequestPatchUser) => requestPatchUser({...args}),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.event],
      });
    },
  });

  return {
    patchUser: mutateAsync,
    ...rest,
  };
};

export default useRequestPatchUser;
