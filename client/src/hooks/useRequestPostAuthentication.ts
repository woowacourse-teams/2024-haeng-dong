import {useMutation} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';

import {requestAuthentication} from '@apis/request/auth';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import {ROUTER_URLS} from '@constants/routerUrls';

const useRequestPostAuthenticate = () => {
  const eventId = getEventIdByUrl();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => requestAuthentication({eventId}),
    onError: () => {
      // 에러가 발생하면 로그인 페이지로 리다이렉트
      navigate(`${ROUTER_URLS.event}/${eventId}/login`);
    },
  });
};

export default useRequestPostAuthenticate;
