/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import {useEffect, useState} from 'react';

import LabelInput from '@components/LabelInput/LabelInput';

const meta = {
  title: 'Components/LabelInput',
  component: LabelInput,
  tags: ['autodocs'],
  parameters: {
    // layout: 'centered',
  },
  argTypes: {
    labelText: {
      description: 'label에 들어갈 텍스트를 작성',
      control: {type: 'text'},
    },
    isError: {
      description: '',
      control: {type: 'boolean'},
    },
    errorText: {
      description: 'error에 들어갈 텍스트를 작성',
      control: {type: 'text'},
    },
  },
  args: {
    // value: '',
    labelText: '이름',
    errorText: 'error가 발생했을 때 나타납니다!',
  },
} satisfies Meta<typeof LabelInput>;

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
    return <LabelInput value={value} onChange={e => handleChange(e)} isError={isError} {...args} />;
  },
};
