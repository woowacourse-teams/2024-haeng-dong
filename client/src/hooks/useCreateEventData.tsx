import {useState} from 'react';

import useSetEventNameStep from './useSetEventNameStep';

// 행사 생성 페이지에서 여러 스텝에 걸쳐 사용되는 상태를 선언해 내려주는 용도의 훅입니다.
const useCreateEventData = () => {
  const eventNameProps = useSetEventNameStep();
  const [eventToken, setEventToken] = useState('');

  return {
    eventNameProps,
    eventToken,
    setEventToken,
  };
};

export default useCreateEventData;
