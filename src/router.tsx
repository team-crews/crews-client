import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import RootLayout from './app/layout.tsx';
import AuthRouteWrapper from './components/wrapper/auth-redirect-wrapper.tsx';
import LandingPage from './app/page.tsx';
import SignInPage from './app/sign-in/page.tsx';
import RecruitmentPage from './app/recruitment/[recruitment-code]/page.tsx';
import ApplyPage from './app/apply/[recruitment-code]/page.tsx';
import RecruitPage from './app/recruit/page.tsx';
import ErrorPage from './app/error/page.tsx';

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route element={<AuthRouteWrapper />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-in" element={<SignInPage />} />

        <Route
          path="recruitment/:recruitment-code"
          element={<RecruitmentPage />}
        />

        <Route path="apply/:recruitment-code" element={<ApplyPage />} />
        <Route path="recruit" element={<RecruitPage />} />

        <Route path="error" element={<ErrorPage />} />
      </Route>
    </Route>,
  ),
);

export default router;
