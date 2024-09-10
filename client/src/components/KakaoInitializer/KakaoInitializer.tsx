import {useEffect} from 'react';

const KakaoInitializer = ({children}: React.PropsWithChildren) => {
  useEffect(() => {
    if (!window.Kakao.isInitialized() && process.env.NODE_ENV !== 'test') {
      window.Kakao.init(process.env.KAKAO_JAVASCRIPT_KEY);
    }
  }, []);

  return children;
};

export default KakaoInitializer;
