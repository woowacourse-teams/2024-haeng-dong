/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import Step from './Step';

const meta = {
  title: 'Components/Step',
  component: Step,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    step: {
      description: '',
    },
  },
  args: {
    step: {
      bills: [
        {
          id: 1,
          title: '커피',
          price: 10000,
          isFixed: false,
        },
        {
          id: 2,
          title: '인생네컷',
          price: 20000,
          isFixed: false,
        },
      ],
      members: [
        {
          id: 1,
          name: '망쵸',
        },
        {
          id: 2,
          name: '백호',
        },
      ],
    },
  },
} satisfies Meta<typeof Step>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({...args}) => {
    return (
      <div style={{width: '400px'}}>
        <Step {...args} />
      </div>
    );
  },
};
