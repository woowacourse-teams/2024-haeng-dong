import type {Meta, StoryObj} from '@storybook/react';

import StepItem from '@components/StepItem/StepItem';

const meta = {
  title: 'Components/StepItem',
  component: StepItem,
  tags: ['autodocs'],
  parameters: {
    // layout: 'centered',
  },
  argTypes: {
    name: {
      description: '',
      control: {type: 'text'},
    },
    personCount: {
      description: '',
      control: {type: 'number'},
    },
    bills: {
      description: '',
      control: {type: 'object'},
    },
  },
  args: {
    name: '으랏차차',
    personCount: 8,
    bills: [
      {
        name: '뽕나무쟁이',
        price: 150000,
      },
      {
        name: '인생네컷',
        price: 12000,
      },
    ],
  },
} satisfies Meta<typeof StepItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
