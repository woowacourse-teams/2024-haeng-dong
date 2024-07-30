/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import LabelInput from '@components/LabelInput/LabelInput';
import Input from '@components/Input/Input';

const meta = {
  title: 'Components/LabelInput',
  component: LabelInput,
  tags: ['autodocs'],
  parameters: {
    // layout: 'centered',
  },
  argTypes: {
    labelText: {
      description: 'label에 들어갈 텍스트를 작성',
      control: {type: 'text'},
    },
    errorText: {
      description: 'error에 들어갈 텍스트를 작성',
      control: {type: 'text'},
    },
  },
  args: {
    labelText: 'label 내용',
    errorText: 'error가 발생했을 때 나타납니다!',
    children: <Input placeholder="labelInput 테스트를 위한 Input" />,
  },
} satisfies Meta<typeof LabelInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
