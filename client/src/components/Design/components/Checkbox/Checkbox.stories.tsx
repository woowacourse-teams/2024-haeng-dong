/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import {useState} from 'react';

import Text from '../Text/Text';
import Box from '../Box/Box';
import VStack from '../Stack/VStack';

import Checkbox from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Checkbox 컴포넌트는 사용자가 여러 옵션 중에서 하나 이상을 선택할 수 있게 해주는 컴포넌트입니다.

### 주요 기능
- **체크 상태 관리**: checked prop으로 체크 상태를 제어할 수 있습니다.
- **우측 컨텐츠**: right prop으로 체크박스 우측에 텍스트나 컴포넌트를 추가할 수 있습니다.
- **접근성**: 키보드 탐색 및 스크린리더 지원
- **비활성화**: disabled prop으로 체크박스를 비활성화할 수 있습니다.

### 사용 예시
\`\`\`jsx
// 기본 사용
<Checkbox checked={checked} onChange={handleChange} />

// 우측 텍스트 추가
<Checkbox 
  checked={checked} 
  onChange={handleChange}
  right={<Text size="bodyBold">체크박스 라벨</Text>} 
/>

// 비활성화 상태
<Checkbox 
  checked={checked}
  onChange={handleChange}
  disabled={true}
/>
\`\`\`
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      description: '체크박스의 체크 상태를 제어합니다.',
      control: 'boolean',
      defaultValue: false,
    },
    right: {
      description: '체크박스 우측에 표시될 element입니다.',
    },
    disabled: {
      description: '체크박스의 비활성화 상태를 제어합니다.',
      control: 'boolean',
      defaultValue: false,
    },
    onChange: {
      description: '체크박스 상태가 변경될 때 호출되는 콜백 함수입니다.',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledCheckbox = ({
  label,
  disabled,
  defaultChecked,
}: {
  label: string;
  disabled?: boolean;
  defaultChecked?: boolean;
}) => {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <Checkbox
      checked={checked}
      onChange={e => setChecked(e.target.checked)}
      right={<Text size="bodyBold">{label}</Text>}
      disabled={disabled}
    />
  );
};

export const Default: Story = {
  render: args => <ControlledCheckbox label="기본 체크박스" />,
};

export const DisabledStates: Story = {
  render: args => <ControlledCheckbox label="비활성화된 체크박스" disabled defaultChecked={true} />,
};
