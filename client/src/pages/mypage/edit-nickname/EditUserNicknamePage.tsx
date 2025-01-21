import {useNavigate} from 'react-router-dom';

import toast from '@hooks/useToast/toast';
import useRequestPatchUser from '@hooks/queries/event/useRequestPatchUser';

import useUserInfoContext from '@hooks/useUserInfoContext';
import useMemberName from '@hooks/useMemberName';

import {FixedButton, FunnelLayout, Input, MainLayout, Top, TopNav} from '@components/Design';

import {ROUTER_URLS} from '@constants/routerUrls';

const EditUserNicknamePage = () => {
  const {nickname} = useUserInfoContext();
  const {patchUser} = useRequestPatchUser();

  const {errorMessage, canSubmit, name, handleNameChange} = useMemberName(nickname);

  const navigate = useNavigate();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await patchUser({nickname: name});
      toast.confirm('이름 변경이 완료되었어요!');
      navigate(ROUTER_URLS.myPage);
    } catch (error) {
      toast.error('이름 변경에 실패했어요. 다시 시도해주세요.');
    }
  };
  return (
    <MainLayout backgroundColor="white">
      <TopNav>
        <TopNav.Item displayName="뒤로가기" noEmphasis routePath="-1" />
      </TopNav>
      <FunnelLayout>
        <Top>
          <Top.Line text="행사에서 사용할" />
          <Top.Line text="본인의 이름을 입력해주세요" emphasize={['본인의 이름']} />
        </Top>
        <form onSubmit={event => onSubmit(event)}>
          <Input
            labelText="이름"
            errorText={errorMessage ?? ''}
            value={name}
            type="text"
            placeholder="박행댕"
            onChange={handleNameChange}
            isError={!!errorMessage}
            autoFocus
          />
          <FixedButton disabled={!canSubmit}>변경완료</FixedButton>
        </form>
      </FunnelLayout>
    </MainLayout>
  );
};

export default EditUserNicknamePage;
