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
    type: 'confirm',
    position: 'top',
    top: '80px',
    message: `서버 오류로 인해 인원을 설정하는데 실패했어요.
두글자면 이렇게 보여요.`,
    onUndo: () => alert('되돌리기 버튼이 눌렸습니다. 실행할 로직을 전달해주세요'),
  },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ConfirmToast: Story = {
  args: {
    ...meta.args,
    type: 'confirm',
    top: '80px',
    message: `님 이거 다 작성했는데, 혹시 되돌림?
    되돌릴 수도 있음 ㅇㅇ 굿`,
  },
};

export const ConfirmToastWithoutUndo: Story = {
  args: {
    ...meta.args,
    onUndo: undefined,
    top: '160px',
  },
};

export const ErrorToast: Story = {
  args: {
    ...meta.args,
    top: '240px',
    type: 'error',
    message: `님 이거 다 작성했는데, 혹시 되돌림?
    되돌릴 수도 있음 ㅇㅇ 굿`,
  },
};

export const ErrorToastWithoutUndo: Story = {
  args: {
    ...meta.args,
    top: '320px',
    onUndo: undefined,
    type: 'error',
  },
};

export const NoneToast: Story = {
  args: {
    ...meta.args,
    top: '400px',
    onUndo: undefined,
    type: 'none',
    message: '웨디는 커비의 먹잇감인가요? 그치만 감자는 웨디한테 먹힘 쿠스쿠스 ㅋ',
  },
};
