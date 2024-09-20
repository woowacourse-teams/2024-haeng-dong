import Top from '@components/Design/components/Top/Top';

import useEventLogin from '@hooks/useEventLogin';

import {FixedButton, LabelInput} from '@HDesign/index';

import RULE from '@constants/rule';

const EventLoginPage = () => {
  const {password, errorMessage, handleChange, canSubmit, submitPassword} = useEventLogin();

  return (
    <>
      <Top>
        <Top.Line text="행사 생성 시 설정한" />
        <Top.Line text="네자리 숫자 비밀번호를 입력해 주세요." />
      </Top>
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
    </>
  );
};

export default EventLoginPage;
