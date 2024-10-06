import useSendPage from '@hooks/useSendPage';

import {MainLayout} from '@components/Design';

import {Copy, Kakao, Toss, Whole} from './method';

const SendPage = () => {
  const {step, changeStep, accountText, amountText, copyText, onTossClick, onKakaoPayClick} = useSendPage();

  return (
    <MainLayout backgroundColor="white">
      {step === 'whole' && <Whole accountText={accountText} amountText={amountText} changeStep={changeStep} />}
      {step === 'copy' && <Copy copyText={copyText} changeStep={changeStep} />}
      {step === 'toss' && <Toss onTossClick={onTossClick} changeStep={changeStep} />}
      {step === 'kakaopay' && <Kakao copyText={copyText} onKakaoPayClick={onKakaoPayClick} changeStep={changeStep} />}
    </MainLayout>
  );
};

export default SendPage;
