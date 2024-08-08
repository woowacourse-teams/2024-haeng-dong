import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {FixedButton, MainLayout, LabelInput, Title, TopNav, Back} from 'haengdong-design';

import validateEventPassword from '@utils/validate/validateEventPassword';
import {requestPostNewEvent} from '@apis/request/event';

import useEvent from '@hooks/useEvent';

import RULE from '@constants/rule';
import {ROUTER_URLS} from '@constants/routerUrls';
import useEventId from '@hooks/useEventId/useEventId';
import useAuth from '@hooks/useAuth';

const EventLoginPage = () => {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);
  const navigate = useNavigate();
  const {eventId} = useEventId();
  const {postLogin} = useAuth();

  const submitPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await postLogin({eventId, password});
      navigate(`${ROUTER_URLS.event}/${eventId}/admin`);
    } catch (error) {
      setErrorMessage('잘못된 비밀번호에요');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const validation = validateEventPassword(newValue);

    setCanSubmit(newValue.length === RULE.maxEventPasswordLength);

    if (validation.isValid) {
      setPassword(newValue);
      setErrorMessage('');
    } else {
      event.target.value = password;
      setErrorMessage(validation.errorMessage ?? '');
    }
  };
  return (
    <MainLayout>
      <TopNav>
        <Back />
      </TopNav>
      <Title
        title="행사 비밀번호 입력"
        description="관리를 위해선 비밀번호가 필요해요. \n행사 생성 시 설정한 4 자리의 숫자 비밀번호를 입력해 주세요."
      />
      <form onSubmit={submitPassword} style={{padding: '0 1rem'}}>
        <LabelInput
          labelText="비밀번호"
          errorText={errorMessage}
          value={password}
          type="secret"
          maxLength={RULE.maxEventPasswordLength}
          placeholder="비밀번호"
          onChange={e => handleChange(e)}
          isError={!!errorMessage}
          autoFocus
        ></LabelInput>
        <FixedButton disabled={!canSubmit}>관리 페이지로</FixedButton>
      </form>
    </MainLayout>
  );
};

export default EventLoginPage;
