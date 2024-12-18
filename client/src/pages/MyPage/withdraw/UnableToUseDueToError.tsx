import {css} from '@emotion/react';

import {WithdrawStep} from '@hooks/useWithdrawFunnel';

import {Top, Checkbox, FixedButton, Flex} from '@components/Design';

const UnableToUseDueToError = ({handleMoveStep}: {handleMoveStep: (nextStep: WithdrawStep) => void}) => {
  return (
    <>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 1rem;
        `}
      >
        <Top>
          <Top.Line text="어떤 오류가 발생했나요?" emphasize={['오류']} />
        </Top>

        <Flex flexDirection="column" gap="1rem">
          {/* TODO: (@soha) 백엔드와 어떻게 관리할 지 논의 후에 기능(hook) 추가 예정 */}
          <Checkbox isChecked={false} onChange={() => {}} labelText="행사 생성" />
          <Checkbox isChecked={false} onChange={() => {}} labelText="지출 내역 추가" />
          <Checkbox isChecked={false} onChange={() => {}} labelText="정산 초대하기" />
          <Checkbox isChecked={false} onChange={() => {}} labelText="관리자에게 송금" />
          <Checkbox isChecked={false} onChange={() => {}} labelText="기타" />
        </Flex>
      </div>
      {/* TODO: (@soha) checkbox를 하나라도 해야 탈퇴하기 버튼 활성화 */}
      <FixedButton
        onClick={() => handleMoveStep('checkBeforeWithdrawing')}
        onBackClick={() => handleMoveStep('withdrawReason')}
      >
        탈퇴하기
      </FixedButton>
    </>
  );
};

export default UnableToUseDueToError;
