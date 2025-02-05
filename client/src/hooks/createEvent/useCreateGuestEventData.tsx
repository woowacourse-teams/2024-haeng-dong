import {useState} from 'react';

import useMemberName from '@hooks/useMemberName';

import useSetEventNameStep from './useSetEventNameStep';

// 행사 생성 페이지에서 여러 스텝에 걸쳐 사용되는 상태를 선언해 내려주는 용도의 훅입니다.
const useCreateGuestEventData = () => {
  const eventNameProps = useSetEventNameStep();
  const {name: nickname, handleNameChange: handleNicknameChange, ...rest} = useMemberName();
  const [eventToken, setEventToken] = useState('');

  return {
    eventNameProps,
    eventToken,
    setEventToken,
    nicknameProps: {
      nickname,
      handleNicknameChange,
      ...rest,
    },
  };
};

export default useCreateGuestEventData;
