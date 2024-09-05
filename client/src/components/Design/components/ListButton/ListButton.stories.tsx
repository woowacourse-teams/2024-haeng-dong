import type {Meta, StoryObj} from '@storybook/react';

import ListButton from '@HDcomponents/ListButton/ListButton';

const meta = {
  title: 'Components/ListButton',
  component: ListButton,
  tags: ['autodocs'],
  parameters: {
    // layout: 'centered',
  },
  argTypes: {
    prefix: {
      description: '',
      control: {type: 'text'},
    },
    suffix: {
      description: '',
      control: {type: 'text'},
    },
  },
  args: {
    prefix: '전체 참여자',
    suffix: '7명',
  },
} satisfies Meta<typeof ListButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
