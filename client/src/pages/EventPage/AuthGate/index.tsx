import {useEffect} from 'react';

import useRequestPostAuthentication from '@hooks/queries/auth/useRequestPostAuthentication';

import {useAuthStore} from '@store/authStore';

type AuthGateProps = React.PropsWithChildren & {
  fallback: React.ReactNode;
};

const AuthGate = ({children, fallback}: AuthGateProps) => {
  const {isError, postAuthenticate} = useRequestPostAuthentication();
  const {isAdmin} = useAuthStore();

  useEffect(() => {
    postAuthenticate();
  }, [postAuthenticate]);

  if (isError && !isAdmin) {
    return fallback;
  }

  return children;
};

export default AuthGate;
