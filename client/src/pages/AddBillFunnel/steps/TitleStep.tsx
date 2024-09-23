import {css} from '@emotion/react';

import Top from '@components/Design/components/Top/Top';

import useTitleStep from '@hooks/useTitleStep';
import {BillStep} from '@hooks/useAddBillFunnel';

import {FixedButton, LabelInput} from '@components/Design';

import {BillInfo} from '../AddBillFunnel';

interface Props {
  billInfo: BillInfo;
  setBillInfo: React.Dispatch<React.SetStateAction<BillInfo>>;
  setStep: React.Dispatch<React.SetStateAction<BillStep>>;
}

export const TitleStep = ({billInfo, setBillInfo, setStep}: Props) => {
  const {
    errorMessage,
    handleTitleInputChange,
    handleTitleInputEnter,
    canSubmitTitleInput,
    handlePrevStep,
    handleNextStep,
  } = useTitleStep({
    billInfo,
    setBillInfo,
    setStep,
  });

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
      <FixedButton disabled={!canSubmitTitleInput} onClick={handleNextStep} onBackClick={handlePrevStep}>
        다음으로
      </FixedButton>
    </>
  );
};
