/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import {CSSProperties} from 'react';

import Box from '../Box/Box';

import Stack from './Stack';

const meta = {
  title: 'patterns/Stack',
  component: Stack,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Stack 컴포넌트는 자식 요소들을 **수직** 또는 **수평**으로 배치하는 레이아웃 컴포넌트입니다.</br>
**넓은 화면을 채우는 곳에서 layout을 잡는** 용도로 사용합니다.</br>
width와 height, justify와 align을 수정할 수 있습니다.

### 주요 기능
- **간격(gap) 조절**: 자식 요소들 사이의 간격을 설정할 수 있습니다.
- **방향(direction) 설정**: row(수평) 또는 column(수직) 방향으로 배치할 수 있습니다.
- **정렬(justify, align) 설정**: 주축과 교차축 방향으로 정렬을 설정할 수 있습니다.
- **구분선(divider) 추가**: 자식 요소들 사이에 구분선을 추가할 수 있습니다.

### 사용 예시
\`\`\`jsx
// 기본 사용
<Stack w="100%" h={640} gap={16} direction="column">
  <div>첫 번째 아이템</div>
  <div>두 번째 아이템</div>
</Stack>

// 정렬 설정 
<Stack gap={8} direction="row" justify="space-between" align="center">
  <div>왼쪽</div>
  <div>오른쪽</div>
</Stack>

// 구분선 추가
<Stack gap={16} divider={<Divider />}>
  <div>아이템 1</div>
  <div>아이템 2</div>
</Stack>

// 패딩과 마진 설정
<Stack p="8 16" m={16}>
  <div>패딩 세로 가로 8px 16px</div>
  <div>마진 세로 가로 16px</div>
</Stack>

// 테두리와 배경색 설정
<Stack gap={8} b="2px solid #ddd" bg="#f5f5f5" br={8}>
  <div>테두리와 배경색이 있는 스택</div>
  <div>둥근 모서리 적용</div>
</Stack>

// 복합 스타일 적용
<Stack 
  gap={16} 
  direction="row" 
  justify="center" 
  align="center"
  p="24px"
  b="1px solid #007AFF"
  bg="#E5F1FF"
  br={12}
>
  <div>모든 스타일 속성 적용</div>
  <div>정렬, 간격, 스타일</div>
</Stack>
\`\`\`
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    w: {
      description: '스택의 너비 (가능한 타입: number(px), string("100%" 형식, rem, em), "auto")',
      control: {
        type: 'range',
        min: 0,
        max: 640,
        step: 16,
      },
    },
    h: {
      description: '스택의 높이 (가능한 타입: number(px), string("100%" 형식, rem, em), "auto")',
      control: {
        type: 'range',
        min: 0,
        max: 640,
        step: 16,
      },
    },
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
    direction: {
      control: 'select',
      options: ['row', 'column'],
      description: '자식 요소들의 배치 방향',
      defaultValue: 'column',
    },
    justify: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'],
      description: '주축 방향 정렬 방식',
      defaultValue: 'center',
    },
    align: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'],
      description: '교차축 방향 정렬 방식',
      defaultValue: 'center',
    },
    divider: {
      description: '자식 요소들 사이의 구분선 표시 여부',
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof Stack>;

const Divider = ({direction}: {direction: CSSProperties['flexDirection']}) => (
  <Box w={direction === 'row' ? 1 : '100%'} h={direction === 'row' ? '100%' : 1} bg="#ddd" />
);

const DemoBox = ({children}: {children: React.ReactNode}) => (
  <Box w="100%" h={64} bg="#f0f0f0" b="1px solid #ddd" br={8}>
    {children}
  </Box>
);

export const Default: Story = {
  render: args => (
    <Box w={640} h={640} bg="#ffffff" p={16} b="1px solid #eee" br={8}>
      <Stack {...args} divider={<Divider direction={args.direction} />}>
        <DemoBox>Box 1</DemoBox>
        <DemoBox>Box 2</DemoBox>
        <DemoBox>Box 3</DemoBox>
      </Stack>
    </Box>
  ),
  args: {
    p: 16,
    m: 0,
    br: 16,
    b: '1px solid #f66',
    bg: '#fff',
    gap: 16,
    direction: 'column',
    justify: 'center',
    align: 'center',
  },
};
