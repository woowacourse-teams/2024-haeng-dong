import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import * as Sentry from '@sentry/react';

import router from './router';

// Sentry.init({
//   dsn: 'https://81685591a3234c689be8c48959b04c88@o4507739935997952.ingest.us.sentry.io/4507739943272448',
//   integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
//   // Performance Monitoring
//   tracesSampleRate: 1.0, //  Capture 100% of the transactions
//   // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
//   tracePropagationTargets: ['localhost', /^https:\/\/api\.haengdong\.pro/],
//   // Session Replay
//   replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
//   replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
// });

// MSW 모킹을 사용하려면 아래 주석을 해제하고 save해주세요.
async function enableMocking() {
  const {worker} = await import('./mocks/browser');
  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
});
