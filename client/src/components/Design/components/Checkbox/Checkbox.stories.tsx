/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import {useEffect, useState} from 'react';

import Checkbox from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    labelText: {
      description: '',
      control: {type: 'text'},
    },
    isChecked: {
      description: '',
      control: {type: 'boolean'},
    },
    onChange: {
      description: '',
      control: {type: 'object'},
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    isChecked: false,
    onChange: () => {},
    labelText: '체크박스',
  },
  render: ({isChecked, onChange, labelText, ...args}) => {
    const [isCheckedState, setIsCheckedState] = useState(isChecked);
    const [labelTextState, setLabelTextState] = useState(labelText);

    useEffect(() => {
      setIsCheckedState(isChecked);
      setLabelTextState(labelText);
    }, [isChecked, labelText]);

    const handleToggle = () => {
      setIsCheckedState(!isCheckedState);
      onChange();
    };

    return <Checkbox {...args} isChecked={isCheckedState} onChange={handleToggle} labelText={labelTextState} />;
  },
};
