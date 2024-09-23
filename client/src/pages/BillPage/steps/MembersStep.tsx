import {css} from '@emotion/react';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import useRequestPostMembers from '@hooks/queries/member/useRequestPostMembers';
import useRequestPostBill from '@hooks/queries/bill/useRequestPostBill';
import Top from '@components/Design/components/Top/Top';
import ChipButton from '@components/Design/components/ChipButton/ChipButton';
import {Member} from 'types/serviceType';

import {FixedButton, Flex, LabelInput, Text} from '@components/Design';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import REGEXP from '@constants/regExp';

import {BillInfo, BillStep} from '../AddBillFunnel';

interface Props {
  billInfo: BillInfo;
  setBillInfo: React.Dispatch<React.SetStateAction<BillInfo>>;
  setStep: React.Dispatch<React.SetStateAction<BillStep>>;
  currentMembers: Member[];
}

const MembersStep = ({billInfo, setBillInfo, setStep, currentMembers}: Props) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [canRequestPostBill, setCanRequestPostBill] = useState(false);

  const {
    postMembers,
    responseMemberIds,
    isSuccess: isSuccessPostMembers,
    isPending: isPendingPostMembers,
  } = useRequestPostMembers();
  const {postBill, isSuccess: isSuccessPostBill, isPending: isPendingPostBill} = useRequestPostBill();
  const navigate = useNavigate();
  const eventId = getEventIdByUrl();

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

  const setBillInfoMemberWithId = (name: string) => {
    const existingMember = currentMembers.find(currentMember => currentMember.name === name);
    if (existingMember) {
      setBillInfo(prev => ({...prev, members: [...prev.members, {id: existingMember.id, name: name}]}));
    } else {
      setBillInfo(prev => ({...prev, members: [...prev.members, {id: -1, name: name}]}));
    }
  };

  const handleNameInputEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) {
      return;
    }
    if (event.key === 'Enter' && canAddMembers) {
      event.preventDefault();
      if (!billInfo.members.map(({name}) => name).includes(nameInput)) {
        setBillInfoMemberWithId(nameInput);
      }
      setNameInput('');
    }
  };

  const setStepTitle = () => {
    setStep('title');
  };

  const handlePostBill = async () => {
    if (billInfo.members.map(({id}) => id).includes(-1)) {
      postMembers({
        members: billInfo.members.filter(member => member.id === -1),
      });
    } else {
      postBill({
        title: billInfo.title,
        price: Number(billInfo.price.replace(',', '')),
        members: billInfo.members.map(({id}) => id),
      });
    }
  };

  useEffect(() => {
    if (isSuccessPostMembers && responseMemberIds) {
      postBill({
        title: billInfo.title,
        price: Number(billInfo.price.replace(',', '')),
        members: billInfo.members.map(member =>
          member.id === -1 ? responseMemberIds.members.find(m => m.name === member.name)?.id || member.id : member.id,
        ),
      });
    }
  }, [isSuccessPostMembers, responseMemberIds]);

  useEffect(() => {
    if (isSuccessPostBill) {
      navigate(`/event/${eventId}/admin`);
    }
  }, [isSuccessPostBill]);

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
                key={member.name}
                color="gray"
                text={member.name}
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
};

export default MembersStep;
