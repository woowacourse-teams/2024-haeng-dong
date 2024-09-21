declare global {
  interface Window {
    Kakao: typeof Kakao;
  }
}

namespace Kakao {
  function init(appKey: string): void;
  function isInitialized(): boolean;

  namespace Share {
    function cleanup(): void;
    function sendDefault(params: sendDefaultParams): void;

    interface sendDefaultParams {
      objectType: 'feed';
      content: {
        title: string;
        imageUrl: string;
        imageWidth?: number;
        imageHeight?: number;
        description: string;
        link: {
          mobileWebUrl: string;
          webUrl: string;
        };
      };
      buttonTitle?: string;
      buttons?: {
        title: string;
        link: {
          webUrl: string;
          mobileWebUrl: string;
        };
      }[];
    }
  }
}
