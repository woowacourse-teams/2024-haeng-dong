import {useEffect} from 'react';

const KakaoInitializer = ({children}: React.PropsWithChildren) => {
  useEffect(() => {
    if (!window.Kakao) return;

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.KAKAO_JAVASCRIPT_KEY);
      console.log('Kakao initialized');
    }
  }, []);

  return children;
};

export default KakaoInitializer;
