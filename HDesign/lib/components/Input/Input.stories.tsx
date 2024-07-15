import type {Meta, StoryObj} from '@storybook/react';

import Input from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    // layout: 'centered',
  },
  argTypes: {
    value: {
      description: '',
      control: {type: 'text'},
    },
  },
  args: {
    disabled: false,
    placeholder: 'placeholder',
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
