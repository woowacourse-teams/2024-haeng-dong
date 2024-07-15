/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import BottomSheet from './BottomSheet';
import Button from '../Button/Button';
import {useState} from 'react';

const meta = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
  parameters: {
    // layout: 'centered',
  },
  argTypes: {
    fixedButtonVariants: {
      description: '',
      control: {type: 'select'},
      options: ['', 'primary', 'secondary', 'tertiary'],
    },
    fixedButtonText: {
      description: '',
      control: {type: 'text'},
    },
  },
  args: {
    fixedButtonVariants: 'primary',
    fixedButtonText: '하단 고정 버튼이에요',
  },
} satisfies Meta<typeof BottomSheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({...props}) => {
    const [isOpened, setIsOpened] = useState(false);
    return (
      <>
        <Button variants="tertiary" children="show modal" onClick={() => setIsOpened(true)} />
        <BottomSheet {...props} isOpened={isOpened} onChangeClose={() => setIsOpened(false)} />
      </>
    );
  },
};
