import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/font.css';

import { RouterProvider } from 'react-router-dom';
import router from './router.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>,
  /*</React.StrictMode>,*/
);
