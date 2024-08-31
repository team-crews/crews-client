import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import RootLayout from './app/layout.tsx';
import HomePage from './app/page.tsx';
import RecruitmentPage from './app/recruitment/[recruitment-code]/page.tsx';
import ApplyPage from './app/apply/[recruitment-code]/page.tsx';
import RecruitPage from './app/recruit/page.tsx';
import AuthRouteWrapper from './components/wrapper/auth-redirect-wrapper.tsx';

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route element={<AuthRouteWrapper />}>
        <Route path="/" element={<HomePage />} />

        <Route
          path="recruitment/:recruitment-code"
          element={<RecruitmentPage />}
        />

        <Route path="apply/:recruitment-code" element={<ApplyPage />} />
        <Route path="recruit" element={<RecruitPage />} />
      </Route>
    </Route>,
  ),
);

export default router;
