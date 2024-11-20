const getKakaoRedirectUrl = () => {
  return window.location.origin + process.env.KAKAO_REDIRECT_URI;
};

export default getKakaoRedirectUrl;
