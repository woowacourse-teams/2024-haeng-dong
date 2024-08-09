import {useEffect, useState} from 'react';
import {Title, FixedButton, ListButton} from 'haengdong-design';

import StepList from '@components/StepList/StepList';
import {useStepList} from '@hooks/useStepList/useStepList';
import {requestGetEventName} from '@apis/request/event';
import useEventId from '@hooks/useEventId/useEventId';
import {ModalBasedOnMemberCount} from '@components/Modal/index';

import {receiptStyle, titleAndListButtonContainerStyle} from './AdminPage.style';
import {useNavigate} from 'react-router-dom';
import useAuth from '@hooks/useAuth';
import {ROUTER_URLS} from '@constants/routerUrls';

const AdminPage = () => {
  const [isOpenFixedButtonBottomSheet, setIsOpenFixedBottomBottomSheet] = useState(false);
  const [order, setOrder] = useState<number>(1);
  const [isOpenAllMemberListButton, setIsOpenAllMemberListButton] = useState(false);

  // TODO: (@weadie) eventName이 새로고침시 공간이 없다가 생겨나 레이아웃이 움직이는 문제
  const [eventName, setEventName] = useState(' ');
  const {getTotalPrice, allMemberList} = useStepList();
  const {eventId} = useEventId();
  const {postAuthentication} = useAuth();
  const navigate = useNavigate();

  // TODO: (@weadie) 아래 로직을 훅으로 분리합니다.
  useEffect(() => {
    if (eventId === '') return;

    const postAuth = async () => {
      try {
        await postAuthentication({eventId: eventId});
      } catch (error) {
        console.log(error);
        navigate(`${ROUTER_URLS.event}/${eventId}/login`);
      }
    };

    const getEventName = async () => {
      const {eventName} = await requestGetEventName({eventId: eventId});

      setEventName(eventName);
    };

    postAuth();
    getEventName();
  }, [eventId]);

  const handleOpenAllMemberListButton = () => {
    setIsOpenFixedBottomBottomSheet(prev => !prev);
    setIsOpenAllMemberListButton(prev => !prev);
  };

  return (
    <>
      <div css={titleAndListButtonContainerStyle}>
        <Title
          title={eventName}
          description="“초기인원 설정하기” 버튼을 눌러서 행사 초기 인원을 설정해 주세요."
          price={getTotalPrice()}
        />
        {allMemberList.length !== 0 && (
          <ListButton
            prefix="전체 참여자"
            suffix={`${allMemberList.length}명`}
            onClick={handleOpenAllMemberListButton}
          />
        )}
      </div>
      <section css={receiptStyle}>
        <StepList />
        <FixedButton
          children={allMemberList.length === 0 ? '초기인원 설정하기' : '행동 추가하기'}
          onClick={() => setIsOpenFixedBottomBottomSheet(prev => !prev)}
        />
        {isOpenFixedButtonBottomSheet && (
          <ModalBasedOnMemberCount
            allMemberList={allMemberList}
            setOrder={setOrder}
            setIsOpenBottomSheet={setIsOpenFixedBottomBottomSheet}
            isOpenBottomSheet={isOpenFixedButtonBottomSheet}
            isOpenAllMemberListButton={isOpenAllMemberListButton}
            setIsOpenAllMemberListButton={setIsOpenAllMemberListButton}
          />
        )}
      </section>
    </>
  );
};

export default AdminPage;
