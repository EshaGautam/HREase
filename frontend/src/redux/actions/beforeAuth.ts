import { createAction } from '@reduxjs/toolkit';

export const authApiCallBegan = createAction<object>('authApi/callBegan');
export const authApiCallSuccess = createAction<object>('authApi/callSuccess');
export const authApiCallFailed = createAction<object>('authApi/callFailed');
