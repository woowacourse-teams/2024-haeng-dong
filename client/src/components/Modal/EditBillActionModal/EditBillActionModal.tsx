import {BottomSheet, LabelGroupInput, FixedButton, Text} from 'haengdong-design';
import {useState} from 'react';

import {BillAction} from 'types/serviceType';

interface EditBillActionModalProps {
  isOpened: boolean;
  billAction: BillAction;
}

const EditBillActionModal = ({isOpened, billAction}: EditBillActionModalProps) => {
  const [errorText, setErrorText] = useState('');

  const [isEdited, setIsEdited] = useState(false);

  return (
    <BottomSheet isOpened={isOpened}>
      <Text size="bodyBold">지출 내역 수정하기</Text>
      <LabelGroupInput labelText="지출내역 / 금액" errorText={errorText}>
        <LabelGroupInput.Element elementKey="name" value={billAction.name} />
        <LabelGroupInput.Element elementKey="price" value={billAction.price} />
      </LabelGroupInput>
      <FixedButton />
    </BottomSheet>
  );
};

export default EditBillActionModal;
