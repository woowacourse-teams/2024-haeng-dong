/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import {useRef, useState} from 'react';

import {Flex, Input} from '@components/Design';

import RULE from '@constants/rule';

import NumberKeyboard from './NumberKeyboard';

const meta = {
  title: 'Components/NumberKeyboard',
  component: NumberKeyboard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {description: '', control: {type: 'select'}, options: ['amount', 'number', 'string']},
  },
  args: {
    type: 'amount',
    maxNumber: RULE.maxPrice,
    onChange: () => {},
  },
} satisfies Meta<typeof NumberKeyboard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({type, maxNumber}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState('');
    return (
      <Flex flexDirection="column" gap="2rem" width="430px">
        <Input ref={inputRef} value={value} placeholder="금액을 입력하세요" />
        <NumberKeyboard type={type} maxNumber={maxNumber} onChange={setValue} />
      </Flex>
    );
  },
};
