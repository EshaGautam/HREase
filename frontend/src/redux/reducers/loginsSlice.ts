import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { authApiCallBegan } from "../actions/beforeAuth";
import type { RootState } from "../store";

export interface UserDetailsState {
  success: boolean;
  message: string;

  data: {
    user?: {
      email: string;
      fullName:string
      isActive: boolean;
      lastLogin: string;
      lastName: string;
      phone: string;
      photo:string;
      role: string;
      username: string;
      _id: string;
    };
    token: string;
    type?: string;
    rememberMe?: boolean;
  };
}

export interface ErrorState {
  success: boolean;
  msg: string;
}
export interface LoginState {
  loading: boolean;
  error: ErrorState;
  userDetails: UserDetailsState ;
  email:string
}

const initialState: LoginState = {
  loading: false,
  error: {
    success: false,
    msg: "",
  },
  userDetails: {
    success: false,
    message: "",
    data: {
      user: {
        email: "",

        fullName:"",
        isActive: false,
        lastLogin: "",
        photo:"",
        lastName: "",
        phone: "",
        role: "",
        username: "",
        _id: "",
      },
      token: "",
      rememberMe: false,
    },
  },
  email:""
};

const userInfoFromStorage = localStorage.getItem("user_Info");
if (userInfoFromStorage) {
  const datafromStorage = JSON.parse(userInfoFromStorage);
  initialState.userDetails = datafromStorage;
}

const storedEmail = localStorage.getItem("email");
if (storedEmail) {
  initialState.email = JSON.parse(storedEmail);
}

export const loginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    request: (state) => {
      state.loading = true;
    },
    success: (state, action: PayloadAction<UserDetailsState>) => {
      state.loading = false;
      state.error = { success: false, msg: "" };
      state.userDetails = action.payload;
      localStorage.setItem("user_Info", JSON.stringify(action.payload));
    },
    fail: (state, action: PayloadAction<ErrorState>) => {
      state.loading = false;
      state.userDetails = {
        success: false,
        message: "",
        data: {
          user: {
            email: "",
            fullName:"",
            isActive: false,
            lastLogin: "",
            lastName: "",
            phone: "",
            photo:"",
            role: "",
            username: "",
            _id: "",
          },
          token: "",
          rememberMe: false,
        },
      };
      state.error = action.payload;
      localStorage.removeItem("user_Info");
    },
    setEmail: (state, action: PayloadAction<string>) => {
    state.email = action.payload;
    localStorage.setItem("email", JSON.stringify(action.payload));
  },
   logoutUser: (state) => {
      state.loading = false;
      state.userDetails = {
        success: false,
        message: "",
        data: {
          user: {
            email: "",
            fullName:"",
            isActive: false,
            lastLogin: "",
            lastName: "",
            phone: "",
            photo:"",
            role: "",
            username: "",
            _id: "",
          },
          token: "",
          rememberMe: false,
        },
      };
      state.error = { success: false, msg: "" };
      state.email = "";
      localStorage.removeItem("user_Info");
      localStorage.removeItem("email");
    },
  
  },
});

export const { request, success, fail,setEmail,logoutUser} = loginSlice.actions;

export default loginSlice.reducer;

export const loginSliceValue = (state: RootState) => state.loginReducer;

export const loginUser = (
 email: string,
  password: string,
  rememberMe: boolean
) =>
  authApiCallBegan({
    url: "/auth/login",
    method: "POST",
    data: { email, password, rememberMe },
    onAuthStart: request.type,
    onAuthSuccess: success.type,
    onAuthFailed: fail.type,
  });
