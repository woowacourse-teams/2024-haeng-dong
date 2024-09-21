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
    isFinish: {
      description: '',
      control: {type: 'boolean'},
    },
  },
  args: {
    clipboardText: '토스뱅크 010100-10-123123',
    onBankButtonClick: () => console.log('안녕'),
  },
} satisfies Meta<typeof BankSendButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
