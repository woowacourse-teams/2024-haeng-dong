import type {EventIdAndName} from 'types/serviceType';

import {useEffect, useState} from 'react';
import {Title, FixedButton, ListButton} from 'haengdong-design';
import {useLoaderData, useNavigate} from 'react-router-dom';

import StepList from '@components/StepList/StepList';
import {requestGetEventName} from '@apis/request/event';
import {ModalBasedOnMemberCount} from '@components/Modal/index';

import {useStepList} from '@hooks/useStepList';
import useAuth from '@hooks/useAuth';

import {ROUTER_URLS} from '@constants/routerUrls';

import {receiptStyle, titleAndListButtonContainerStyle} from './AdminPage.style';

const AdminPage = () => {
  const [isOpenFixedButtonBottomSheet, setIsOpenFixedBottomBottomSheet] = useState(false);
  const [isOpenAllMemberListButton, setIsOpenAllMemberListButton] = useState(false);

  const {eventId, eventName} = useLoaderData() as EventIdAndName;

  const {getTotalPrice, allMemberList} = useStepList();
  const {postAuthentication} = useAuth();
  const navigate = useNavigate();

  // TODO: (@weadie) 아래 로직을 훅으로 분리합니다.
  useEffect(() => {
    const postAuth = async () => {
      try {
        await postAuthentication({eventId: eventId});
      } catch (error) {
        console.log(error);
        navigate(`${ROUTER_URLS.event}/${eventId}/login`);
      }
    };

    postAuth();
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
