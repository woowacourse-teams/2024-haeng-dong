/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import {useState} from 'react';

import EditableItem from '@components/EditableItem/EditableItem';
import Flex from '@components/Flex/Flex';
import Text from '@components/Text/Text';

const meta = {
  title: 'Components/EditableItem',
  component: EditableItem,
  tags: ['autodocs'],
  parameters: {},
  argTypes: {
    backgroundColor: {
      description: '',
      control: {type: 'select'},
    },
  },
  args: {
    backgroundColor: 'lightGrayContainer',
  },
} satisfies Meta<typeof EditableItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({...args}) => {
    const [value, setValue] = useState('');
    const [value2, setValue2] = useState('');

    return (
      <EditableItem
        backgroundColor={args.backgroundColor}
        onFocus={() => console.log('focus')}
        onBlur={() => console.log('blur')}
      >
        <EditableItem.Input
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="지출 내역"
          textSize="bodyBold"
        ></EditableItem.Input>
        <Flex gap="0.25rem" alignItems="center">
          <EditableItem.Input
            value={value2}
            onChange={e => setValue2(e.target.value)}
            placeholder="0"
            type="number"
            style={{textAlign: 'right'}}
          ></EditableItem.Input>
          <Text size="caption">원</Text>
        </Flex>
      </EditableItem>
    );
  },
};

export const WithLabel: Story = {
  render: ({...args}) => {
    const [value, setValue] = useState('');
    const [value2, setValue2] = useState('');

    return (
      <EditableItem
        prefixLabelText="라벨"
        backgroundColor={args.backgroundColor}
        onFocus={() => console.log('focus')}
        onBlur={() => console.log('blur')}
      >
        <EditableItem.Input
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="지출 내역"
          textSize="bodyBold"
        ></EditableItem.Input>
        <Flex gap="0.25rem" alignItems="center">
          <EditableItem.Input
            value={value2}
            onChange={e => setValue2(e.target.value)}
            placeholder="0"
            type="number"
            style={{textAlign: 'right'}}
          ></EditableItem.Input>
          <Text size="caption">원</Text>
        </Flex>
      </EditableItem>
    );
  },
};

export const WithLabelAndIsFixedIcon: Story = {
  render: ({...args}) => {
    const [value, setValue] = useState('');
    const [value2, setValue2] = useState('');

    return (
      <EditableItem
        prefixLabelText="라벨"
        backgroundColor={args.backgroundColor}
        onFocus={() => console.log('focus')}
        onBlur={() => console.log('blur')}
      >
        <EditableItem.Input
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="지출 내역"
          textSize="bodyBold"
        ></EditableItem.Input>
        <Flex gap="0.25rem" alignItems="center">
          <EditableItem.Input
            value={value2}
            onChange={e => setValue2(e.target.value)}
            isFixed={true}
            placeholder="0"
            type="number"
            style={{textAlign: 'right'}}
          ></EditableItem.Input>
          <Text size="caption">원</Text>
        </Flex>
      </EditableItem>
    );
  },
};

export const WithLabels: Story = {
  render: ({...args}) => {
    const [value, setValue] = useState('');
    const [value2, setValue2] = useState('');

    return (
      <EditableItem
        prefixLabelText="왼쪽 라벨"
        suffixLabelText="오른쪽 라벨"
        backgroundColor={args.backgroundColor}
        onFocus={() => console.log('focus')}
        onBlur={() => console.log('blur')}
      >
        <EditableItem.Input
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="지출 내역"
          textSize="bodyBold"
        ></EditableItem.Input>
        <Flex gap="0.25rem" alignItems="center">
          <EditableItem.Input
            value={value2}
            onChange={e => setValue2(e.target.value)}
            placeholder="0"
            type="number"
            style={{textAlign: 'right'}}
          ></EditableItem.Input>
          <Text size="caption">원</Text>
        </Flex>
      </EditableItem>
    );
  },
};

export const ReadOnly: Story = {
  render: ({...args}) => {
    return (
      <EditableItem
        prefixLabelText="왼쪽 라벨"
        suffixLabelText="오른쪽 라벨"
        backgroundColor={args.backgroundColor}
        onFocus={() => console.log('focus')}
        onBlur={() => console.log('blur')}
      >
        <EditableItem.Input
          value={'훠궈무한리필'}
          readOnly
          placeholder="지출 내역"
          textSize="bodyBold"
        ></EditableItem.Input>
        <Flex gap="0.25rem" alignItems="center">
          <EditableItem.Input
            value={'10000'}
            readOnly
            placeholder="0"
            type="number"
            style={{textAlign: 'right'}}
          ></EditableItem.Input>
          <Text size="caption">원</Text>
        </Flex>
      </EditableItem>
    );
  },
};

export const ReadOnlyWithIsFixedIcon: Story = {
  render: ({...args}) => {
    return (
      <EditableItem
        prefixLabelText="왼쪽 라벨"
        suffixLabelText="오른쪽 라벨"
        backgroundColor={args.backgroundColor}
        onFocus={() => console.log('focus')}
        onBlur={() => console.log('blur')}
      >
        <EditableItem.Input
          value={'훠궈무한리필'}
          readOnly
          placeholder="지출 내역"
          textSize="bodyBold"
        ></EditableItem.Input>
        <Flex gap="0.25rem" alignItems="center">
          <EditableItem.Input
            isFixed
            value={'10000'}
            readOnly
            placeholder="0"
            type="number"
            style={{textAlign: 'right'}}
          ></EditableItem.Input>
          <Text size="caption">원</Text>
        </Flex>
      </EditableItem>
    );
  },
};

export const ListView: Story = {
  render: ({...args}) => {
    const LENGTH = 5;
    const [valueList, setValueList] = useState(new Array(LENGTH).fill(''));
    const [valueList2, setValueList2] = useState(new Array(LENGTH).fill(''));

    const handleValueListChange = (index: number, newValue: string) => {
      const updatedList = [...valueList];
      updatedList[index] = newValue;
      setValueList(updatedList);
    };

    const handleValueList2Change = (index: number, newValue: string) => {
      const updatedList = [...valueList2];
      updatedList[index] = newValue;
      setValueList2(updatedList);
    };

    return (
      <EditableItem
        prefixLabelText="라벨"
        backgroundColor={args.backgroundColor}
        onFocus={() => console.log('focus')}
        onBlur={() => console.log('blur')}
      >
        <Flex flexDirection="column" width="100%" gap="1rem">
          {valueList.map((value, index) => (
            <Flex key={index} justifyContent="spaceBetween">
              <EditableItem.Input
                value={value}
                onChange={e => handleValueListChange(index, e.target.value)}
                placeholder="지출 내역"
                textSize="bodyBold"
              ></EditableItem.Input>
              <Flex gap="0.25rem" alignItems="center">
                <EditableItem.Input
                  value={valueList2[index]}
                  onChange={e => handleValueList2Change(index, e.target.value)}
                  placeholder="0"
                  type="number"
                  style={{textAlign: 'right'}}
                ></EditableItem.Input>
                <Text size="caption">원</Text>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </EditableItem>
    );
  },
};
