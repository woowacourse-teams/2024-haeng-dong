/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import Toast from '@components/Toast/Toast';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    // layout: 'centered',
  },
  args: {
    top: 80,
    message: `서버 오류로 인해 인원을 설정하는데 실패했어요.
두글자면 이렇게 보여요.`,
    showingTime: 1000,
    alwaysShow: false,
  },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
