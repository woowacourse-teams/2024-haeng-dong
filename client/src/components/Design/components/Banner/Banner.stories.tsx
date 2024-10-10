/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import Banner from './Banner';

const meta = {
  title: 'Components/Banner',
  component: Banner,
  tags: ['autodocs'],
  parameters: {
    // layout: 'centered',
  },
  argTypes: {},
  args: {
    onDelete: () => console.log(''),
    title: '계좌번호가 등록되지 않았어요',
    description: '계좌번호를 입력해야 참여자가 편하게 송금할 수 있어요',
    buttonText: '등록하기',
  },
} satisfies Meta<typeof Banner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
