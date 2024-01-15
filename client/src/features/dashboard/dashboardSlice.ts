import {
  Conversation,
  DashboardState,
  FriendRequest,
  Group,
  Language,
  Message,
  Mode,
  Settings,
  UserProfile,
} from "../../models";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";

const initialState: DashboardState = {
  fetching: {
    isConversation: false,
    isFriendList: false,
    isFriendRequest: false,
    isRecentList: false,
    isContact: false,
  },

  submitting: {
    isAccepting: false,
    isDenying: false,
    isBlocking: false,
  },

  openConversation: false,
  isDisabledConversation: true,

  friends: [],
  friendRequests: [],
  recentList: [],
  group: [],

  conversations: null,
  partner: null,
  settings: null,
  message: null,
  blockedStatus: null,
  groupInfo: null,

  mode: "light",
  languages: "en",
  conversationId: "",
  partnerId: "",
};

export const dashboard = createSlice({
  name: "dashboard",
  initialState,

  reducers: {
    fetchingConversation(state) {
      state.fetching.isConversation = true;
    },

    fetchingRecentList(state) {
      state.fetching.isRecentList = true;
    },

    fetchingFriendRequest(state) {
      state.fetching.isFriendRequest = true;
    },

    fetchGroupListSuccessfully(state, action: PayloadAction<Conversation[]>) {
      state.group = action.payload;
    },

    fetchConversationSuccess(
      state,
      action: PayloadAction<Conversation | null>
    ) {
      state.conversations = action.payload!;
      state.fetching.isConversation = false;
    },

    fetchUserListSuccess(state, action: PayloadAction<UserProfile[]>) {
      state.friends = action.payload;
      state.fetching.isFriendList = false;
    },

    fetchFriendRequestsSuccess(state, action: PayloadAction<FriendRequest[]>) {
      state.friendRequests = action.payload;
      state.fetching.isFriendList = false;
    },

    fetchPartnerProfileSuccess(
      state,
      action: PayloadAction<UserProfile | null>
    ) {
      state.partner = action.payload;
    },

    fetchSettings(state, action: PayloadAction<Settings>) {
      state.settings = action.payload;
    },

    fetchRecentList(state, action: PayloadAction<Conversation[]>) {
      state.fetching.isRecentList = false;
      state.recentList = action.payload;
    },

    fetchGroupInformationSuccess(state, action: PayloadAction<Group | null>) {
      state.groupInfo = action.payload;
    },

    fetchConversationFailed(state) {
      state.fetching.isConversation = false;
    },

    onModeChange(state, action: PayloadAction<Mode>) {
      state.mode = action.payload;
    },

    onOpenConversation(state, action: PayloadAction<boolean>) {
      state.openConversation = action.payload;
    },

    onLanguagesChange(state, action: PayloadAction<Language>) {
      state.languages = action.payload;
    },

    onBlockedStatusChange(
      state,
      action: PayloadAction<"blocked" | "unBlocked">
    ) {
      state.blockedStatus = action.payload;
    },

    onSubmitting(
      state,
      action: PayloadAction<{
        type: "isAccepting" | "isDenying" | "isBlocking";
        status: boolean;
      }>
    ) {
      if (action.payload.type === "isAccepting") {
        state.submitting.isAccepting = action.payload.status;
      } else if (action.payload.type === "isBlocking") {
        state.submitting.isBlocking = action.payload.status;
      } else {
        state.submitting.isDenying = action.payload.status;
      }
    },

    addNewMessage(state, action: PayloadAction<Message>) {
      state.conversations?.messages.push(action.payload);
    },

    addNewRequest(state, action: PayloadAction<FriendRequest>) {
      state.friendRequests.push(action.payload);
    },

    disabledConversation(state, action: PayloadAction<boolean>) {
      state.isDisabledConversation = action.payload;
    },

    onSelectedPartner(state, action: PayloadAction<string>) {
      state.partnerId = action.payload;
    },
  },
});

export const {
  fetchingConversation,
  fetchingFriendRequest,
  fetchFriendRequestsSuccess,
  fetchConversationSuccess,
  fetchUserListSuccess,
  fetchPartnerProfileSuccess,
  fetchGroupListSuccessfully,
  fetchSettings,
  fetchRecentList,
  fetchingRecentList,
  fetchGroupInformationSuccess,
  fetchConversationFailed,
  onModeChange,
  onSubmitting,
  onOpenConversation,
  onLanguagesChange,
  onBlockedStatusChange,
  onSelectedPartner,
  addNewMessage,
  addNewRequest,
  disabledConversation,
} = dashboard.actions;

export const selectConversations = (state: RootState) =>
  state.dashboard.conversations;
export const selectFriendList = (state: RootState) => state.dashboard.friends;
export const selectFetching = (state: RootState) => state.dashboard.fetching;
export const selectMode = (state: RootState) => state.dashboard.mode;
export const selectLanguage = (state: RootState) => state.dashboard.languages;
export const selectPartner = (state: RootState) => state.dashboard.partner;
export const selectGroupList = (state: RootState) => state.dashboard.group;
export const selectSubmit = (state: RootState) => state.dashboard.submitting;
export const selectDisabledConversation = (state: RootState) =>
  state.dashboard.isDisabledConversation;
export const selectOpenConversation = (state: RootState) =>
  state.dashboard.openConversation;
export const selectBlockedStatus = (state: RootState) =>
  state.dashboard.blockedStatus;
export const selectSettings = (state: RootState) => state.dashboard.settings;
export const selectGroupInfo = (state: RootState) => state.dashboard.groupInfo;
export const selectFriendRequest = (state: RootState) =>
  state.dashboard.friendRequests;
export const selectRecentList = (state: RootState) =>
  state.dashboard.recentList;
export const selectPartnerId = (state: RootState) => state.dashboard.partnerId;

export const dashboardReducer = dashboard.reducer;
