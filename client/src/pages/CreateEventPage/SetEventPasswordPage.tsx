import useSetEventPasswordPage from '@hooks/useSetEventPasswordPage';

import {FixedButton, MainLayout, LabelInput, Title, TopNav, Back} from '@HDesign/index';

import RULE from '@constants/rule';
import {PASSWORD_LENGTH} from '@constants/password';
import {css} from '@emotion/react';
import Top from '@components/Design/components/Top/Top';

const SetEventPasswordPage = () => {
  const {submitPassword, onSuccess, errorMessage, password, handleChange, canSubmit, isPostEventPending} =
    useSetEventPasswordPage();

  const handleGoNextStep = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'enter') {
      onSuccess();
    }
  };

  return (
    <MainLayout backgroundColor="white">
      <TopNav>
        <Back />
      </TopNav>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1rem;
        `}
      >
        <Top>
          <Top.Line text="정산을 시작하려는" />
          <Top.Line text="행사의 이름은 무엇인가요?" emphasize={['행사의 이름']} />
        </Top>
        <form onSubmit={submitPassword}>
          <LabelInput
            labelText="1234"
            errorText={errorMessage}
            value={password}
            type="text"
            maxLength={RULE.maxEventPasswordLength}
            placeholder="비밀번호"
            onChange={handleChange}
            isError={!!errorMessage}
            autoFocus
            onKeyDown={handleGoNextStep}
          />
          {/* 가상 키패드 적용 예정 */}
          <FixedButton variants={isPostEventPending ? 'loading' : 'primary'} disabled={!canSubmit}>
            행동 개시!
          </FixedButton>
        </form>
      </div>
    </MainLayout>
  );
};

export default SetEventPasswordPage;
