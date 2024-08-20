import {MutationCache, QueryCache, QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {useAppErrorStore} from '@store/appErrorStore';

const QueryClientBoundary = ({children}: React.PropsWithChildren) => {
  const {updateAppError} = useAppErrorStore();
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error: Error) => {
        updateAppError(error);
        throw error;
      },
    }),
    mutationCache: new MutationCache({
      onError: (error: Error) => {
        updateAppError(error);
      },
    }),
  });
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryClientBoundary;
