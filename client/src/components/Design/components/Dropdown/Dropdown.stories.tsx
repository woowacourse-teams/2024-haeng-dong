/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import Dropdown from '@HDcomponents/Dropdown/Dropdown';

import DropdownButton from './DropdownButton';

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <div style={{height: '420px'}}>
        <Story />
      </div>
    ),
  ],
  args: {
    children: [
      <DropdownButton text="전체 참여자 관리" onClick={() => alert('전체 참여자 관리 클릭')} />,
      <DropdownButton text="계좌번호 입력하기" onClick={() => alert('계좌번호 입력하기 클릭')} />,
    ],
  },
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
