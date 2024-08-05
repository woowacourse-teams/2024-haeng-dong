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
  argTypes: {},
} satisfies Meta<typeof BottomSheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({...args}) => {
    const [isOpened, setIsOpened] = useState(false);
    return (
      <>
        <Button variants="tertiary" children="show modal" onClick={() => setIsOpened(true)} />
        <BottomSheet {...args} isOpened={isOpened} onClose={() => setIsOpened(false)} />
      </>
    );
  },
};
