import {useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {useQueryClient} from '@tanstack/react-query';

import {BillInfo} from '@pages/event/[eventId]/admin/add-bill/AddBillFunnel';
import {Member} from 'types/serviceType';

import getEventIdByUrl from '@utils/getEventIdByUrl';
import {isIOS} from '@utils/detectDevice';
import isDuplicated from '@utils/isDuplicate';

import RULE from '@constants/rule';
import {ERROR_MESSAGE} from '@constants/errorMessage';
import QUERY_KEYS from '@constants/queryKeys';

import useRequestPostMembers from './queries/member/useRequestPostMembers';
import useRequestPostBill from './queries/bill/useRequestPostBill';
import {BillStep} from './useAddBillFunnel';
import useRequestGetAllMembers from './queries/member/useRequestGetAllMembers';
import useAmplitude from './useAmplitude';
import useRequestGetEvent from './queries/event/useRequestGetEvent';
import useMemberName from './useMemberName';

interface Props {
  billInfo: BillInfo;
  setBillInfo: React.Dispatch<React.SetStateAction<BillInfo>>;
  setStep: React.Dispatch<React.SetStateAction<BillStep>>;
  currentMembers: Member[];
}

const useMembersStep = ({billInfo, setBillInfo, setStep}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const hiddenRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const {trackAddBillEnd} = useAmplitude();

  const {members: allMembers} = useRequestGetAllMembers();
  const {postMembersAsync, isPending: isPendingPostMembers} = useRequestPostMembers();

  const {postBill, isSuccess: isSuccessPostBill, isPending: isPendingPostBill} = useRequestPostBill();
  const navigate = useNavigate();
  const eventId = getEventIdByUrl();
  const {eventName} = useRequestGetEvent();

  const {name, handleNameChange, clearMemberName, errorMessage} = useMemberName();

  const canAddMembers = name && name.length <= RULE.maxMemberNameLength;
  const canSubmitMembers = billInfo.members.length !== 0;

  const setBillInfoMemberWithId = (name: string) => {
    const existingMember = allMembers.find(currentMember => currentMember.name === name);

    if (existingMember) {
      setBillInfo(prev => ({...prev, members: [...prev.members, {id: existingMember.id, name: name}]}));
    } else {
      setBillInfo(prev => ({...prev, members: [...prev.members, {id: -1, name: name}]}));
    }
  };

  const addMembersFromInput = () => {
    if (!billInfo.members.map(({name}) => name).includes(name)) {
      setBillInfoMemberWithId(name);
      clearMemberName();

      if (isIOS()) {
        hiddenRef.current?.focus();
        inputRef.current?.focus();
      }
    }
  };

  const handleNameInputEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;
    if (event.key === 'Enter' && canAddMembers && inputRef.current) {
      event.preventDefault();
      addMembersFromInput();
    }
  };

  const handleNameInputComplete = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!canAddMembers || !inputRef.current) return;
    event.preventDefault();
    addMembersFromInput();
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
      postBill(
        {
          title: billInfo.title,
          price: Number(billInfo.price.replace(/,/g, '')),
          memberIds: billInfo.members.map(member =>
            member.id === -1 ? newMembers.members.find(m => m.name === member.name)?.id || member.id : member.id,
          ),
        },
        {
          onSettled: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEYS.allMembers]});
          },
        },
      );
    } else {
      postBill({
        title: billInfo.title,
        price: Number(billInfo.price.replace(/,/g, '')),
        memberIds: billInfo.members.map(({id}) => id),
      });
    }

    trackAddBillEnd({eventName, eventToken: eventId});
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
    errorMessage: isDuplicated(
      allMembers.map(({name}) => name),
      name,
    )
      ? ERROR_MESSAGE.memberNameDuplicate
      : errorMessage,
    nameInput: name,
    inputRef,
    hiddenRef,
    handleNameInputChange: handleNameChange,
    handleNameInputEnter,
    handleNameInputComplete,
    isPendingPostBill,
    isPendingPostMembers,
    canSubmitMembers,
    handlePostBill,
    handlePrevStep,
  };
};

export default useMembersStep;
