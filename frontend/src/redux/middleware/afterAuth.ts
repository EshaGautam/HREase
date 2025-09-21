import axios from 'axios';
import * as actions from '../actions/afterAuth';
import { toast } from 'react-toastify';

const api =
  ({ dispatch, getState }: any) =>
  (next: any) =>
  async (action: any) => {
    if (action.type !== actions.apiCallBegan.type) {
      return next(action);
    }

    const { url, method, data, onAuthStart, onAuthSuccess, onAuthFailed, onAuthReset } = action.payload;

    if (onAuthStart) {
      dispatch({ type: onAuthStart });
    }

    next(action);

    try {
      const {
        loginReducer: { token },
      } = getState();

      if (onAuthReset) {
        return dispatch({ type: onAuthReset, payload: null });
      }

      const config = {
        url: `${process.env.REACT_APP_BASE_URL + url}`,
        method,
        data,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      };

      const response = await axios(config);

      if (response?.status) {
        dispatch(actions.apiCallSuccess(response.data));

        if (onAuthSuccess) {
          dispatch({ type: onAuthSuccess, payload: response.data });

          if (url.includes("/auth/login")) {
            toast.success(response.data.message || "Login successful");
          }
        }
      } else {
        dispatch(actions.apiCallFailed(response?.data));

        if (onAuthFailed) {
          dispatch({ type: onAuthFailed, payload: response?.data });

          if (url.includes("/auth/login")) {
            toast.error(response?.data?.message || "Login failed");
          }
        }
      }
    } catch (error: any) {
      const errorMsg =
        error.response && error.response.data
          ? error.response.data
          : { message: "Something went wrong" };

      dispatch(actions.apiCallFailed(errorMsg));

      if (onAuthFailed) {
        dispatch({ type: onAuthFailed, payload: errorMsg });

        if (url.includes("/auth/login")) {
          toast.error(errorMsg.message || "Login failed");
        }
      }
    }
  };

export default api;
