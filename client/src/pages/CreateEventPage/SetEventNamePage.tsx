import {FixedButton, MainLayout, LabelInput, Title, TopNav, Back} from 'haengdong-design';
import {css} from '@emotion/react';

import useSetEventNamePage from '@hooks/useSetEventNamePage';

const SetEventNamePage = () => {
  const {submitEventName, errorMessage, eventName, canSubmit, handleChange} = useSetEventNamePage();

  return (
    <MainLayout>
      <TopNav>
        <Back />
      </TopNav>
      <Title title="행사 이름 입력" description="시작할 행사 이름을 입력해 주세요." />
      <form onSubmit={submitEventName} css={css({padding: '0 1rem'})}>
        <LabelInput
          labelText="행사 이름"
          errorText={errorMessage}
          value={eventName}
          type="text"
          placeholder="행사 이름"
          onChange={e => handleChange(e)}
          isError={!!errorMessage}
          autoFocus
        ></LabelInput>
        <FixedButton disabled={!canSubmit}>다음</FixedButton>
      </form>
    </MainLayout>
  );
};

export default SetEventNamePage;
