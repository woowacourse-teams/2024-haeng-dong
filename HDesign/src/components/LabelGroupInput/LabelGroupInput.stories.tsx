/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import LabelGroupInput from '@components/LabelGroupInput/LabelGroupInput';

const meta = {
  title: 'Components/LabelGroupInput',
  component: LabelGroupInput,
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
    labelText: '지출내역 / 금액',
    errorText: 'error가 발생했을 때 나타납니다!',
  },
} satisfies Meta<typeof LabelGroupInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({...args}) => (
    <LabelGroupInput {...args}>
      <LabelGroupInput.Element key="name" placeholder="지출내역" isError={false} />
      <LabelGroupInput.Element key="price" placeholder="금액" isError={false} />
    </LabelGroupInput>
  ),
};
