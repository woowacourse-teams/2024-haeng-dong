/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import Box from '../Box/Box';

import HStack from './HStack';

const meta = {
  title: 'patterns/HStack',
  component: HStack,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
HStack 컴포넌트는 자식 요소들을 **수평**으로 배치하는 레이아웃 컴포넌트입니다.<br/>
기본적으로 width 100%이고 height는 auto인 것 처럼 작동합니다.
align은 center로 고정되어 있으며, justify를 수정할 수 있습니다.
width, height, justify를 수정하려면 Stack 컴포넌트를 사용해야 합니다.

### 주요 기능
- **간격(gap) 조절**: 자식 요소들 사이의 간격을 설정할 수 있습니다.
- **정렬(justify, align) 설정**: 주축과 교차축 방향으로 정렬을 설정할 수 있습니다.
- **구분선(divider) 추가**: 자식 요소들 사이에 구분선을 추가할 수 있습니다.

### 사용 예시
\`\`\`jsx
// 기본 사용
<HStack gap={16}>
  <div>첫 번째 아이템</div>
  <div>두 번째 아이템</div>
</HStack>

// 정렬 설정
<HStack gap={8} justify="space-between">
  <div>왼쪽</div>
  <div>오른쪽</div>
</HStack>

// 패딩과 마진 설정
<HStack p="8 16" m={16}>
  <div>패딩 세로 가로 8px 16px</div>
  <div>마진 세로 가로 16px</div>
</HStack>
\`\`\`
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    p: {
      description: '스택의 패딩 (가능한 타입: number(px), string("10px 20px" 형식, rem, em), "auto")',
      control: {
        type: 'range',
        min: 0,
        max: 40,
        step: 4,
      },
    },
    m: {
      description: '스택의 마진 (가능한 타입: number(px), string("10px 20px" 형식, rem, em), "auto")',
      control: {
        type: 'range',
        min: 0,
        max: 40,
        step: 4,
      },
    },
    br: {
      description: '스택의 라운드 값 (가능한 타입: number(px), string(%, rem, em), "50%"(원형))',
      control: {
        type: 'range',
        min: 0,
        max: 40,
        step: 4,
      },
    },
    b: {
      description: '스택의 테두리 (가능한 타입: string("1px solid black" 형식), "none")',
      control: {
        type: 'text',
      },
    },
    bg: {
      description: '스택의 배경색 (가능한 타입: string(hex, rgb, rgba, hsl, hsla, 색상명))',
      control: {
        type: 'color',
      },
    },
    gap: {
      control: {
        type: 'range',
        min: 0,
        max: 40,
        step: 4,
      },
      description: '자식 요소들 사이의 간격 (px 단위)',
    },
    justify: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'],
      description: '주축 방향 정렬 방식',
      defaultValue: 'center',
    },

    divider: {
      description: '자식 요소들 사이의 구분선 표시 여부',
    },
  },
} satisfies Meta<typeof HStack>;

export default meta;
type Story = StoryObj<typeof HStack>;

const Divider = () => <Box w={1} h="100%" bg="#ddd" css={{flexShrink: 0}} />;

const DemoBox = ({children}: {children: React.ReactNode}) => (
  <Box w={64} h={64} bg="#f0f0f0" b="1px solid #ddd" br={8}>
    {children}
  </Box>
);

export const Default: Story = {
  render: args => (
    <Box w={640} h={240} bg="#ffffff" p={16} b="1px solid #eee" br={8}>
      <HStack {...args}>
        <DemoBox>Box 1</DemoBox>
        <DemoBox>Box 2</DemoBox>
        <DemoBox>Box 3</DemoBox>
      </HStack>
    </Box>
  ),
  args: {
    p: 16,
    m: 0,
    br: 16,
    b: '1px solid #f66',
    bg: '#fff',
    gap: 16,
    justify: 'flex-start',
  },
};

export const WithDivider: Story = {
  render: args => (
    <Box w={640} h={240} bg="#ffffff" p={16} b="1px solid #eee" br={8}>
      <HStack {...args} divider={<Divider />}>
        <DemoBox>Box 1</DemoBox>
        <DemoBox>Box 2</DemoBox>
        <DemoBox>Box 3</DemoBox>
      </HStack>
    </Box>
  ),
  args: {
    p: 16,
    m: 0,
    br: 16,
    b: '1px solid #f66',
    bg: '#fff',
    gap: 16,
    justify: 'flex-start',
  },
};
