import {useState} from 'react';
import {FixedButton, MainLayout, LabelInput, Title, TopNav, Switch} from 'haengdong-design';

import validateEventPassword from '@utils/validate/validateEventPassword';
import useRequestPostLogin from '@hooks/queries/useRequestPostLogin';

import useNavSwitch from '@hooks/useNavSwitch';

import RULE from '@constants/rule';
import {PASSWORD_LENGTH} from '@constants/password';

const EventLoginPage = () => {
  const [password, setPassword] = useState('');
  const {nav, paths, onChange} = useNavSwitch();
  const [errorMessage, setErrorMessage] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);
  const {mutate: postLogin} = useRequestPostLogin();

  const submitPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    postLogin({password}, {onError: () => setErrorMessage('비밀번호가 틀렸어요')});
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
        <Switch value={nav} values={paths} onChange={onChange} />
        {/* <Back /> */}
      </TopNav>
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
    </MainLayout>
  );
};

export default EventLoginPage;
