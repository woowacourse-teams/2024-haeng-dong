import {css} from '@emotion/react';
import Top from '@components/Design/components/Top/Top';
import ChipButton from '@components/Design/components/ChipButton/ChipButton';
import {Member} from 'types/serviceType';

import {FixedButton, Flex, LabelInput, Text} from '@components/Design';

import {BillInfo} from '../AddBillFunnel';
import useMembersStep from '@hooks/useMembersStep';
import {BillStep} from '@hooks/useAddBillFunnel';

interface Props {
  billInfo: BillInfo;
  setBillInfo: React.Dispatch<React.SetStateAction<BillInfo>>;
  setStep: React.Dispatch<React.SetStateAction<BillStep>>;
  currentMembers: Member[];
}

const MembersStep = ({billInfo, setBillInfo, currentMembers, setStep}: Props) => {
  const {
    errorMessage,
    nameInput,
    handleNameInputChange,
    handleNameInputEnter,
    isPendingPostBill,
    isPendingPostMembers,
    canSubmitMembers,
    handlePostBill,
    handlePrevStep,
  } = useMembersStep({billInfo, setBillInfo, currentMembers, setStep});

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
        onBackClick={handlePrevStep}
      >
        추가완료
      </FixedButton>
    </>
  );
};

export default MembersStep;
