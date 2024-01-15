import "./Conversation.scss";

import CustomModal from "../../../../components/common/Modal/Modal";
import { Left } from "./ItemLeft";
import { Message } from "../../../../models";
import { Right } from "./ItemRight";
import { useState } from "react";

export interface IChatItemProps {
  userType: "friend" | "me";

  message: Message;

  isDisabled?: boolean;
  isTyping?: boolean;
  hasImages?: boolean;
}

export function ChatItem({
  userType,
  message,
  isDisabled,
  isTyping,
  hasImages,
}: IChatItemProps) {
  // check id nếu thằng sau trùng thằng trước
  // thì thằng tin nhắn trc sẽ bị ẩn tên và avatar

  // const filter = messagesList.filter(cons => cons.id === message.id)

  const [isOpen, setIsOpen] = useState(false);
  const [img, setImg] = useState("");

  const handleOpenImage = (img: string) => {
    setIsOpen(true);
    setImg(img);
  };

  return (
    <>
      {userType === "friend" ? (
        <Left
          image={handleOpenImage}
          isTyping={isTyping}
          hasImages={hasImages}
          message={message}
          isDisabled={isDisabled}
        />
      ) : (
        <Right
          image={handleOpenImage}
          isTyping={isTyping}
          hasImages={hasImages}
          message={message}
          isDisabled={isDisabled}
        />
      )}
      <CustomModal isOpen={isOpen} onClose={setIsOpen}>
        <img className="rounded-2xl" src={img} alt="" />
      </CustomModal>
    </>
  );
}
