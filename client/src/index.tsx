import React from 'react';
import ReactDOM from 'react-dom/client';

import router from './router';
import {RouterProvider} from 'react-router-dom';

async function enableMocking() {
  const {worker} = await import('./mocks/browser'); //Dynamic import하는 것이 눈에 띄였다.
  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
});
