import "./Conversation.scss";

import { Avatar, Skeleton, Typography } from "@mui/material";
import {
  selectConversations,
  selectFetching,
  selectMode,
  selectPartner,
} from "../../dashboardSlice";

import { Calling } from "./Calling";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { HeaderTool } from "./HeaderTool";
import { Images } from "../../../../constants";
import { useAppSelector } from "../../../../app/store";
import { useState } from "react";

export interface HeaderProps {
  open: boolean;
  openDrawer: (value: boolean) => void;
}

export function Header({ openDrawer, open }: HeaderProps) {
  const fetching = useAppSelector(selectFetching);
  const partner = useAppSelector(selectPartner);
  const mode = useAppSelector(selectMode);
  const conversation = useAppSelector(selectConversations);

  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState({
    isVoice: false,
    isVideo: false,
  });

  const handleOpenModal = (modalType: "isVoice" | "isVideo") => {
    setIsOpen(true);

    if (modalType === "isVoice") {
      setModalType({ isVoice: true, isVideo: false });
    } else {
      setModalType({ isVoice: false, isVideo: true });
    }
  };

  return (
    <div
      className={`chat-header w-full px-2 py-4 flex ${
        mode === "dark" && "dark"
      }`}
    >
      {fetching.isConversation ? (
        <div className="flex items-center justify-between">
          <Skeleton variant="circular">
            <Avatar />
          </Skeleton>

          <Skeleton sx={{ ml: "1rem" }} variant="rounded">
            <Typography>
              doris brown <FiberManualRecordIcon className="icon online ml-1" />
            </Typography>
          </Skeleton>
        </div>
      ) : (
        <>
          {(conversation || partner) && (
            <div className="header-name flex justify-between items-center">
              <img
                className="w-9 h-9 object-contain"
                src={
                  conversation?.isGroup && conversation?.group?.avatar
                    ? conversation?.group?.avatar
                    : !conversation?.isGroup && partner?.avatar
                    ? partner?.avatar
                    : Images.avatar1
                }
                alt="logo"
              />

              <h5
                className={`flex font-semibold items-center w-4/5 capitalize ${
                  mode === "dark" ? "text-white" : "text-black"
                }`}
              >
                {conversation?.isGroup
                  ? conversation?.group?.name
                  : partner?.username}
                {!conversation?.isGroup && (
                  <FiberManualRecordIcon className="icon online ml-1" />
                )}
              </h5>
            </div>
          )}

          <HeaderTool
            open={open}
            openDrawer={openDrawer}
            call={handleOpenModal}
          />

          <Calling
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            modalType={modalType}
            partner={partner!}
          />
        </>
      )}
    </div>
  );
}
