import {useMutation, useQueryClient} from '@tanstack/react-query';

import {RequestPatchUser, requestPatchUser} from '@apis/request/user';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestPatchUser = () => {
  const queryClient = useQueryClient();

  const {mutateAsync, ...rest} = useMutation({
    mutationFn: (args: RequestPatchUser) => requestPatchUser({...args}),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.userInfo],
      });
    },
  });

  return {
    patchUser: mutateAsync,
    ...rest,
  };
};

export default useRequestPatchUser;
