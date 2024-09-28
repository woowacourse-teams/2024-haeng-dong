/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import BankSendButton from './BankSendButton';

const meta = {
  title: 'Components/BankSendButton',
  component: BankSendButton,
  tags: ['autodocs'],
  parameters: {
    // layout: 'centered',
  },
  argTypes: {
    isDeposited: {
      description: '',
      control: {type: 'boolean'},
    },
  },
  args: {
    onBankButtonClick: () => console.log('안녕'),
  },
} satisfies Meta<typeof BankSendButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
