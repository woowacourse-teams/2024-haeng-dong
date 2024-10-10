/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import SendButton from './SendButton';

const meta = {
  title: 'Components/SendButton',
  component: SendButton,
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
    isDeposited: false,
    canSend: true,
    onClick: () => console.log('안녕'),
  },
} satisfies Meta<typeof SendButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
