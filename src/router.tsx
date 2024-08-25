import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import RequireAuth from './components/wrapper/require-auth.tsx';
import RootLayout from './app/layout.tsx';
import HomePage from './app/page.tsx';
import RecruitmentPage from './app/recruitment/[recruitmentId]/page.tsx';
import ApplyPage from './app/apply/[recruitment-id]/page.tsx';
import ApplicationPage from './app/application/[application-id]/page.tsx';

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="recruitment/:recruitment-id" element={<RecruitmentPage />} />

      <Route element={<RequireAuth availableRoles={['applicant']} />}>
        <Route path="apply/:recruitment-id" element={<ApplyPage />} />
      </Route>

      {/*
          FixMe
          - availableRoles : applicant -> recruiter
          - url 및 페이지 명 고민하기
        */}
      <Route element={<RequireAuth availableRoles={['applicant']} />}>
        <Route
          path="application/:application-id"
          element={<ApplicationPage />}
        />
      </Route>
    </Route>,
  ),
);

export default router;
