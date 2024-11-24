import useAuthInstance, { baseInstance } from './instance.ts';
import { z } from 'zod';
import {
  LoginResponseSchema,
  LogoutResponseSchema,
} from './response-body-schema.ts';

/*
  ReadMe
  - adminSignUp is only allowed in dev mode for convenience
  - usage of this function should be strictly managed
 */

async function adminSignUp(requestBody: {
  clubName: string;
  password: string;
}): Promise<z.infer<typeof LoginResponseSchema>> {
  // if (!import.meta.env.DEV)
  //   throw new Error('adminSignUp should never be called');

  const response = await baseInstance.post('/auth/admin/register', requestBody);
  return LoginResponseSchema.parse(response.data);
}

async function adminSignIn(requestBody: {
  clubName: string;
  password: string;
}): Promise<z.infer<typeof LoginResponseSchema>> {
  const response = await baseInstance.post('/auth/admin/login', requestBody);
  return LoginResponseSchema.parse(response.data);
}

async function applicantSignUp(requestBody: {
  email: string;
  password: string;
}): Promise<z.infer<typeof LoginResponseSchema>> {
  const response = await baseInstance.post(
    '/auth/applicant/register',
    requestBody,
  );
  return LoginResponseSchema.parse(response.data);
}

async function applicantSignIn(requestBody: {
  email: string;
  password: string;
}): Promise<z.infer<typeof LoginResponseSchema>> {
  const response = await baseInstance.post(
    '/auth/applicant/login',
    requestBody,
  );
  return LoginResponseSchema.parse(response.data);
}

const useSignOut = () => {
  const { authInstance } = useAuthInstance();

  async function signOut(): Promise<z.infer<typeof LogoutResponseSchema>> {
    const response = await authInstance.post('/auth/logout');
    return LogoutResponseSchema.parse(response.data);
  }

  return { signOut };
};

export {
  adminSignUp,
  adminSignIn,
  applicantSignUp,
  applicantSignIn,
  useSignOut,
};
