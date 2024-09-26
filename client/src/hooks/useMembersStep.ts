import {RefObject, useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {BillInfo} from '@pages/AddBillFunnel/AddBillFunnel';
import {Member} from 'types/serviceType';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import REGEXP from '@constants/regExp';

import useRequestPostMembers from './queries/member/useRequestPostMembers';
import useRequestPostBill from './queries/bill/useRequestPostBill';
import {BillStep} from './useAddBillFunnel';

interface Props {
  billInfo: BillInfo;
  setBillInfo: React.Dispatch<React.SetStateAction<BillInfo>>;
  setStep: React.Dispatch<React.SetStateAction<BillStep>>;
  currentMembers: Member[];
}

const useMembersStep = ({billInfo, setBillInfo, currentMembers, setStep}: Props) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [nameInput, setNameInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const {postMembersAsync, isPending: isPendingPostMembers} = useRequestPostMembers();

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

  const canAddMembers = nameInput && nameInput.length <= 4;

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
    if (event.key === 'Enter' && canAddMembers) {
      if (!billInfo.members.map(({name}) => name).includes(nameInput)) {
        setBillInfoMemberWithId(nameInput);
      }
      setNameInput('');
      if (inputRef.current) {
        inputRef.current.blur();
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      }
      if (event.nativeEvent.isComposing) {
        return;
      }
    }
  };

  const handlePostBill = async () => {
    if (billInfo.members.map(({id}) => id).includes(-1)) {
      const newMembers = await postMembersAsync({
        members: billInfo.members
          .filter(({id}) => id === -1)
          .map(({name}) => ({
            name,
          })),
      });
      postBill({
        title: billInfo.title,
        price: Number(billInfo.price.replace(',', '')),
        memberIds: billInfo.members.map(member =>
          member.id === -1 ? newMembers.members.find(m => m.name === member.name)?.id || member.id : member.id,
        ),
      });
    } else {
      postBill({
        title: billInfo.title,
        price: Number(billInfo.price.replace(',', '')),
        memberIds: billInfo.members.map(({id}) => id),
      });
    }
  };

  useEffect(() => {
    if (isSuccessPostBill) {
      navigate(`/event/${eventId}/admin`);
    }
  }, [isSuccessPostBill]);

  const handlePrevStep = () => {
    setStep('title');
  };

  return {
    errorMessage,
    nameInput,
    inputRef,
    handleNameInputChange,
    handleNameInputEnter,
    isPendingPostBill,
    isPendingPostMembers,
    canSubmitMembers,
    handlePostBill,
    handlePrevStep,
  };
};

export default useMembersStep;
