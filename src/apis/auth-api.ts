import { baseInstance } from './instance.ts';
import {
  ILoginResponse,
  isILoginResponse,
} from '../lib/model/i-response-body.ts';
import { throwCustomError } from '../lib/utils/error.ts';

async function adminLogin(requestBody: {
  clubName: string;
  password: string;
}): Promise<ILoginResponse> {
  try {
    const response = await baseInstance.post('/auth/admin/login', requestBody, {
      withCredentials: true,
    });

    if (isILoginResponse(response.data)) return response.data;
    throw new Error('[ResponseTypeMismatch] Unexpected response format');
  } catch (e) {
    throwCustomError(e, 'adminLogin');
  }
}

async function applicantLogin(requestBody: {
  email: string;
  password: string;
}): Promise<ILoginResponse> {
  try {
    const response = await baseInstance.post(
      '/auth/applicant/login',
      requestBody,
      {
        withCredentials: true,
      },
    );

    if (isILoginResponse(response.data)) return response.data;
    throw new Error('[ResponseTypeMismatch] Unexpected response format');
  } catch (e) {
    throwCustomError(e, 'applicantLogin');
  }
}

export { adminLogin, applicantLogin };
