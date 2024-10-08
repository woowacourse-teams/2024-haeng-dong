import {useEffect} from 'react';
import {useAmplitudeStore} from '@store/amplitudeStore';

const AmplitudeInitializer = ({children}: React.PropsWithChildren) => {
  const {amplitude} = useAmplitudeStore();

  useEffect(() => {
    amplitude.init(process.env.AMPLITUDE_KEY, undefined, {
      defaultTracking: true,
    });
  }, []);

  return children;
};

export default AmplitudeInitializer;
