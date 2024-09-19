/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import {useEffect, useState} from 'react';

import {DepositToggle} from './DepositToggle';

const meta = {
  title: 'Components/DepositToggle',
  component: DepositToggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isDeposit: {
      description: '',
      control: {type: 'boolean'},
    },
    onToggle: {
      description: '',
      control: {type: 'select'},
      options: [undefined, () => alert('change toggle')],
    },
  },
} satisfies Meta<typeof DepositToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    isDeposit: false,
    onToggle: () => {},
  },
  render: ({isDeposit, onToggle, ...args}) => {
    const [isDepositState, setIsDepositState] = useState(isDeposit);

    useEffect(() => {
      setIsDepositState(isDeposit);
    }, [isDeposit]);

    const handleToggle = () => {
      setIsDepositState(!isDepositState);
      onToggle();
    };

    return <DepositToggle {...args} isDeposit={isDepositState} onToggle={handleToggle} />;
  },
};
