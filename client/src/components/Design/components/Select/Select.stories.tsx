/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import Select from './Select';

// Option 타입 정의
type Option = '쿠키' | '토다리' | '웨디' | '소하';
const options: Option[] = ['쿠키', '토다리', '웨디', '소하'];

const meta: Meta<typeof Select<Option>> = {
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
    options: options,
    onSelect: (option: Option) => console.log(option),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Playground 스토리
export const Playground: Story = {};
