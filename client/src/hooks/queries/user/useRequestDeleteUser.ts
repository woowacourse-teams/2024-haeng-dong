import {useMutation, useQueryClient} from '@tanstack/react-query';

import {requestDeleteUser} from '@apis/request/user';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestDeleteUser = () => {
  const queryClient = useQueryClient();

  const {mutateAsync, ...rest} = useMutation({
    mutationFn: () => requestDeleteUser(),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.kakaoLogin]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.kakaoClientId]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.userInfo]});
    },
  });

  return {deleteAsyncUser: mutateAsync, ...rest};
};

export default useRequestDeleteUser;
