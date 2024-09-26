import type {Meta, StoryObj} from '@storybook/react';

import Title from '@HDcomponents/Title/Title';

const meta = {
  title: 'Components/Title',
  component: Title,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      description: '',
      control: {type: 'text'},
    },
    amount: {
      description: '',
      control: {type: 'number'},
    },
  },
  args: {
    title: '행동대장 야유회',
    amount: 100000,
  },
} satisfies Meta<typeof Title>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
