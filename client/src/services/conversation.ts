import {
  ArrResponse,
  Conversation,
  EditContactType,
  FriendRequest,
  Message,
  MessageRes,
  RequestRes,
  Settings,
} from "./../models";
import { Language, Mode } from "./../models/dashboard";

import { ObjResponse } from "./../models/common";
import { axiosClient } from ".";

export const conversationService = {
  sendMsg(params: Message): Promise<Message> {
    return axiosClient.post("/conversation/sendMessage", params);
  },

  getConversation(
    isGroup: boolean,
    participant: string[],
    groupName?: string
  ): Promise<ObjResponse<Conversation>> {
    return axiosClient.post(`/conversation/getConversation/${groupName}`, {
      participant,
      isGroup,
    });
  },

  getAllConversation(): Promise<ArrResponse<Conversation>> {
    return axiosClient.post(`/conversation/conversations`);
  },

  getFriendRequest(): Promise<RequestRes<FriendRequest>> {
    return axiosClient.get(`/conversation/getFriendRequest`);
  },

  findContact(email: string): Promise<string> {
    return axiosClient.post(`/conversation/findContact`, { email });
  },

  sendInvitation(id: string): Promise<MessageRes> {
    return axiosClient.post(`/conversation/sendInvitation/${id}`);
  },

  updateFriendRequestStt(
    id: string,
    status: "accepted" | "deny"
  ): Promise<MessageRes> {
    return axiosClient.post(`/conversation/friendRequestStt/${id}`, { status });
  },

  updateSettings(mode: Mode, language: Language): Promise<MessageRes> {
    return axiosClient.post(`/conversation/settings`, { language, mode });
  },

  editContact(contactId: string, type: EditContactType): Promise<MessageRes> {
    return axiosClient.post(`/conversation/editContact`, { contactId, type });
  },

  getSettings(): Promise<Settings> {
    return axiosClient.get(`/conversation/settings`);
  },

  createGroup(participant: string[], groupName?: string): Promise<MessageRes> {
    return axiosClient.post(`/conversation/groupConversation`, {
      participant,
      groupName,
    });
  },

  addUserToGroup(conversationId: string, userId: string): Promise<MessageRes> {
    return axiosClient.post(`/conversation/addUser/${conversationId}`, {
      userId,
    });
  },

  leaveGroup(groupId: string): Promise<MessageRes> {
    return axiosClient.post(`/conversation/leaveGroup/${groupId}`);
  },
};
