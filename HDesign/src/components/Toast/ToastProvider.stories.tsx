/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';
import {ToastProvider, useToast} from './ToastProvider';
import Button from '../Button/Button';

const meta = {
  title: 'Components/ToastProvider',
  component: ToastProvider,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
} satisfies Meta<typeof ToastProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [
    () => {
      const {showToast} = useToast();

      return (
        <Button
          onClick={() =>
            showToast({
              isAlwaysOn: true,
              message: '이거자냥 (feat. 쿠키)',
              type: 'confirm',
              position: 'top',
            })
          }
        >
          토스트 열기
        </Button>
      );
    },
  ],
};
