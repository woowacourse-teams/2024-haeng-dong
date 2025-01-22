import {css} from '@emotion/react';
import {useNavigate} from 'react-router-dom';

import RunningDogLogo from '@components/Logo/RunningDogLogo';

import {Top, FixedButton, Flex, Text} from '@components/Design';

const WithdrawalCompleted = () => {
  const navigate = useNavigate();
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
          <Top.Line text="회원 탈퇴가 완료되었습니다." emphasize={['회원 탈퇴가 완료되었습니다.']} />
        </Top>

        <Flex flexDirection="column" gap="0.5rem">
          <Text textColor="onTertiary">그동안 행동대장을 사용해주셔서 감사합니다.</Text>
          <Text textColor="onTertiary">더 나은 서비스로 발전해나가겠습니다.</Text>
        </Flex>
        <RunningDogLogo />
      </div>
      <FixedButton onClick={() => navigate('/')}>홈으로</FixedButton>
    </>
  );
};

export default WithdrawalCompleted;
