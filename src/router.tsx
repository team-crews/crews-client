import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import RootLayout from './app/layout.tsx';
import AuthRouteWrapper from './components/wrapper/auth-redirect-wrapper.tsx';
import LandingPage from './app/page.tsx';
import SignInPage from './app/sign-in/page.tsx';
import RecruitmentPage from './app/recruitment/[recruitmentCode]/page.tsx';
import ApplyPage from './app/apply/[recruitmentCode]/page.tsx';
import RecruitPage from './app/recruit/page.tsx';
import ErrorPage from './app/error/page.tsx';
import ResponsiveWrapper from './components/wrapper/responsive-wrapper.tsx';
import * as Sentry from '@sentry/react';

import RootErrorBoundary from './components/root-error-boundary.tsx';

const sentryCreateBrowserRouter =
  Sentry.wrapCreateBrowserRouter(createBrowserRouter);

const router: ReturnType<typeof createBrowserRouter> =
  sentryCreateBrowserRouter(
    createRoutesFromElements(
      <Route
        element={<ResponsiveWrapper />}
        errorElement={<RootErrorBoundary />}
      >
        <Route element={<RootLayout />}>
          <Route element={<AuthRouteWrapper />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/sign-in" element={<SignInPage />} />

            <Route
              path="recruitment/:recruitmentCode"
              element={<RecruitmentPage />}
            />

            <Route path="apply/:recruitmentCode" element={<ApplyPage />} />
            <Route path="recruit" element={<RecruitPage />} />
            <Route path="error" element={<ErrorPage />} />
          </Route>
        </Route>
      </Route>,
    ),
  );

export default router;
