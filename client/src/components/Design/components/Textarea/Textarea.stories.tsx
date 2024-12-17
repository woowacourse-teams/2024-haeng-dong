/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import {useEffect, useState} from 'react';

import Textarea from './Textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    placeholder: {
      description: '',
      control: {type: 'text'},
    },
    maxLength: {
      description: '',
      control: {type: 'number'},
    },

    value: {
      description: '',
      control: {type: 'text'},
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    placeholder: '내용을 입력해주세요.',
    maxLength: 100,
    value: '',
  },
  render: ({placeholder, value, maxLength, ...args}) => {
    const [placeholderState, setPlaceholderState] = useState(placeholder);
    const [maxLengthState, setMaxLengthState] = useState(maxLength);
    const [valueState, setValueState] = useState(value);

    useEffect(() => {
      setPlaceholderState(placeholder);
      setMaxLengthState(maxLength);
      setValueState(value);
    }, [maxLength, placeholder, value]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValueState(event.target.value);
    };

    return (
      <Textarea
        {...args}
        value={valueState}
        onChange={handleChange}
        placeholder={placeholderState}
        maxLength={maxLengthState}
      />
    );
  },
};
