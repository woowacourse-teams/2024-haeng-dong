/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import Select from './Select';

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <div style={{width: '400px', height: '400px', backgroundColor: 'white', padding: '1rem'}}>
        <Story />
      </div>
    ),
  ],
  args: {
    labelText: '송금 방법 선택',
    placeholder: '송금 방법 선택',
    options: ['쿠키', '토다리', '웨디', '소하'],
    onSelect: (option: string) => console.log(option),
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
