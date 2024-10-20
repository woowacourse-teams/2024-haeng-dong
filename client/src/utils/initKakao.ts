const kakaoScript = {
  url: 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js',
  integrity: 'sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4',
  crossOrigin: 'anonymous',
  loaded: false,
};

const loadKakaoScript = () => {
  return new Promise((resolve, reject) => {
    if (kakaoScript.loaded) {
      resolve(null);
      return;
    }

    const script = document.createElement('script');
    script.src = kakaoScript.url;
    script.integrity = kakaoScript.integrity;
    script.crossOrigin = kakaoScript.crossOrigin;
    script.async = true;

    script.onload = () => {
      kakaoScript.loaded = true;
      resolve(null);
    };

    script.onerror = error => {
      reject(error);
    };

    document.head.appendChild(script);
  });
};

const initKakao = async () => {
  try {
    await loadKakaoScript();

    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.KAKAO_JAVASCRIPT_KEY);
    }
  } catch (error) {
    console.error('Kakao SDK 로드 중 오류 발생:', error);
  }
};

export default initKakao;
