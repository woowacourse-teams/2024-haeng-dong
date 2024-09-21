import {useMutation} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';

import {RequestPostToken, requestPostToken} from '@apis/request/auth';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import {ROUTER_URLS} from '@constants/routerUrls';

const useRequestPostLogin = () => {
  const eventId = getEventIdByUrl();
  const navigate = useNavigate();

  const {mutate, ...rest} = useMutation({
    mutationFn: ({password}: RequestPostToken) => requestPostToken({eventId, password}),
    onSuccess: () => {
      navigate(`${ROUTER_URLS.event}/${eventId}/admin`);
    },
  });

  return {postLogin: mutate, ...rest};
};

export default useRequestPostLogin;
