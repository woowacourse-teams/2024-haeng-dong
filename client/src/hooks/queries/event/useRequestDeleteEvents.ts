import {useMutation, useQueryClient} from '@tanstack/react-query';

import {requestDeleteEvents} from '@apis/request/event';
import toast from '@hooks/useToast/toast';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestDeleteEvents = () => {
  const queryClient = useQueryClient();

  const {mutateAsync} = useMutation({
    mutationFn: requestDeleteEvents,
    onSuccess: () => {
      toast.confirm('행사가 정상적으로 삭제되었습니다');
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.createdEvents]});
    },
  });

  return {
    deleteEvents: mutateAsync,
  };
};

export default useRequestDeleteEvents;
