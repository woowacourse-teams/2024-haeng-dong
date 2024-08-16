import {useEffect, useState} from 'react';
import {Title, FixedButton, ListButton, Button, Flex} from 'haengdong-design';
import {useOutletContext} from 'react-router-dom';

import StepList from '@components/StepList/StepList';
import {ModalBasedOnMemberCount} from '@components/Modal/index';

import {useStepList} from '@hooks/useStepList';
import useAuth from '@hooks/useAuth';

import {EventPageContextProps} from '../EventPageLayout';

import {receiptStyle, titleAndListButtonContainerStyle} from './AdminPage.style';
import {css} from '@emotion/react';
import AddExpense from '@components/AddExpense/AddExpense';

const AdminPage = () => {
  const {eventId, eventName} = useOutletContext<EventPageContextProps>();

  const [isOpenFixedButtonBottomSheet, setIsOpenFixedBottomBottomSheet] = useState(false);
  const [isOpenAllMemberListButton, setIsOpenAllMemberListButton] = useState(false);
  const [isShownNewExpenseItem, setIsShownNewExpenseItem] = useState(false);

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
      ? '“행동 추가하기” 버튼을 눌러서 지출 내역 및 인원 변동사항을 추가해 주세요.'
      : '“초기인원 설정하기” 버튼을 눌러서 행사 초기 인원을 설정해 주세요.';
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
        {isShownNewExpenseItem ? <AddExpense /> : null}
        {allMemberList.length === 0 ? (
          <Button size="medium" onClick={() => setIsOpenFixedBottomBottomSheet(prev => !prev)}>
            초기인원 설정하기
          </Button>
        ) : (
          <Flex gap="0.5rem">
            <Button
              css={css({width: '100%'})}
              size="medium"
              variants="tertiary"
              onClick={() => setIsOpenFixedBottomBottomSheet(prev => !prev)}
            >
              인원변동 추가
            </Button>
            <Button css={css({width: '100%'})} size="medium" onClick={() => setIsShownNewExpenseItem(prev => !prev)}>
              지출내역 추가
            </Button>
          </Flex>
        )}
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
