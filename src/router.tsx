import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import RequireAuth from './components/wrapper/require-auth.tsx';
import RootLayout from './app/layout.tsx';
import HomePage from './app/page.tsx';
import RecruitmentPage from './app/recruitment/[recruitmentId]/page.tsx';
import RecruitPage from './app/recruit/[recruitment-id]/page.tsx';
import ApplyPage from './app/apply/[recruitment-id]/page.tsx';

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="recruitment/:recruitment-id" element={<RecruitmentPage />} />

      <Route element={<RequireAuth availableRoles={['recruiter']} />}>
        <Route path="recruit/:recruitment-id" element={<RecruitPage />} />
      </Route>

      <Route element={<RequireAuth availableRoles={['applicant']} />}>
        <Route path="apply/:recruitment-id" element={<ApplyPage />} />
      </Route>
    </Route>
  )
);

export default router;
