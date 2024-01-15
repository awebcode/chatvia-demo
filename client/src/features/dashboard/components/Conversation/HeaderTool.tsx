import CallIcon from "@mui/icons-material/Call";
import { IconButton } from "@mui/material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import { selectDisabledConversation } from "../../dashboardSlice";
import { useAppSelector } from "../../../../app/store";

export interface IHeaderToolProps {
  call: (value: "isVoice" | "isVideo") => void;
  openDrawer: (value: boolean) => void;

  open: boolean;
}

export function HeaderTool({ call, openDrawer, open }: IHeaderToolProps) {
  const disabledConversation = useAppSelector(selectDisabledConversation);

  return (
    <div
      className={`flex justify-end ${
        disabledConversation ? "w-full" : "header-tool"
      }`}
    >
      <IconButton disabled={disabledConversation} className="px-4 tool-icon">
        <SearchIcon />
      </IconButton>

      <IconButton
        disabled={disabledConversation}
        onClick={() => call("isVoice")}
        className="px-4 tool-icon"
      >
        <CallIcon />
      </IconButton>

      <IconButton
        disabled={disabledConversation}
        onClick={() => call("isVideo")}
        className="px-4 tool-icon"
      >
        <VideocamOutlinedIcon />
      </IconButton>

      <IconButton disabled={disabledConversation} className="px-4 tool-icon">
        <PersonOutlineOutlinedIcon />
      </IconButton>

      <IconButton
        disabled={disabledConversation}
        className="px-4 tool-icon"
        onClick={() => openDrawer(!open)}
      >
        <MoreHorizOutlinedIcon />
      </IconButton>
    </div>
  );
}
