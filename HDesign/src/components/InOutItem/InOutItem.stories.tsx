import type {Meta, StoryObj} from '@storybook/react';

import InOutItem from '@components/InOutItem/InOutItem';

const meta = {
  title: 'Components/InOutItem',
  component: InOutItem,
  tags: ['autodocs'],
  parameters: {
    // layout: 'centered',
  },
  argTypes: {
    names: {
      description: '',
      control: {type: 'text'},
    },
    inOutType: {
      description: '',
      control: {type: 'select', options: ['in', 'out']},
    },
  },
  args: {
    names: ['감자', '토다리'],
    inOutType: 'out',
  },
} satisfies Meta<typeof InOutItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
