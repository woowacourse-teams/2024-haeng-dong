import {useEffect, useState} from 'react';
import {Title, FixedButton, ListButton} from 'haengdong-design';

import StepList from '@components/StepList/StepList';
import {ModalBasedOnMemberCount} from '@components/Modal/index';

import useRequestGetAllMemberList from '@hooks/useRequestGetAllMemberList';
import useRequestPostAuthenticate from '@hooks/useRequestPostAuthentication';

import {useTotalExpenseAmountStore} from '@store/totalExpenseAmountStore';

import {receiptStyle, titleAndListButtonContainerStyle} from './AdminPage.style';
import {useOutletContext} from 'react-router-dom';
import {EventPageContextProps} from '../EventPageLayout';

const AdminPage = () => {
  const [isOpenFixedButtonBottomSheet, setIsOpenFixedButtonBottomSheet] = useState(false);
  const [isOpenAllMemberListButton, setIsOpenAllMemberListButton] = useState(false);

  const {eventName} = useOutletContext<EventPageContextProps>();
  const {data: allMemberListData} = useRequestGetAllMemberList();
  const allMemberList = allMemberListData?.memberNames ?? [];

  const {totalExpenseAmount} = useTotalExpenseAmountStore();

  const {mutate: postAuthentication} = useRequestPostAuthenticate();

  useEffect(() => {
    postAuthentication();
  }, [postAuthentication]);

  const handleOpenAllMemberListButton = () => {
    setIsOpenFixedButtonBottomSheet(prev => !prev);
    setIsOpenAllMemberListButton(prev => !prev);
  };

  const getTitleDescriptionByInitialMemberSetting = () => {
    return allMemberList.length > 0
      ? '“행동 추가하기” 버튼을 눌러서 지출 내역 및 인원 변동사항을 추가해 주세요.'
      : '“초기인원 설정하기” 버튼을 눌러서 행사 초기 인원을 설정해 주세요.';
  };

  return (
    <>
      <div css={titleAndListButtonContainerStyle}>
        <Title title={eventName} description={getTitleDescriptionByInitialMemberSetting()} price={totalExpenseAmount} />
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
          onClick={() => setIsOpenFixedButtonBottomSheet(prev => !prev)}
        />
        {isOpenFixedButtonBottomSheet && (
          <ModalBasedOnMemberCount
            allMemberList={allMemberList}
            setIsOpenBottomSheet={setIsOpenFixedButtonBottomSheet}
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
