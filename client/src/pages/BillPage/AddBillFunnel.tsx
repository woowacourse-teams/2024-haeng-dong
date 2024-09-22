import {css} from '@emotion/react';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import NumberKeyboard from '@components/Design/components/NumberKeyboard/NumberKeyboard';
import useRequestGetCurrentMembers from '@hooks/queries/member/useRequestGetCurrentMembers';
import Top from '@components/Design/components/Top/Top';
import ChipButton from '@components/Design/components/ChipButton/ChipButton';
import AmountInput from '@components/AmountInput/AmountInput';

import {Back, FixedButton, Flex, LabelInput, MainLayout, Text, TopNav} from '@components/Design';
import REGEXP from '@constants/regExp';
import useRequestPostBill from '@hooks/queries/bill/useRequestPostBill';
import getEventIdByUrl from '@utils/getEventIdByUrl';
import useRequestPostMembers from '@hooks/queries/member/useRequestPostMembers';

type BillStep = 'title' | 'price' | 'members';

interface BillInfo {
  price: string;
  title: string;
  members: string[];
}

const AddBillFunnel = () => {
  const {currentMembers} = useRequestGetCurrentMembers();
  const [step, setStep] = useState<BillStep>('price');
  const [billInfo, setBillInfo] = useState<BillInfo>({
    price: '',
    title: '',
    members: [],
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [isMemberChanged, setIsMemberChanged] = useState(false);
  const navigate = useNavigate();

  const eventId = getEventIdByUrl();
  const {
    postMembers,
    responseMemberIds,
    isSuccess: isSuccessPostMembers,
    isPending: isPendingPostMembers,
  } = useRequestPostMembers();
  const {postBill, isSuccess: isSuccessPostBill, isPending: isPendingPostBill} = useRequestPostBill();

  useEffect(() => {
    currentMembers && setBillInfo(prev => ({...prev, members: currentMembers.map(member => member.name)}));
  }, [currentMembers]);

  const handleNumberKeyboardChange = (value: string) => {
    setBillInfo(prev => ({...prev, price: value || prev.price}));
  };

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

  const onNameInputChange = (value: string) => {
    if (REGEXP.memberName.test(value)) {
      setNameInput(value);
    }
  };

  const handleNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 4) {
      setErrorMessage('이름은 4자까지 입력 가능해요');
      onNameInputChange(nameInput.slice(0, 4));
    } else {
      setErrorMessage('');
      onNameInputChange(event.target.value);
    }
  };

  const canAddMembers = nameInput && !errorMessage;

  const canSubmitMembers = billInfo.members.length !== 0;

  const handleNameInputEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) {
      return;
    }
    if (event.key === 'Enter' && canAddMembers) {
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

  const handlePostBill = async () => {
    const newMembers = billInfo.members.filter(
      member => !currentMembers.map(currentMember => currentMember.name).includes(member),
    );
    if (newMembers) {
      setIsMemberChanged(true);
    }
  };

  useEffect(() => {
    if (isSuccessPostMembers && responseMemberIds) {
      postBill({
        title: billInfo.title,
        price: Number(billInfo.price.replace(',', '')),
        members: responseMemberIds.members.map(member => member.id),
      });
    }
  }, [isSuccessPostMembers, responseMemberIds]);

  useEffect(() => {
    if (isSuccessPostBill) {
      navigate(`/event/${eventId}/admin`);
    }
  }, [isSuccessPostBill]);

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
          placeholder="ex) 박행댕"
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
      <FixedButton
        variants={isPendingPostBill || isPendingPostMembers ? 'loading' : 'primary'}
        disabled={!canSubmitMembers}
        onClick={handlePostBill}
        onBackClick={setStepTitle}
      >
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
