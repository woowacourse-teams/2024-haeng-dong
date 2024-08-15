import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {FixedButton, MainLayout, LabelInput, Title, TopNav, Back} from 'haengdong-design';

import useSetPassword from '@hooks/useSetPassword';

import RULE from '@constants/rule';
import {ROUTER_URLS} from '@constants/routerUrls';

const SetEventPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state) {
      navigate(ROUTER_URLS.main);
    }
  }, [location.state]);

  const {password, errorMessage, canSubmit, submitPassword, handleChange} = useSetPassword(location.state?.eventName);

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
        />
        <FixedButton disabled={!canSubmit}>행동 개시!</FixedButton>
      </form>
    </MainLayout>
  );
};

export default SetEventPasswordPage;
