import {css} from '@emotion/react';
// co-authored-by test

// 테스트 css props 사용 예제입니다. 추후 삭제 예정
const style = css`
  color: red;
`;

const App: React.FC = () => {
  return <div css={style}>Hello, React with Webpack</div>;
};

export default App;
