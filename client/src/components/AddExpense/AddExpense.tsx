import {EditableItem, Flex, Text} from 'haengdong-design';
import {useState} from 'react';

const AddExpense = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  return (
    <EditableItem
      backgroundColor="lightGrayContainer"
      onFocus={() => console.log('focus')}
      onBlur={() => console.log('blur')}
    >
      <EditableItem.Input placeholder="지출 내역" textSize="bodyBold"></EditableItem.Input>
      <Flex gap="0.25rem" alignItems="center">
        <EditableItem.Input placeholder="0" type="number" style={{textAlign: 'right'}}></EditableItem.Input>
        <Text size="caption">원</Text>
      </Flex>
    </EditableItem>
  );
};

export default AddExpense;
