import { alert, cookies } from "../../utils";
import {
  fetchUser,
  fetchUserListSuccess,
  onSubmittingAuth,
  onValidateUser,
} from "./authSlice";

import { AppThunk } from "../../app/store";
import { UserProfile } from "../../models";
import { authService } from "../../services";

export const signin =
  (values: UserProfile): AppThunk =>
  async (dispatch) => {
    dispatch(onSubmittingAuth({ isSubmitting: false, isSuccess: false }));

    try {
      const res = await authService.signin(values);

      alert({
        content: res.message!,
        position: "top-center",
        type: "success",
      });

      cookies.setCookie("user", res);

      dispatch(onSubmittingAuth({isSubmitting: false, isSuccess : true}));
    } catch (error: any) {
      console.log("🚀 ~ file: auth.ts:14 ~ signin ~ error:", error);
      if (error) {
        alert({
          content: error.response ? error.response.data.message : error.message,
          position: "top-center",
          type: "error",
        });

        dispatch(onSubmittingAuth({ isSubmitting: false, isSuccess: false }));
      }
    }
  };

export const signup =
  (values: UserProfile): AppThunk =>
  async (dispatch) => {
    dispatch(onSubmittingAuth({ isSubmitting: false, isSuccess: false }));

    try {
      const res = await authService.signup(values);

      alert({
        content: res.message!,
        position: "top-center",
        type: "success",
      });
      dispatch(onSubmittingAuth({ isSubmitting: false, isSuccess: true }));
    } catch (error: any) {
      console.log("🚀 ~ file: auth.ts:14 ~ signin ~ error:", error);
      if (error) {
        alert({
          content: error.response ? error.response.data.message : error.message,
          position: "top-center",
          type: "error",
        });

        dispatch(onSubmittingAuth({ isSubmitting: false, isSuccess: false }));
      }
    }
  };

export const handleGetUser = (): AppThunk => async (dispatch) => {
  try {
    const res = await authService.getUser();

    dispatch(fetchUser(res.data));
  } catch (error: any) {
    console.log("🚀 ~ file: authThunk.ts:59 ~ error:", error);
    if (error) {
      alert({
        content: error.response ? error.response.data.message : error.message,
        position: "top-center",
        type: "error",
      });
    }
  }
};

export const validateUser =
  ({ email }: UserProfile): AppThunk =>
  async (dispatch) => {
    try {
      await authService.validateUser({ email });

      dispatch(onValidateUser(true));
    } catch (error: any) {
      console.log("🚀 ~ file: authThunk.ts:59 ~ error:", error);

      if (error) {
        alert({
          content: error.response ? error.response.data.message : error.message,
          position: "top-center",
          type: "error",
        });

        dispatch(onValidateUser(false));
      }
    }
  };

export const handleResetPwd =
  (values: UserProfile): AppThunk =>
  async (dispatch) => {
    dispatch(onSubmittingAuth({ isSubmitting: false, isSuccess: false }));

    try {
      const res = await authService.resetPassword(values);

      dispatch(fetchUser(res));

     dispatch(onSubmittingAuth({ isSubmitting: false, isSuccess: true }));
    } catch (error: any) {
      console.log("🚀 ~ file: authThunk.ts:59 ~ error:", error);
      if (error) {
        alert({
          content: error.response ? error.response.data.message : error.message,
          position: "top-center",
          type: "error",
        });

        dispatch(onSubmittingAuth({ isSubmitting: false, isSuccess: false }));
      }
    }
  };

export const handleGetAllUser = (): AppThunk => async (dispatch) => {
  dispatch(onSubmittingAuth({ isSubmitting: false, isSuccess: false }));

  try {
    const res = await authService.getAllUsers();

    dispatch(fetchUserListSuccess(res.data));

    dispatch(onSubmittingAuth({ isSubmitting: false, isSuccess: true }));
  } catch (error: any) {
    console.log("🚀 ~ file: authThunk.ts:59 ~ error:", error);
    if (error) {
      alert({
        content: error.response ? error.response.data.message : error.message,
        position: "top-center",
        type: "error",
      });

      dispatch(onSubmittingAuth({ isSubmitting: false, isSuccess: false }));
    }
  }
};
