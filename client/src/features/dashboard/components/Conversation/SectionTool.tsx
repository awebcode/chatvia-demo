import * as React from "react";

import { IconButton, styled } from "@mui/material";
import { selectFetching, selectMode } from "../../dashboardSlice";

import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import { Emoji } from "../../../../models";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import Picker from "@emoji-mart/react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import data from "@emoji-mart/data";
import { useAppSelector } from "../../../../app/store";

export interface ISectionToolProps {
  files: File[];
  selectEmoji: (value: Emoji) => void;
  selectFile: (value: React.ChangeEvent<HTMLInputElement>) => void;
  setOpenEmoji: (value: boolean) => void;
  sendMsg: () => void;

  openEmoji: boolean;

  msg: string;
}

export function SectionTool({
  selectEmoji,
  selectFile,
  setOpenEmoji,
  openEmoji,
  sendMsg,
  msg,
  files,
}: ISectionToolProps) {
  const fetching = useAppSelector(selectFetching);
  const mode = useAppSelector(selectMode);

  return (
    <div
      className={`chat-section-tool relative flex justify-end ${
        mode === "dark" && "dark"
      }`}
    >
      <div className="section-tool p-2 relative">
        <IconButton className="icon" onClick={() => setOpenEmoji(!openEmoji)}>
          <EmojiEmotionsOutlinedIcon />
        </IconButton>
        <div
          className={openEmoji ? `block absolute bottom-16 right-4` : `hidden`}
        >
          <Picker data={data} onEmojiSelect={selectEmoji} />
        </div>
      </div>

      <div className="section-tool p-2 relative">
        <IconButton className="icon" component="label">
          <VisuallyHiddenInput
            type="file"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              selectFile(event)
            }
          />
          <AttachFileOutlinedIcon />
        </IconButton>
      </div>

      <div className="section-tool p-2 relative">
        <IconButton className="icon" component="label">
          <VisuallyHiddenInput
            type="file"
            accept="image/*"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              selectFile(event)
            }
          />
          <BrokenImageOutlinedIcon />
        </IconButton>
      </div>

      <div
        className={
          fetching.isConversation || !msg || files.length === 0
            ? "section-tool p-2 relative send-icon cursor-not-allowed bg-slate-500"
            : "section-tool p-2 relative send-icon"
        }
      >
        <IconButton
          className="icon"
          component="label"
          disabled={fetching.isConversation || !msg ? true : false}
          onClick={() => sendMsg()}
        >
          <SendOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
