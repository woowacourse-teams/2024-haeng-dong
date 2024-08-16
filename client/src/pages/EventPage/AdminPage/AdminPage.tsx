import {useEffect, useState} from 'react';
import {Title, FixedButton, ListButton} from 'haengdong-design';
import {useOutletContext} from 'react-router-dom';

import StepList from '@components/StepList/StepList';
import {ModalBasedOnMemberCount} from '@components/Modal/index';

import {useStepList} from '@hooks/useStepList';
import useAuth from '@hooks/useAuth';

import {EventPageContextProps} from '../EventPageLayout';

import {receiptStyle, titleAndListButtonContainerStyle} from './AdminPage.style';

const AdminPage = () => {
  const {eventId, eventName} = useOutletContext<EventPageContextProps>();

  const [isOpenFixedButtonBottomSheet, setIsOpenFixedBottomBottomSheet] = useState(false);
  const [isOpenAllMemberListButton, setIsOpenAllMemberListButton] = useState(false);

  const {getTotalPrice, allMemberList} = useStepList();
  const {postAuthentication} = useAuth();

  useEffect(() => {
    const postAuth = async () => {
      await postAuthentication({eventId: eventId});
    };

    postAuth();
  }, []);

  const handleOpenAllMemberListButton = () => {
    setIsOpenFixedBottomBottomSheet(prev => !prev);
    setIsOpenAllMemberListButton(prev => !prev);
  };

  const getTitleDescriptionByInitialMemberSetting = () => {
    return allMemberList.length > 0
      ? `지출 내역 및 인원 변동을 추가해 주세요.
      인원 변동을 기준으로 몇 차인지 나뉘어져요.`
      : '“시작 인원 추가” 버튼을 눌러 행사의 시작부터 참여하는 사람들의 이름을 입력해 주세요.';
  };

  return (
    <>
      <div css={titleAndListButtonContainerStyle}>
        <Title title={eventName} description={getTitleDescriptionByInitialMemberSetting()} price={getTotalPrice()} />
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
          children={allMemberList.length === 0 ? '시작인원 추가하기' : '행동 추가하기'}
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
