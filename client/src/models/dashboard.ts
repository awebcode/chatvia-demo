import { UserProfile } from "./auth";

export type Sides =
  | "profile"
  | "chat"
  | "group"
  | "contact"
  | "setting"
  | "request"
  | "notifications";

export type SettingModal =
  | "addUser"
  | "members"
  | "image"
  | "imagesList"
  | "files"
  | "links";

export type EditContactType = "block" | "remove";

export type Mode = "dark" | "light";

export type Language = "vi" | "en" | "bn";

export interface RequestRes<T> {
  data: T[];
}

export interface MessageRes {
  message: string;
}

export interface File {
  id: string;
  name: string;
  length: number;
  date: string;
}

export interface Link {
  id: string;
  name: string;
  href: string;
  date: string;
}

export interface Notification {
  id: string;
  user: UserProfile;
  readStatus: boolean;
  content: string;
  type: "newMsg" | "friendRequest" | "missedCall";
  timeStamp: Date;
}

export interface Conversation {
  _id: string;
  isGroup: boolean;
  messages: Message[];
  participant: UserProfile[];
  groupName: string;
  group?: Group;
  __v: number;
}

export interface Group {
  _id: string;
  name: string;
  avatar: string;
  members: MemberRole[];
  conversation: string;
  __v: number | string;
}

export interface MemberRole {
  member: string;
  role: "member" | "admin";
  _id: string;
}

export interface Settings {
  data: {
    _id: string;
    languages: Language;
    mode: Mode;
    user: string;
    __v: number;
  };
}

export interface DashboardState {
  fetching: {
    isConversation: boolean;
    isFriendList: boolean;
    isFriendRequest: boolean;
    isRecentList: boolean;
    isContact: boolean;
  };

  submitting: {
    isAccepting: boolean;
    isDenying: boolean;
    isBlocking: boolean;
  };

  blockedStatus: "blocked" | "unBlocked" | null;

  conversations: Conversation | null;
  friendRequests: FriendRequest[];
  friends: UserProfile[];
  partner: UserProfile | null;
  mode: Mode;
  languages: Language;
  message: Message | null;
  settings: Settings | null;
  recentList: Conversation[];
  group: Conversation[];
  groupInfo: Group | null;

  conversationId: string;
  partnerId: string;

  openConversation: boolean;
  isDisabledConversation: boolean;
}

export interface Message {
  _id?: string;
  partnerId?: number | string;
  consId?: number | string;
  message: string;
  sender?: UserProfile;
  hasImages?: boolean;
  images?: [{ id: string; img: string }];
  status?:
    | "sent"
    | "delivered"
    | "read"
    | "unread"
    | "online"
    | "leave"
    | "off";
  timeStamp?: string;
}

export interface Groups {
  id: number;
  name: string;
  avatar: string;
}

export interface Options {
  id: number;
  icon?: string;
  name: string;
  img?: string;
}

export interface ContactInvite {
  email: string;
  message: string;
}

export interface Emoji {
  id: string;
  name: string;
  native: string;
  unified: string;
  keywords: string[];
  shortcodes: string;
}

export interface FriendRequest {
  _id: string;
  friend: string;
  sender: UserProfile;
  friendShipStatus: "pending" | "accepted" | "deny";
  __v: number;
}
