import { AuthState, UserProfile } from "../../models";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";

const initialState: AuthState = {
  isFetching: {
    isContacts: false,
  },

  isSubmitting: false,
  isSuccess: false,

  hasFailed: {
    isFailed: false,
    message: "",
  },

  isSignedIn: false,
  isValidUser: false,

  user: null,

  userList: [],
  contacts: [],
};

export const auth = createSlice({
  name: "auth",
  initialState,

  reducers: {
    fetchingContacts(state) {
      state.isFetching.isContacts = true;
    },

    fetchUser(state, action: PayloadAction<UserProfile>) {
      state.user = action.payload;
    },

    onValidateUser(state, action: PayloadAction<boolean>) {
      state.isValidUser = action.payload;
    },

    fetchContactsSuccess(state, action: PayloadAction<UserProfile[]>) {
      state.contacts = action.payload;
    },

    fetchUserListSuccess(state, action: PayloadAction<UserProfile[]>) {
      state.userList = action.payload;
    },

    onSubmittingAuth(
      state,
      action: PayloadAction<{ isSubmitting: boolean; isSuccess: boolean }>
    ) {
      state.isSubmitting = action.payload.isSubmitting;
      state.isSuccess = action.payload.isSuccess;
    },

    onFailed(
      state,
      action: PayloadAction<{ isFailed: boolean; message: string }>
    ) {
      state.hasFailed.isFailed = action.payload.isFailed;
      state.hasFailed.message = action.payload.message;
    },
  },
});

export const {
  fetchUser,
  onValidateUser,
  fetchContactsSuccess,
  fetchUserListSuccess,
  fetchingContacts,
  onSubmittingAuth,
} = auth.actions;

export const selectSignedIn = (state: RootState) => state.auth.isSignedIn;
export const selectUser = (state: RootState) => state.auth.user;
export const selectValidUser = (state: RootState) => state.auth.isValidUser;
export const selectAuthFetching = (state: RootState) => state.auth.isFetching;
export const selectContacts = (state: RootState) => state.auth.contacts;
export const selectUserList = (state: RootState) => state.auth.userList;
export const selectSubmit = (state: RootState) => state.auth.isSubmitting;
export const selectFailed = (state: RootState) => state.auth.hasFailed;
export const selectSuccess = (state: RootState) => state.auth.isSuccess;

export const authReducer = auth.reducer;
