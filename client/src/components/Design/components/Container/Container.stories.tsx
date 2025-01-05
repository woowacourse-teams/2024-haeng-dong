/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import Box from '../Box/Box';
import Stack from '../Stack/Stack';
import HStack from '../Stack/HStack';

import Container from './Container';

const meta = {
  title: 'patterns/Container',
  component: Container,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Container 컴포넌트는 콘텐츠를 좌우로 감싸는 래퍼(wrapper) 컴포넌트입니다.</br>
최대 너비를 지정하고 내부 콘텐츠를 중앙 정렬할 수 있는 기능을 제공합니다.<br>
주로 **최대 넓이가 필요한 곳에서 layout을 잡는** 용도로 사용합니다.<br>
기본적으로 width는 100%이고 height는 auto인 것 처럼 작동합니다.<br>

### 주요 기능
- **최대 너비(maxW) 설정**: number(px) 또는 string(%, rem, em 등)
- **배경색(bg) 설정**: string(색상코드, rgb, rgba 등)
- **패딩(p)과 마진(m) 조절**: number(px) 또는 string(%, rem, em 등)
- **테두리(b)와 라운드(br) 스타일링 가능**: number(px) 또는 string(%, rem, em 등 / border는 CSS border 속성 형식 지원)
- **중앙 정렬(center) 설정**: boolean
- 이 외의 요소들은 **css prop으로 추가 스타일링 가능**

### 사용 예시

#### 기본적인 사용
\`\`\`jsx
<Container maxW={1200} bg="#fff">
  기본 컨테이너
</Container>
\`\`\`

#### 중앙 정렬
\`\`\`jsx
<Container maxW="80%" center>
  중앙 정렬된 컨테이너
</Container>
\`\`\`

#### 여백 설정
\`\`\`jsx
<Container p={24} m="0 auto" bg="#fff">
  여백이 있는 컨테이너
</Container>
\`\`\`

#### 테두리와 라운드 설정
\`\`\`jsx
<Container maxW={800} b="2px solid #ddd" br={8}>
  테두리와 라운드가 있는 컨테이너
</Container>
\`\`\`

#### 복합 스타일링
\`\`\`jsx
<Container 
  maxW={600}
  p={32}
  b="1px solid #eee"
  br={16}
  center
  bg="#fafafa"
>
  모든 속성을 활용한 컨테이너
</Container>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    maxW: {
      control: {
        type: 'range',
        min: 0,
        max: 640,
        step: 16,
      },
      description: '컨테이너의 최대 너비 (가능한 타입: number(px), string(%, rem, em 등))',
    },
    p: {
      control: {
        type: 'range',
        min: 0,
        max: 40,
        step: 4,
      },
      description: '컨테이너의 패딩 (가능한 타입: number(px), string("10px 20px" 형식, rem, em))',
    },
    m: {
      control: {
        type: 'range',
        min: 0,
        max: 40,
        step: 4,
      },
      description: '컨테이너의 마진 (가능한 타입: number(px), string("10px 20px" 형식, rem, em))',
    },
    br: {
      control: {
        type: 'range',
        min: 0,
        max: 40,
        step: 4,
      },
      description: '컨테이너의 라운드 값 (가능한 타입: number(px), string(%, rem, em), "50%"(원형))',
    },
    b: {
      control: {
        type: 'text',
      },
      description: '컨테이너의 테두리 (가능한 타입: string("1px solid black" 형식), "none")',
    },
    bg: {
      control: {
        type: 'color',
      },
      description: '컨테이너의 배경색 (가능한 타입: string(hex, rgb, rgba, hsl, hsla, 색상명))',
    },
    center: {
      control: 'boolean',
      description: '내부 콘텐츠 중앙 정렬 여부',
    },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {
  render: args => (
    <Container {...args}>
      <HStack justify="space-between">
        <Box w={320} h={100} b="1px solid #ddd">
          width: 320px
        </Box>
        <Box w={320} h={100} b="1px solid #ddd">
          width: 320px
        </Box>
        <Box w={320} h={100} b="1px solid #ddd">
          width: 320px
        </Box>
      </HStack>
    </Container>
  ),
  args: {
    maxW: 640,
    bg: '#fff',
    b: '1px solid #f66',
    br: 16,
    p: 16,
    m: 0,
    center: false,
  },
};
