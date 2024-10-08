import {useAmplitudeStore} from '@store/amplitudeStore';

const useAmplitude = () => {
  const {amplitude} = useAmplitudeStore();
  const domainEnv = process.env.NODE_ENV;

  const track = (eventName: string, eventProps: Record<string, any> = {}) => {
    amplitude.track(eventName, {
      domain: domainEnv,
      ...eventProps,
    });
  };

  return {track};
};

export default useAmplitude;
