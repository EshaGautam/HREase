import axios from 'axios';
import * as actions from '../actions/beforeAuth';
import { toast } from 'react-toastify';

const api =
  ({ dispatch }: any) =>
  (next: any) =>
  async (action: any) => {
    if (action.type !== actions.authApiCallBegan.type) {
      return next(action);
    }

    const { url, method, data, onAuthStart, onAuthSuccess, onAuthFailed, onAuthReset } = action.payload;

    if (onAuthStart) {
      dispatch({ type: onAuthStart });
    }

    next(action);

    try {
      if (onAuthReset) {
        return dispatch({ type: onAuthReset, payload: null });
      }

      const config = {
        url: `${process.env.REACT_APP_BASE_URL + url}`,
        method,
        data,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await axios(config);

      if (response?.status) {
        dispatch(actions.authApiCallSuccess(response.data));

        if (onAuthSuccess) {
          dispatch({ type: onAuthSuccess, payload: response.data });

          if (url.includes("/auth/login")) {
            toast.success(response.data.message || "Login successful");
          }
          if (url.includes("/auth/signup")) {
            toast.success(response.data.message || "Signup successful");
          }
        }
      } else {
        dispatch(actions.authApiCallFailed(response?.data));

        if (onAuthFailed) {
          dispatch({ type: onAuthFailed, payload: response?.data });

          if (url.includes("/auth/login") || url.includes("/auth/signup")) {
            toast.error(response?.data?.message || "Request failed");
          }
        }
      }
    } catch (error: any) {
      const errorMsg =
        error.response && error.response.data
          ? error.response.data
          : { message: "Something went wrong" };

      dispatch(actions.authApiCallFailed(errorMsg));

      if (onAuthFailed) {
        dispatch({ type: onAuthFailed, payload: errorMsg });

        if (url.includes("/auth/login") || url.includes("/auth/signup")) {
          toast.error(errorMsg.message || "Request failed");
        }
      }
    }
  };

export default api;
