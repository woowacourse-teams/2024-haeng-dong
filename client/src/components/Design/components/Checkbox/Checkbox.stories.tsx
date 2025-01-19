/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import {useState} from 'react';

import Text from '../Text/Text';

import Checkbox from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      description: '',
      control: {type: 'text'},
    },
    checked: {
      description: '',
      control: {type: 'boolean'},
    },
    onChange: {
      description: '',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

const ControlledCheckbox = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox checked={checked} onChange={e => setChecked(e.target.checked)}>
      <Text size="bodyBold">체크박스</Text>
    </Checkbox>
  );
};

export const Playground: Story = {
  render: () => <ControlledCheckbox />,
};
