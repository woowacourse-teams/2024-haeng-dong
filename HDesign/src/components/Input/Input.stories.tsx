import type {Meta, StoryObj} from '@storybook/react';

import React, {useEffect, useState} from 'react';

import Input from '@components/Input/Input';
import Flex from '@components/Flex/Flex';
import Button from '@components/Button/Button';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    inputType: {
      // TODO: (@cookie) 스토리북 라디오버튼 보이도록 설정해야 함
      control: {type: 'radio'},
    },
  },
  args: {
    placeholder: 'placeholder',
    autoFocus: true,
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({...args}) => {
    const regex = /^[ㄱ-ㅎ가-힣]*$/;
    const [value, setValue] = useState('');
    const [isError, setIsError] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      if (regex.test(newValue)) {
        setValue(newValue);
        setIsError(false);
      } else {
        setIsError(true);
      }
    };

    const changeRandomValue = () => {
      setValue('외부에서 값 변경됨');
    };

    return (
      <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
        <Button onClick={changeRandomValue}>input 값 변경</Button>
        <Input value={value} onChange={handleChange} isError={isError} {...args} />
      </div>
    );
  },
};
