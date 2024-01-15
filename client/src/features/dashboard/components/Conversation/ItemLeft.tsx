import "./Conversation.scss";

import AccessAlarmsOutlinedIcon from "@mui/icons-material/AccessAlarmsOutlined";
import { CustomMenu } from "../../../../components/common/Menu/Menu";
import { Loader } from "../../../../components/common/Loader/BaseLoader";
import { Message } from "../../../../models";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { messageOptions } from "../../../../constants";
import moment from "moment";
import { selectMode } from "../../dashboardSlice";
import { useAppSelector } from "../../../../app/store";

export interface ILeftProps {
  message: Message;

  isDisabled?: boolean;
  isTyping?: boolean;
  hasImages?: boolean;

  image: (value: string) => void;
}

export function Left({
  message,
  isDisabled,
  isTyping,
  hasImages,
  image,
}: ILeftProps) {
  const mode = useAppSelector(selectMode);

  const handleOpenImage = (img: string) => {
    image(img);
  };

  return (
    <div className="chat-item-wrapper relative w-full flex items-end py-4">
      <div className="chat-avatar mr-3">
        {!isDisabled && <img src={`${message.sender?.avatar}`} alt="avatar" />}
      </div>

      <div className="chat-content">
        <div className="w-full flex flex-wrap">
          <div className="chat-text-wrap flex mb-3">
            <div className="chat-text-content">
              {isTyping ? (
                <p className="chat-text flex items-end">
                  {" "}
                  Typing{" "}
                  <Loader
                    style={{
                      fontSize: "0.2rem",
                      marginLeft: "0.1rem",
                    }}
                  />{" "}
                </p>
              ) : (
                <>
                  <p className="chat-text"> {message.message}</p>
                  {hasImages && (
                    <ul className="flex relative w-full">
                      {message.images?.map((img, key) => {
                        return (
                          <li
                            key={key}
                            onClick={() => handleOpenImage(img.img)}
                            className=" cursor-pointer w-40 h-28 p-1"
                          >
                            <img
                              src={img.img}
                              alt=""
                              className="rounded-2xl z-10 object-contain w-full h-full border border-solid border-white"
                            />
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </>
              )}

              {!isTyping && (
                <p className="chat-time flex items-center justify-end">
                  <AccessAlarmsOutlinedIcon fontSize="small" />
                  {moment(message.timeStamp).format("LT")}
                </p>
              )}
            </div>

            {!isTyping && (
              <div className="chat-text-option">
                <CustomMenu
                  menu={messageOptions}
                  direction="rtl"
                  icon={<MoreVertOutlinedIcon />}
                />
              </div>
            )}
          </div>
          <div
            className={`chat-name w-full capitalize font-semibold ${
              mode === "dark" ? "text-white" : "text-black"
            }`}
          >
            {!isDisabled && message.sender?.username}
          </div>
        </div>
      </div>
    </div>
  );
}
