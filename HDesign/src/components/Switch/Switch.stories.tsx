import type {Meta, StoryObj} from '@storybook/react';

import Switch from '@components/Switch/Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: {
      description: '',
      control: {type: 'select', options: ['홈', '관리']},
    },
    initialValue: {
      description: '',
    },
    values: {
      description: '',
    },
    onChange: {
      description: '',
    },
  },
  args: {
    value: '홈',
    initialValue: '홈',
    values: ['홈', '관리'],
    onChange: value => alert(`${value} 선택됨`),
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
