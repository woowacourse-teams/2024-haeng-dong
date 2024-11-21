import Top from '@components/Design/components/Top/Top';

import useEventLogin from '@hooks/useEventLogin';

import {FixedButton, FunnelLayout, Input} from '@HDesign/index';

import RULE from '@constants/rule';

const GuestEventLogin = () => {
  const {password, errorMessage, handleChange, canSubmit, submitPassword} = useEventLogin();

  return (
    <FunnelLayout>
      <Top>
        <Top.Line
          text={`행사 생성 시 설정한 ${RULE.maxEventPasswordLength}자리`}
          emphasize={[`${RULE.maxEventPasswordLength}자리`]}
        />
        <Top.Line text="숫자 비밀번호를 입력해 주세요." emphasize={['비밀번호']} />
      </Top>
      <form onSubmit={submitPassword}>
        <Input
          labelText="비밀번호"
          errorText={errorMessage}
          value={password}
          type="secret"
          maxLength={RULE.maxEventPasswordLength}
          placeholder="비밀번호"
          onChange={e => handleChange(e)}
          isError={!!errorMessage}
          autoFocus
        ></Input>
        <FixedButton disabled={!canSubmit}>관리 페이지로</FixedButton>
      </form>
    </FunnelLayout>
  );
};

export default GuestEventLogin;
