import AmountInput from '@components/AmountInput/AmountInput';
import {Back, FixedButton, Flex, LabelInput, MainLayout, Text, TopNav} from '@components/Design';
import ChipButton from '@components/Design/components/ChipButton/ChipButton';
import Top from '@components/Design/components/Top/Top';
import NumberKeyboard from '@components/Design/NumberKeyboard/NumberKeyboard';
import {css} from '@emotion/react';
import useRequestGetCurrentMember from '@hooks/queries/useRequestGetCurrentMember';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

type BillStep = 'title' | 'price' | 'members';

interface BillInfo {
  price: string;
  title: string;
  members: string[];
}

const AddBillFunnel = () => {
  const {data} = useRequestGetCurrentMember();
  const currentMember = data?.members;
  const [step, setStep] = useState<BillStep>('price');
  const [billInfo, setBillInfo] = useState<BillInfo>({
    price: '',
    title: '',
    members: [],
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [nameInput, setNameInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    currentMember && setBillInfo(prev => ({...prev, members: currentMember.map(member => member.name)}));
  }, [currentMember]);

  const handleNumberKeyboardChange = (value: string) => {
    setBillInfo(prev => ({...prev, price: value || prev.price}));
  };

  const handleTitleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBillInfo(prev => ({...prev, title: event.target.value}));
  };

  const handleTitleInputEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) {
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      setStep('members');
    }
  };

  const handleNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => setNameInput(event.target.value);

  const handleNameInputEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) {
      return;
    }
    if (event.key === 'Enter') {
      console.log(nameInput);
      event.preventDefault();
      if (!billInfo.members.includes(nameInput)) {
        setBillInfo(prev => ({...prev, members: [...prev.members, nameInput]}));
      }
      setNameInput('');
    }
  };

  const setStepPrice = () => {
    setStep('price');
  };

  const setStepTitle = () => {
    setStep('title');
  };

  const setStepMembers = () => {
    setStep('members');
  };

  const priceStep = () => (
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
      <FixedButton disabled={!billInfo.price} onClick={setStepTitle} onBackClick={() => navigate(-1)}>
        다음으로
      </FixedButton>
    </>
  );

  const titleStep = () => (
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
          placeholder="행동대장 포차"
          onChange={handleTitleInputChange}
          isError={!!errorMessage}
          autoFocus
          onKeyDown={handleTitleInputEnter}
        />
      </div>
      <FixedButton disabled={!billInfo.title} onClick={setStepMembers} onBackClick={setStepPrice}>
        다음으로
      </FixedButton>
    </>
  );

  const membersStep = () => (
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
          <Top.Line text={`${billInfo.title}에`} />
          <Top.Line text="참여한 사람은 누구인가요?" emphasize={['참여한 사람']} />
        </Top>
        <LabelInput
          labelText="이름"
          errorText={errorMessage ?? ''}
          value={nameInput}
          type="text"
          placeholder="박행댕"
          onChange={handleNameInputChange}
          isError={!!errorMessage}
          autoFocus
          onKeyDown={handleNameInputEnter}
        />
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 0.375rem;
          `}
        >
          <Flex justifyContent="spaceBetween" paddingInline="0.5rem" margin="0 0 0.375rem 0">
            <Text size="caption" textColor="gray">
              참여 인원
            </Text>
            <Text size="caption" textColor="gray">{`총 ${billInfo.members.length}명`}</Text>
          </Flex>
          <div
            css={css`
              display: flex;
              flex-wrap: wrap;
              gap: 0.5rem;
            `}
          >
            {billInfo.members.map(member => (
              <ChipButton
                key={member}
                color="gray"
                text={member}
                onClick={() => setBillInfo(prev => ({...prev, members: prev.members.filter(name => name !== member)}))}
              />
            ))}
          </div>
        </div>
      </div>
      <FixedButton disabled={!billInfo.title} onClick={setStepMembers} onBackClick={setStepTitle}>
        추가완료
      </FixedButton>
    </>
  );

  return (
    <MainLayout backgroundColor="white">
      <TopNav>
        <Back />
      </TopNav>
      {step === 'price' && priceStep()}
      {step === 'title' && titleStep()}
      {step === 'members' && membersStep()}
    </MainLayout>
  );
};

export default AddBillFunnel;
