import {css} from '@emotion/react';

import Top from '@components/Design/components/Top/Top';
import {UseSetNicknameStepProps} from '@hooks/createEvent/useSetNicknameStep';

import {FixedButton, Input} from '@HDesign/index';

type SetEventNamePageProps = UseSetNicknameStepProps & {
  moveToNextStep: () => void;
};

const SetNicknameStep = ({
  nickname,
  moveToNextStep,
  errorMessage,
  handleNicknameChange,
  canSubmit,
}: SetEventNamePageProps) => {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    moveToNextStep();
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
      `}
    >
      <Top>
        <Top.Line text="행사를 정산하는" />
        <Top.Line text="관리자의 이름을 입력해주세요" emphasize={['관리자의 이름']} />
      </Top>
      <form onSubmit={onSubmit}>
        <Input
          labelText="관리자 이름"
          errorText={errorMessage ?? ''}
          value={nickname}
          type="text"
          placeholder="홍길동"
          onChange={handleNicknameChange}
          isError={!!errorMessage}
          autoFocus
        />
        <FixedButton disabled={!canSubmit}>다음</FixedButton>
      </form>
    </div>
  );
};

export default SetNicknameStep;
