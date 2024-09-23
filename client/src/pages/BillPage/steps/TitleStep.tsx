import {css} from '@emotion/react';
import {useState} from 'react';

import Top from '@components/Design/components/Top/Top';

import {FixedButton, LabelInput} from '@components/Design';

import REGEXP from '@constants/regExp';

import {BillInfo, BillStep} from '../AddBillFunnel';

interface Props {
  billInfo: BillInfo;
  setBillInfo: React.Dispatch<React.SetStateAction<BillInfo>>;
  setStep: React.Dispatch<React.SetStateAction<BillStep>>;
}

export const TitleStep = ({billInfo, setBillInfo, setStep}: Props) => {
  const [errorMessage, setErrorMessage] = useState('');

  const onTitleInputChange = (value: string) => {
    if (REGEXP.billTitle.test(value)) {
      setBillInfo(prev => ({...prev, title: value}));
    }
  };

  const handleTitleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 12) {
      setErrorMessage('지출내역은 12자까지 입력 가능해요');
      onTitleInputChange(billInfo.title.slice(0, 12));
    } else {
      setErrorMessage('');
      onTitleInputChange(event.target.value);
    }
  };

  const canSubmitTitleInput = billInfo.title && !errorMessage;

  const handleTitleInputEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) {
      return;
    }
    if (event.key === 'Enter' && canSubmitTitleInput) {
      event.preventDefault();
      setStep('members');
    }
  };

  const setStepPrice = () => {
    setStep('price');
  };

  const setStepMembers = () => {
    setStep('members');
  };

  return (
    <>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1rem;
        `}
      >
        <Top>
          <Top.Line text={`${billInfo.price}원을`} />
          <Top.Line text="어떤 곳에서 사용했나요??" emphasize={['어떤 곳']} />
        </Top>
        <LabelInput
          labelText="결제 내용"
          errorText={errorMessage ?? ''}
          value={billInfo.title}
          type="text"
          placeholder="ex) 행동대장 포차"
          onChange={handleTitleInputChange}
          isError={!!errorMessage}
          autoFocus
          onKeyDown={handleTitleInputEnter}
        />
      </div>
      <FixedButton disabled={!canSubmitTitleInput} onClick={setStepMembers} onBackClick={setStepPrice}>
        다음으로
      </FixedButton>
    </>
  );
};
