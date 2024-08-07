import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {FixedButton, MainLayout, LabelInput, Title, TopNav, Back} from 'haengdong-design';

import RULE from '@constants/rule';
import validateEventPassword from '@utils/validate/validateEventPassword';
import {ROUTER_URLS} from '@constants/routerUrls';
import {requestPostNewEvent} from '@apis/request/event';

const SetEventPasswordPage = () => {
  const [eventName, setEventName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state) {
      navigate(ROUTER_URLS.main);
    } else {
      setEventName(location.state.eventName);
    }
  }, []);

  const submitPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await requestPostNewEvent({eventName, password: parseInt(password)});

    if (response) {
      const {eventId} = response;
      navigate(`${ROUTER_URLS.eventCreateComplete}?${new URLSearchParams({eventId})}`);
    } else {
      // TODO: (@weadie)
      alert('오류님');
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
      <Title title="행사 비밀번호 설정" description="행사 관리에 필요한 4 자리의 숫자 비밀번호를 입력해 주세요." />
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
        <FixedButton disabled={!canSubmit}>행동 개시!</FixedButton>
      </form>
    </MainLayout>
  );
};

export default SetEventPasswordPage;
