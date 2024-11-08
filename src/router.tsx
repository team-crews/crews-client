import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import RootLayout from './app/layout.tsx';
import LandingPage from './app/page.tsx';
import SignInPage from './app/sign-in/page.tsx';
import SignUpPage from './app/sign-up/page.tsx';
import RecruitmentPage from './app/recruitment/[recruitmentCode]/page.tsx';
import RecruitmentInfoPage from './app/recruitment/info/page.tsx';

import MobileRestrictionWrapper from './components/wrapper/mobile-restriction-wrapper.tsx';
import * as Sentry from '@sentry/react';

import RootErrorBoundary from './components/root-error-boundary.tsx';
import ApplyPage from './app/apply/[recruitmentCode]/page-wrapper.tsx';
import RecruitPage from './app/recruit/page.tsx';
import AuthRedirectWrapper from './components/wrapper/auth-redirect-wrapper.tsx';
import TryLoginWrapper from './components/wrapper/try-login-wrapper.tsx';

const sentryCreateBrowserRouter =
  Sentry.wrapCreateBrowserRouter(createBrowserRouter);

const router: ReturnType<typeof createBrowserRouter> =
  sentryCreateBrowserRouter(
    createRoutesFromElements(
      <Route element={<TryLoginWrapper />} errorElement={<RootErrorBoundary />}>
        <Route element={<RootLayout />}>
          <Route element={<MobileRestrictionWrapper />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />

            <Route path="recruitment/info" element={<RecruitmentInfoPage />} />

            <Route path="recruitment" element={<RecruitmentPage />} />

            <Route
              element={<AuthRedirectWrapper availableRoles={['APPLICANT']} />}
            >
              <Route path="apply/:recruitmentCode" element={<ApplyPage />} />
            </Route>

            <Route element={<AuthRedirectWrapper availableRoles={['ADMIN']} />}>
              <Route path="recruit" element={<RecruitPage />} />
            </Route>
          </Route>
        </Route>
      </Route>,
    ),
  );

export default router;
