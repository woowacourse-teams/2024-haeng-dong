import type {Meta, StoryObj} from '@storybook/react';

import React, {useEffect, useState} from 'react';

import Input from '@components/Input/Input';

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
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({...args}) => {
    const [value, setValue] = useState('');
    const [isError, setIsError] = useState(false);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value.length < 4) {
        setValue(event.target.value);
        setIsError(false);
      } else {
        event.target.value = value;
        setIsError(true);
      }
    };
    const handleBlur = () => {
      console.log('blur');
    };

    return <Input value={value} onChange={e => handleChange(e)} isError={isError} onBlur={handleBlur} {...args} />;
  },
};
