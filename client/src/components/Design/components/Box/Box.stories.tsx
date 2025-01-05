/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import Box from './Box';

const meta = {
  title: 'patterns/Box',
  component: Box,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Box 컴포넌트는 기본적인 레이아웃을 구성하는데 사용되는 컨테이너 컴포넌트입니다.<br/>
적은 빈도로 사용될 것으로 예상되며, 크기를 직접 지정할 수 있는 간단한 div가 사용되는 곳을 대체할 수 있는 컴포넌트입니다.<br/>

### 주요 기능
- **너비(w)와 높이(h) 조절 가능**: number(px) 또는 string(%, rem, em 등)
- **z-index(z) 조절 가능**: number
- **배경색(bg) 설정 가능**: string(색상코드, rgb, rgba 등)
- **패딩(p)과 마진(m) 조절 가능**: number(px) 또는 string(%, rem, em 등 / "상하 좌우" 형식 지원)
- **테두리(b)와 라운드(br) 스타일링 가능**: number(px) 또는 string(%, rem, em 등 / border는 CSS border 속성 형식 지원)
- **중앙 정렬 사용 가능**: boolean
- **고정 위치 사용 가능**: boolean
- 이 외의 요소들은 **css prop으로 추가 스타일링 가능**

### 사용 예시

#### 기본적인 사용
\`\`\`jsx
<Box w={200} h={200} bg="#fff">
  기본 박스
</Box>
\`\`\`

#### z-index 설정
\`\`\`jsx
<Box w={200} h={200} bg="#fff" z={10}>
  고정 위치 박스
</Box>
\`\`\`

#### 다양한 크기 단위 사용
\`\`\`jsx
<Box w="50%" h="10rem" bg="#fff">
  상대 단위 박스
</Box>
\`\`\`

#### 여백 설정
\`\`\`jsx
<Box p="8px 16px" m={16}  bg="#fff">
  여백이 있는 박스
</Box>
\`\`\`

#### 테두리와 라운드 설정
\`\`\`jsx
<Box br="25%" b="2px solid #ddd" bg="#fff">
  라운드 박스
</Box>
\`\`\`

#### 고정 위치 설정
\`\`\`jsx
<Box fixed>
  고정 위치 박스
</Box>
\`\`\`

#### 복합 스타일링
\`\`\`jsx
<Box 
  w="40%" 
  h="200px"
  bg="rgba(100, 150, 200, 0.5)"
  p="20px"
  m="1rem"
  br="15px"
  b="3px solid #4a90e2"
  css={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
  복합 스타일 박스
</Box>
\`\`\`
        `,
      },
    },
  },

  tags: ['autodocs'],
  argTypes: {
    w: {
      control: {
        type: 'range',
        min: 0,
        max: 640,
        step: 16,
      },
      description: '박스의 너비 (가능한 타입: number(px), string(%, rem, em, vh, vw 등), "auto")',
    },
    h: {
      control: {
        type: 'range',
        min: 0,
        max: 640,
        step: 16,
      },
      description: '박스의 높이 (가능한 타입: number(px), string(%, rem, em, vh, vw 등), "auto")',
    },
    z: {
      description: '박스의 z-index 값 (가능한 타입: number)',
      control: {
        type: 'range',
        min: 0,
        max: 10,
        step: 1,
      },
    },
    p: {
      description: '박스의 패딩 (가능한 타입: number(px), string("10px 20px" 형식, rem, em), "auto")',
      control: {
        type: 'range',
        min: 0,
        max: 40,
        step: 4,
      },
    },
    m: {
      description: '박스의 마진 (가능한 타입: number(px), string("10px 20px" 형식, rem, em), "auto")',
      control: {
        type: 'range',
        min: 0,
        max: 40,
        step: 4,
      },
    },
    br: {
      description: '박스의 라운드 값 (가능한 타입: number(px), string(%, rem, em), "50%"(원형))',
      control: {
        type: 'range',
        min: 0,
        max: 40,
        step: 4,
      },
    },
    b: {
      description: '박스의 테두리 (가능한 타입: string("1px solid black" 형식), "none")',
      control: {
        type: 'text',
      },
    },
    bg: {
      description: '박스의 배경색 (가능한 타입: string(hex, rgb, rgba, hsl, hsla, 색상명))',
      control: {
        type: 'color',
      },
    },
    fixed: {
      description: '박스를 고정 위치로 배치할지 여부',
      control: {
        type: 'boolean',
      },
    },
    center: {
      description: '박스를 중앙에 배치할지 여부',
      control: {
        type: 'boolean',
      },
    },
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof Box>;

// 기본 박스 컴포넌트
export const Default: Story = {
  render: args => (
    <Box {...args}>
      <Box w={80} h={80} bg="#f0f0f0" b="1px solid #ddd" br={8}>
        children
      </Box>
    </Box>
  ),
  args: {
    w: 240,
    h: 240,
    bg: '#fff',
    p: 16,
    m: 16,
    br: 16,
    b: '1px solid #f66',
    z: 1,
    center: false,
  },
};
