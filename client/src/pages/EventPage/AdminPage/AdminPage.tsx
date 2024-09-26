import {useEffect, useState} from 'react';
import {Title, FixedButton, ListButton, Button} from 'haengdong-design';
import {useOutletContext} from 'react-router-dom';

import StepList from '@components/StepList/StepList';
import {ModalBasedOnMemberCount, SetAllMemberListModal} from '@components/Modal/index';
import useRequestGetAllMemberList from '@hooks/queries/useRequestGetAllMemberList';
import useRequestPostAuthenticate from '@hooks/queries/useRequestPostAuthentication';

import {useTotalExpenseAmountStore} from '@store/totalExpenseAmountStore';

import {EventPageContextProps} from '../EventPageLayout';

import {receiptStyle, titleAndListButtonContainerStyle, buttonGroupStyle} from './AdminPage.style';

const AdminPage = () => {
  const [isOpenFixedButtonBottomSheet, setIsOpenFixedButtonBottomSheet] = useState(false);
  const [isOpenAllMemberListButton, setIsOpenAllMemberListButton] = useState(false);
  const [isAddEditableItem, setIsAddEditableItem] = useState(false);

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
      ? `지출 내역 및 인원 변동을 추가해 주세요.
      인원 변동을 기준으로 몇 차인지 나뉘어져요.`
      : '“시작 인원 추가” 버튼을 눌러 행사의 시작부터 참여하는 사람들의 이름을 입력해 주세요.';
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
        <StepList isAddEditableItem={isAddEditableItem} setIsAddEditableItem={setIsAddEditableItem} />
        {allMemberList.length === 0 ? (
          <FixedButton children={'시작인원 추가하기'} onClick={() => setIsOpenFixedButtonBottomSheet(prev => !prev)} />
        ) : (
          <div css={buttonGroupStyle}>
            <Button
              size="medium"
              variants="tertiary"
              style={{width: '100%'}}
              onClick={() => setIsOpenFixedButtonBottomSheet(prev => !prev)}
            >
              인원 변동 추가
            </Button>
            <Button size="medium" onClick={() => setIsAddEditableItem(true)} style={{width: '100%'}}>
              지출 내역 추가
            </Button>
          </div>
        )}
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
