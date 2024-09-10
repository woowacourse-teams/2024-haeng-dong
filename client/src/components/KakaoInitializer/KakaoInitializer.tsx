import {useEffect} from 'react';

const KakaoInitializer = ({children}: React.PropsWithChildren) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'test') return;

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.KAKAO_JAVASCRIPT_KEY);
    }
  }, []);

  return children;
};

export default KakaoInitializer;
