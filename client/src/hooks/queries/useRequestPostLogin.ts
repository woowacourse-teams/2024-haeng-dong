import {useMutation} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';

import {requestPostToken} from '@apis/request/auth';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import {ROUTER_URLS} from '@constants/routerUrls';

interface PostLoginMutationProps {
  password: string;
}

const useRequestPostLogin = () => {
  const eventId = getEventIdByUrl();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({password}: PostLoginMutationProps) => requestPostToken({eventId, password}),
    onSuccess: () => {
      navigate(`${ROUTER_URLS.event}/${eventId}/admin`);
    },
  });
};

export default useRequestPostLogin;
