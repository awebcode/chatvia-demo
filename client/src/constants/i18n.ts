import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next",
      "hồ sơ của tôi": "my profile",
    },
  },
  vi: {
    translation: {
      "my profile": "hồ sơ của tôi",
      "Attached Files": "Những thư mục đính kèm",
      "Find users": "Tìm bạn bè",
      "You don't have any conversation recently!!":
        "Bạn không có cuộc trò chuyện nào gần đây!!",
      "Back to Home": "Quay trở lại trang chính",
      "Oops... Look like you get lost 🤔": "Oops... Có gì đó không đúng 🤔",
      "Find groups": "Tìm kiếm nhóm",
      "There is no friend request for you!!":
        "Bạn không có lời mời kết bạn nào!!",
      "friend request": "lời mời kết bạn",
      "Choose any user to see the conversation or get started to chat with them.":
        "Chọn 1 người dùng bất kì để xem cuộc trò chuyện hoặc bắt đầu trò chuyện với họ.",
      "start audio call": "Bắt đầu cuộc gọi âm thanh",
      "start video call": "Bắt đầu cuộc gọi video",
      "Enter Message": "Nhập tin nhắn",
      "select all": "chọn tất cả",
      "add a reaction": "thả icon",
      "reply this message": "trả lời tin nhắn này",
      share: "chia sẻ liên hệ",
      block: "chặn liên hệ",
      profile: "hồ sơ",
      setting: "cài đặt",
      logout: "đăng xuất",
      forward: "chuyển tiếp tin nhắn",
      remove: "xóa",
      notifications: "Thông báo",
      groups: "Nhóm",
      Accept: "Đồng ý",
      Deny: "Từ chối",
      Recent: "Gần đây",
      About: "Về tôi",
      Edit: "chỉnh sửa",
      chats: "cuộc trò chuyện",
      contacts: "liên hệ",
      Profile: "Hồ sơ",
      Chat: "Cuộc trò chuyện",
      Group: "Nhóm",
      "Friend Request": "Lời mời kết bạn",
      Notifications: "Thông báo",
      Contacts: "Liên hệ",
      Languages: "Ngôn ngữ",
      "Dark / Light mode": "Sáng / Đêm",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
