import {css} from '@emotion/react';

import AmountInput from '@components/AmountInput/AmountInput';
import BillDetails from '@components/BillDetails/BillDetails';
import NumberKeyboardBottomSheet from '@components/Design/components/NumberKeyboard/NumberKeyboardBottomSheet';
import Top from '@components/Design/components/Top/Top';

import useEditBillPage from '@hooks/useEditBillPage';

import {FixedButton, Flex, MainLayout, TopNav} from '@components/Design';

const EditBillPage = () => {
  const {
    newBill,
    newBillDetails,
    billDetailsRef,
    handleChangeBillTitle,
    handleChangeBillPrice,
    handleChangeBillDetails,
    handleClickBillDetailInput,
    handleClickDelete,
    handleClickUpdate,
    isPendingUpdate,
    canSubmit,
    keyboardInitialValue,
    keyboardMaxPrice,
    keyboardTargetId,
    setKeyboardTargetId,
  } = useEditBillPage();

  return (
    <MainLayout backgroundColor="white">
      <TopNav>
        <TopNav.Element displayName="뒤로가기" noEmphasis routePath="-1" />
      </TopNav>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1rem;
        `}
      >
        <Top>
          <Flex justifyContent="spaceBetween">
            <Top.EditableLine value={newBill.title} onChange={handleChangeBillTitle} />
            <Top.Line text="에서" />
          </Flex>
        </Top>
        <AmountInput
          value={newBill.price.toLocaleString('ko-kr')}
          onClick={() => handleClickBillDetailInput(0)}
          underlined={true}
          activated={keyboardTargetId === 0}
        />

        <BillDetails
          ref={billDetailsRef}
          billDetails={newBillDetails}
          onClickInput={handleClickBillDetailInput}
          activatedId={keyboardTargetId as number}
        />
      </div>
      {keyboardTargetId !== null && (
        <div
          css={css`
            height: 416px;
          `}
          content=" "
        />
      )}
      <FixedButton
        disabled={!canSubmit}
        onClick={handleClickUpdate}
        onDeleteClick={handleClickDelete}
        variants={isPendingUpdate() ? 'loading' : 'primary'}
      >
        수정완료
      </FixedButton>
      <NumberKeyboardBottomSheet
        type="amount"
        maxNumber={keyboardMaxPrice}
        initialValue={keyboardInitialValue}
        onChange={
          keyboardTargetId === 0
            ? handleChangeBillPrice
            : (value: string) => handleChangeBillDetails({value, keyboardTargetId: keyboardTargetId ?? 0})
        }
        isOpened={keyboardTargetId !== null}
        onClose={() => setKeyboardTargetId(null)}
      />
    </MainLayout>
  );
};

export default EditBillPage;
