
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { loginSliceValue } from '../redux/reducers/loginsSlice';
import axios, { AxiosError } from 'axios';

interface Props {
  url: string | "";
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headerContentType?: 'application/json' | 'multipart/form-data';
}

const useApi = ({ url, method = 'GET', headerContentType = 'application/json' }: Props) => {
  const { userDetails } = useSelector(loginSliceValue);
  const [loading, setLoading] = useState(false);

  const makeApiCall = useCallback(
    async <T, R>(
      input?: T,
      overrideUrl?: string
    ): Promise<{
      response: R | undefined;
      loading: boolean;
      error: { message: string; success: boolean } | undefined;
    }> => {
      setLoading(true);
      try {
        const headers: any = {
          'Content-Type': headerContentType,
        };

        if (userDetails?.data?.token) {
          headers.Authorization = 'Bearer ' + userDetails.data.token;
        }

        const config = {
          url: `${process.env.REACT_APP_BASE_URL + (overrideUrl || url)}`,
          method,
          data: input,
          headers,
        };

        const response = await axios(config);
        return { response: response.data, loading, error: undefined };
      } catch (err) {
        const error = err as AxiosError;

        // Handle Unauthorized (Token expired)
        if (error.response?.status === 401) {
          // Throwing special error for ErrorBoundary
          throw Object.assign(new Error('Unauthorized Access'), { errorType: 'unauthorized' });
        }

        // Handle Maintenance
        if (error.response?.status === 503) {
          throw Object.assign(new Error('Maintenance Mode'), { errorType: 'maintenance' });
        }

        return {
          response: undefined,
          loading,
          error: (error.response?.data as any) || { message: 'Unknown error', success: false },
        };
      } finally {
        setLoading(false);
      }
    },
    [userDetails, method, url, headerContentType]
  );

  return { loading, makeApiCall };
};

export default useApi;

