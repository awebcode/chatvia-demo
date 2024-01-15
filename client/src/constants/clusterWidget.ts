import { Images } from "./images";
import { Options } from "../models";

export const languageList: Options[] = [
  {
    id: 1,
    name: "vi",
    img: Images.vietnam,
  },
  {
    id: 2,
    name: "en",
    img: Images.usa,
  },
];

export const userMenu: Options[] = [
  {
    id: 1,
    icon: "account_box",
    name: "profile",
  },
  {
    id: 2,
    icon: "settings",
    name: "setting",
  },
  {
    id: 3,
    icon: "logout",
    name: "logout",
  },
];

export const sideMenu = [
  {
    id: 1,
    icon: "person",
    title: "Profile",
    value: "profile",
  },
  {
    id: 2,
    icon: "message",
    title: "Chat",
    value: "chat",
  },
  {
    id: 3,
    icon: "groups",
    title: "Group",
    value: "group",
  },
  {
    id: 4,
    icon: "groupadd",
    title: "Friend Request",
    value: "request",
  },
  {
    id: 5,
    icon: "notifications",
    title: "Notifications",
    value: "notifications",
  },

  {
    id: 6,
    icon: "phone",
    title: "Contacts",
    value: "contact",
  },

  {
    id: 7,
    icon: "language",
    title: "Languages",
  },
  {
    id: 8,
    icon: "nightlight",
    title: "Dark / Light mode",
  },
];

export const profileMenu: Options[] = [
  {
    id: 1,
    name: "Edit",
    icon: "modeedit",
  },
];

export const contactOptions: Options[] = [
  {
    id: 1,
    name: "share",
    icon: "share",
  },
  {
    id: 2,
    name: "block",
    icon: "block",
  },
  {
    id: 3,
    name: "remove",
    icon: "deleteoutline",
  },
];

export const messageOptions = [
  {
    id: 1,
    name: "select all",
  },
  {
    id: 2,
    name: "add a reaction",
  },
  {
    id: 3,
    name: "reply this message",
  },
  {
    id: 4,
    name: "forward",
  },
  {
    id: 5,
    name: "remove",
  },
];
