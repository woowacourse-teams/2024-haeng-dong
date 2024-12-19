import {useLocation, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';

import useSetEventNameStep from '@hooks/createEvent/useSetEventNameStep';
import useRequestPatchEvent from '@hooks/queries/event/useRequestPatchEvent';
import {EventName} from 'types/serviceType';

import {FixedButton, FunnelLayout, Input, MainLayout, Top, TopNav} from '@components/Design';

import getEventBaseUrl from '@utils/getEventBaseUrl';

const EditEventNamePage = () => {
  const location = useLocation();
  const locationState = location.state as EventName | null;
  console.log(locationState);

  const navigate = useNavigate();

  useEffect(() => {
    if (locationState === null) {
      navigate(-1);
    }
  }, [locationState]);

  const {eventName, errorMessage, canSubmit, handleEventNameChange} = useSetEventNameStep(locationState ?? '');
  const {patchEvent} = useRequestPatchEvent();

  const disabled = !canSubmit || eventName === locationState;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await patchEvent({eventName});
    navigate(`/${getEventBaseUrl(location.pathname)}/admin`);
  };

  return (
    <MainLayout backgroundColor="white">
      <TopNav>
        <TopNav.Item displayName="뒤로가기" noEmphasis routePath="-1" />
      </TopNav>
      <FunnelLayout>
        <Top>
          <Top.Line text="변경하려는" />
          <Top.Line text="행사의 이름은 무엇인가요?" emphasize={['행사의 이름']} />
        </Top>
        <form onSubmit={event => onSubmit(event)}>
          <Input
            labelText="행사 이름"
            errorText={errorMessage ?? ''}
            value={eventName}
            type="text"
            placeholder="행동대장 야유회"
            onChange={handleEventNameChange}
            isError={!!errorMessage}
            autoFocus
          />
          <FixedButton disabled={disabled}>변경완료</FixedButton>
        </form>
      </FunnelLayout>
    </MainLayout>
  );
};

export default EditEventNamePage;
