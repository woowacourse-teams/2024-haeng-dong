/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import {useState} from 'react';

import Button from '@components/Button/Button';
import BottomSheet from '@components/BottomSheet/BottomSheet';

const meta = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
  parameters: {
    // layout: 'centered',
  },
  argTypes: {
    fixedButtonProps: {
      description: '',
      control: {type: 'object'},
    },
  },
  args: {
    fixedButtonProps: {
      variants: 'primary',
    },
  },
} satisfies Meta<typeof BottomSheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    fixedButtonProps: {
      variants: 'primary',
      children: '하단 고정 버튼',
    },
  },
  render: ({...args}) => {
    const [isOpened, setIsOpened] = useState(false);
    return (
      <>
        <Button variants="tertiary" children="show modal" onClick={() => setIsOpened(true)} />
        <BottomSheet {...args} isOpened={isOpened} onChangeClose={() => setIsOpened(false)} />
      </>
    );
  },
};
