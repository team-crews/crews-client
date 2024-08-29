import { baseInstance } from './instance.ts';

async function adminLogin(requestBody: {
  clubName: string;
  password: string;
}): Promise<{ accessToken: string }> {
  const response = await baseInstance.post('/auth/admin/login', requestBody, {
    withCredentials: true,
  });
  return response.data;
}

async function applicantLogin(requestBody: {
  email: string;
  password: string;
}): Promise<{ accessToken: string }> {
  const response = await baseInstance.post(
    '/auth/applicant/login',
    requestBody,
    {
      withCredentials: true,
    },
  );
  return response.data;
}

export { adminLogin, applicantLogin };
