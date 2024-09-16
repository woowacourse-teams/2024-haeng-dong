import {MutationCache, QueryCache, QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {RequestGetError} from '@errors/RequestGetError';

import {useAppErrorStore} from '@store/appErrorStore';

const QueryClientBoundary = ({children}: React.PropsWithChildren) => {
  const {updateAppError} = useAppErrorStore();

  const queryClient = new QueryClient({
    // errorBoundary를 사용하기 위해 true로 해줘야함.
    defaultOptions: {
      queries: {
        throwOnError: true,
      },
    },
    queryCache: new QueryCache({
      onError: (error: Error) => {
        // errorBoundary로 처리해야하는 에러인 경우 updateAppError를 하지 못하도록 얼리리턴
        if (error instanceof RequestGetError && error.errorHandlingStrategy === 'errorBoundary') return;

        updateAppError(error);
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