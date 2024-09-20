import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/font.css';

import {
  createRoutesFromChildren,
  matchRoutes,
  RouterProvider,
  useLocation,
  useNavigationType,
} from 'react-router-dom';
import router from './router.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import * as Sentry from '@sentry/react';
import { useEffect } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
    Sentry.replayIntegration(),
  ],

  tracesSampleRate: 0.6, // default 는 1이나 너무 민감하므로 실제는 0.6 정도로 낮춥니다.

  tracePropagationTargets: ['localhost', /^https:\/\/join-crews\.site/],

  replaysSessionSampleRate: 0.1, // 리플레이를 샘플링할 비율을 설정합니다. 0.1은 100% 중 10% 정도 기록합니다.
  replaysOnErrorSampleRate: 1.0, // 오류가 발생했을 때 세션 리플레이를 기록할 확률을 설정합니다.
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>,
  // </React.StrictMode>
);
