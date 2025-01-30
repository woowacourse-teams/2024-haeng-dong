import {useEffect} from 'react';
import {init} from '@amplitude/analytics-browser';

const AmplitudeInitializer = ({children}: React.PropsWithChildren) => {
  useEffect(() => {
    init(process.env.AMPLITUDE_KEY, undefined, {
      defaultTracking: true,
    });
  }, []);

  return children;
};

export default AmplitudeInitializer;
