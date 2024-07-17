import type {Meta, StoryObj} from '@storybook/react';

import IconButton from '@components/IconButton/IconButton';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    iconType: {
      description: '',
      control: {type: 'select'},
      options: ['plus', 'inputDelete', 'buljusa'],
    },
  },
  args: {
    iconType: 'plus',
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
