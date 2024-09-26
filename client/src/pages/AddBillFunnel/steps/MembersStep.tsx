import {css} from '@emotion/react';
import {useRef} from 'react';

import Top from '@components/Design/components/Top/Top';
import ChipButton from '@components/Design/components/ChipButton/ChipButton';
import {Member} from 'types/serviceType';

import useMembersStep from '@hooks/useMembersStep';
import {BillStep} from '@hooks/useAddBillFunnel';

import {FixedButton, Flex, Input, Text} from '@components/Design';

import {isIOS} from '@utils/detectDevice';

import {BillInfo} from '../AddBillFunnel';

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
    inputRef,
    hiddenRef,
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

        <Input
          ref={inputRef}
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
      {isIOS() && (
        <input
          ref={hiddenRef}
          css={css`
            position: absolute;
            width: 1px;
            height: 1px;
            margin: -1px;
            border: 0;
            padding: 0;

            white-space: nowrap;
            clip-path: inset(100%);
            clip: rect(0 0 0 0);
            overflow: hidden;
          `}
        />
      )}
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
