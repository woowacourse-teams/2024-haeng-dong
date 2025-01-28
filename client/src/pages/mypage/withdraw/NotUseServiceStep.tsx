import {css} from '@emotion/react';

import {WithdrawStep} from '@hooks/useWithdrawFunnel';

import {Top, Checkbox, FixedButton, Flex, Text} from '@components/Design';

const NotUseServiceStep = ({handleMoveStep}: {handleMoveStep: (nextStep: WithdrawStep) => void}) => {
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
          <Top.Line text="행동대장을" />
          <Top.Line text="사용하지 않는 이유는 무엇인가요?" emphasize={['사용하지 않는 이유']} />
        </Top>

        <Flex flexDirection="column" gap="1rem">
          {/* TODO: (@soha) 백엔드와 어떻게 관리할 지 논의 후에 기능(hook) 추가 예정 */}
          <Checkbox checked={false} onChange={() => {}} right={<Text size="bodyBold">예상했던 서비스가 아님</Text>} />
          <Checkbox checked={false} onChange={() => {}} right={<Text size="bodyBold">디자인이 별로임</Text>} />
          <Checkbox checked={false} onChange={() => {}} right={<Text size="bodyBold">사용하기 불편함</Text>} />
          <Checkbox checked={false} onChange={() => {}} right={<Text size="bodyBold">원하는 기능이 없음</Text>} />
          <Checkbox checked={false} onChange={() => {}} right={<Text size="bodyBold">기타</Text>} />
        </Flex>
      </div>
      {/* TODO: (@soha) checkbox를 하나라도 해야 탈퇴하기 버튼 활성화 */
      /* TODO: (@todari) 현재 회원탈퇴 완료 페이지에서 뒤로가기 가능한 오류 있음!!**/}
      <FixedButton
        onClick={() => handleMoveStep('checkBeforeWithdrawing')}
        onBackClick={() => handleMoveStep('withdrawReason')}
      >
        탈퇴하기
      </FixedButton>
    </>
  );
};

export default NotUseServiceStep;
