import {useEffect} from 'react';

import useRequestPostAuthentication from '@hooks/queries/auth/useRequestPostAuthentication';

const AuthGate = ({children}: React.PropsWithChildren) => {
  const {postAuthenticate} = useRequestPostAuthentication();

  useEffect(() => {
    postAuthenticate();
  }, [postAuthenticate]);

  return children;
};

export default AuthGate;
