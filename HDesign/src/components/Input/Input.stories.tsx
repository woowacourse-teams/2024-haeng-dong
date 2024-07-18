import type {Meta, StoryObj} from '@storybook/react';

import Input from '@components/Input/Input';

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
    inputType: {
      // TODO: (@cookie) 스토리북 라디오버튼 보이도록 설정해야 함
      control: {type: 'radio'},
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
