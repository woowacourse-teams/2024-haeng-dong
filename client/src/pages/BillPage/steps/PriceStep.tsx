import {css} from '@emotion/react';
import {useNavigate} from 'react-router-dom';

import AmountInput from '@components/AmountInput/AmountInput';
import NumberKeyboard from '@components/Design/components/NumberKeyboard/NumberKeyboard';
import Top from '@components/Design/components/Top/Top';

import {FixedButton} from '@components/Design';

import {BillInfo} from '../AddBillFunnel';
import usePriceStep from '@hooks/usePriceStep';
import {BillStep} from '@hooks/useAddBillFunnel';

interface Props {
  billInfo: BillInfo;
  setBillInfo: React.Dispatch<React.SetStateAction<BillInfo>>;
  setStep: React.Dispatch<React.SetStateAction<BillStep>>;
}

const PriceStep = ({billInfo, setBillInfo, setStep}: Props) => {
  const navigate = useNavigate();
  const {handleNumberKeyboardChange, handleNextStep} = usePriceStep({setBillInfo, setStep});

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
          <Top.Line text="사용한 금액은 얼마인가요?" emphasize={['사용한 금액']} />
        </Top>
        <AmountInput value={billInfo.price} />
      </div>
      <div
        css={css`
          position: fixed;
          width: 100%;
          max-width: 768px;
          bottom: 6.25rem;
        `}
      >
        <NumberKeyboard type="amount" maxNumber={10000000} onChange={handleNumberKeyboardChange} />
      </div>
      <FixedButton disabled={!billInfo.price} onClick={handleNextStep} onBackClick={() => navigate(-1)}>
        다음으로
      </FixedButton>
    </>
  );
};

export default PriceStep;
