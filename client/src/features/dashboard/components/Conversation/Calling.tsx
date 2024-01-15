import { Avatar, IconButton } from "@mui/material";
import { selectConversations, selectMode } from "../../dashboardSlice";

import ClearIcon from "@mui/icons-material/Clear";
import CustomModal from "../../../../components/common/Modal/Modal";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { UserProfile } from "../../../../models";
import VideocamIcon from "@mui/icons-material/Videocam";
import { useAppSelector } from "../../../../app/store";
import { useTranslation } from "react-i18next";

export interface ICallingProps {
  partner: UserProfile;

  modalType: {
    isVoice: boolean;
    isVideo: boolean;
  };

  setIsOpen: (value: boolean) => void;

  isOpen: boolean;
}

export function Calling({
  partner,
  modalType,
  setIsOpen,
  isOpen,
}: ICallingProps) {
  const mode = useAppSelector(selectMode);
  const conversation = useAppSelector(selectConversations);

  const { t } = useTranslation();

  return (
    <CustomModal
      styles={{ width: "31.25rem", height: "22rem" }}
      isOpen={isOpen}
      onClose={setIsOpen}
    >
      <div className="modal-wrappe p-6 flex flex-col items-center">
        <div className="avatar w-28 h-28">
          <Avatar
            src={
              conversation?.isGroup
                ? conversation?.group?.avatar
                : partner?.avatar
            }
            sx={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>

        <div className="w-full my-8">
          <h5
            className={`w-full text-lg font-semibold text-center capitalize mb-2 ${
              mode === "dark" && "text-white"
            }`}
          >
            {" "}
            {conversation?.isGroup
              ? conversation?.group?.name
              : partner?.username}
          </h5>

          <p className="w-full text-sm text-gray-400 text-center capitalize">
            {t(
              `${modalType.isVoice ? "start audio call" : "start video call"}`
            )}
          </p>
        </div>

        <div className="w-full flex justify-center">
          <div className="px-2">
            <IconButton
              style={{
                color: "#fff",
                background: "red",
                padding: "0.9rem",
              }}
            >
              <ClearIcon />
            </IconButton>
          </div>
          <div className="px-2">
            <IconButton
              style={{
                color: "#fff",
                background: "#06d6a0",
                padding: "0.9rem",
              }}
            >
              {modalType.isVoice ? <LocalPhoneIcon /> : <VideocamIcon />}
            </IconButton>
          </div>
        </div>
      </div>
    </CustomModal>
  );
}
