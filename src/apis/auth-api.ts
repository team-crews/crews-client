import useAuthInstance, { baseInstance } from './instance.ts';
import { z } from 'zod';
import {
  LoginResponseSchema,
  LogoutResponseSchema,
} from './i-response-body/response-body-schema.ts';

async function adminLogin(requestBody: {
  clubName: string;
  password: string;
}): Promise<z.infer<typeof LoginResponseSchema>> {
  const response = await baseInstance.post('/auth/admin/login', requestBody, {
    withCredentials: true,
  });
  return LoginResponseSchema.parse(response.data);
}

async function applicantLogin(requestBody: {
  email: string;
  password: string;
}): Promise<z.infer<typeof LoginResponseSchema>> {
  const response = await baseInstance.post(
    '/auth/applicant/login',
    requestBody,
    {
      withCredentials: true,
    },
  );
  return LoginResponseSchema.parse(response.data);
}

const useLogout = () => {
  const { authInstance } = useAuthInstance();

  async function logout(): Promise<z.infer<typeof LogoutResponseSchema>> {
    const response = await authInstance.post('/auth/logout');
    return LogoutResponseSchema.parse(response.data);
  }

  return { logout };
};

export { adminLogin, applicantLogin, useLogout };
