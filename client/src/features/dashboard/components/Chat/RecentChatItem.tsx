import { onOpenConversation, selectMode } from "../../dashboardSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/store";

import { AvatarBadge } from "../../../../components/common/Avatar/AvatarBadge";
import { Badge } from "../../../../components/common/Badge/Badge";
import { Button } from "@mui/material";
import { Message } from "../../../../models";
import moment from "moment";

export interface IRecentChatItemProps {
  message: Message[];

  isSelected: boolean;

  onClick: (id: string, partnerId: string) => void;
}

export function RecentChatItem({
  message,
  isSelected,
  onClick,
}: IRecentChatItemProps) {
  const dispatch = useAppDispatch();

  const mode = useAppSelector(selectMode);

  const handleOpenConversation = () => {
    dispatch(onOpenConversation(true));
    onClick(message[0]._id!, message[0].sender!._id!);
  };

  return (
    <>
      {message.length === 0 ? null : (
        <Button
          onClick={handleOpenConversation}
          className={
            isSelected
              ? `chat-recent-item isActive ${mode === "dark" ? "dark" : ""}`
              : "chat-recent-item"
          }
        >
          <div className="w-full h-full flex justify-between items-center">
            <AvatarBadge
              alt={message[0].sender!.username}
              status={message[0].status}
              avatar={message[0].sender!.avatar!}
            />

            <div className="recent-msg text-left">
              <h5
                className={`font-semibold ${
                  mode === "dark" ? "text-white" : "text-black"
                }`}
              >
                {message[0].sender!.username}{" "}
              </h5>
              <p className=" text-gray-400">{message[0].message} </p>
            </div>

            <div className="text-gray-300 flex items-end flex-col">
              {moment(message[0].timeStamp).format("LT")}
              <Badge content={10} />
            </div>
          </div>
        </Button>
      )}
    </>
  );
}
