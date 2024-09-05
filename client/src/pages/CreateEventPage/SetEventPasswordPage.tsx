import useSetEventPasswordPage from '@hooks/useSetEventPasswordPage';

import {FixedButton, MainLayout, LabelInput, Title, TopNav, Back} from '@HDesign/index';

import RULE from '@constants/rule';
import {PASSWORD_LENGTH} from '@constants/password';

const SetEventPasswordPage = () => {
  const {submitPassword, errorMessage, password, handleChange, canSubmit, isPostEventPending} =
    useSetEventPasswordPage();

  return (
    <MainLayout backgroundColor="white">
      <TopNav>
        <Back />
      </TopNav>
      <Title
        title="행사 비밀번호 설정"
        description={`행사 관리에 필요한 ${PASSWORD_LENGTH} 자리의 숫자 비밀번호를 입력해 주세요.`}
      />
      <form onSubmit={submitPassword} style={{padding: '0 1rem'}}>
        <LabelInput
          labelText="비밀번호"
          errorText={errorMessage}
          value={password}
          type="text"
          maxLength={RULE.maxEventPasswordLength}
          placeholder="비밀번호"
          onChange={handleChange}
          isError={!!errorMessage}
          autoFocus
        />
        <FixedButton variants={isPostEventPending ? 'loading' : 'primary'} disabled={!canSubmit}>
          행동 개시!
        </FixedButton>
      </form>
    </MainLayout>
  );
};

export default SetEventPasswordPage;
