import { baseInstance } from './instance.ts';
import {
  ILoginResponse,
  isILoginResponse,
} from '../lib/model/i-response-body.ts';

async function adminLogin(requestBody: {
  clubName: string;
  password: string;
}): Promise<ILoginResponse> {
  const response = await baseInstance.post('/auth/admin/login', requestBody, {
    withCredentials: true,
  });

  if (isILoginResponse(response.data)) return response.data;
  throw new Error('[ResponseTypeMismatch] Unexpected response format');
}

async function applicantLogin(requestBody: {
  email: string;
  password: string;
}): Promise<ILoginResponse> {
  const response = await baseInstance.post(
    '/auth/applicant/login',
    requestBody,
    {
      withCredentials: true,
    },
  );

  if (isILoginResponse(response.data)) return response.data;
  throw new Error('[ResponseTypeMismatch] Unexpected response format');
}

export { adminLogin, applicantLogin };
