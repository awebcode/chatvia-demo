import "./Notification.scss";

import { Button, Icon } from "@mui/material";

import { Notification } from "../../../../models";
import moment from "moment";

export interface INotifyItemProps {
  notify: Notification;
}

export function NotifyItem({ notify }: INotifyItemProps) {
  return (
    <Button color="inherit" className="notify-item-container">
      <div className="notify-item-wrapper">
        <div className="notify-image">
          <img src={notify.user.avatar} alt="" />

          <div
            className={`notify-icon ${
              notify.type === "newMsg"
                ? "bg-green-400"
                : notify.type === "missedCall"
                ? "bg-red-500"
                : "bg-blue-400"
            }`}
          >
            <Icon className="icon">
              {" "}
              {notify.type === "friendRequest"
                ? "person_add"
                : notify.type === "newMsg"
                ? "chat_bubble"
                : "call"}{" "}
            </Icon>
          </div>
        </div>

        <div className="notify-content">
          {notify.type === "friendRequest"
            ? `${notify.user.username} have sent a friend request to you!! `
            : notify.type === "missedCall"
            ? `You've missed call from ${notify.user.username}`
            : `${notify.user.username} have sent to you a new message`}

          <p className="text-blue-500">
            {" "}
            {moment(notify.timeStamp).startOf("hour").fromNow()}{" "}
          </p>
        </div>
      </div>
    </Button>
  );
}
