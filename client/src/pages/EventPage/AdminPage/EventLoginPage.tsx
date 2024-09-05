import useEventLogin from '@hooks/useEventLogin';

import {FixedButton, LabelInput, Title} from '@HDesign/index';

import RULE from '@constants/rule';
import {PASSWORD_LENGTH} from '@constants/password';

const EventLoginPage = () => {
  const {password, errorMessage, handleChange, canSubmit, submitPassword} = useEventLogin();

  return (
    <>
      <Title
        title="행사 비밀번호 입력"
        description={`관리를 위해선 비밀번호가 필요해요. 행사 생성 시 설정한 ${PASSWORD_LENGTH} 자리의 숫자 비밀번호를 입력해 주세요.`}
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
    </>
  );
};

export default EventLoginPage;
