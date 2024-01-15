import "./Conversation.scss";

import { Button, IconButton, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { EditContactType, Emoji } from "../../../../models";
import { handleEditContact, sendMsg } from "../../dashboardThunk";
import {
  onBlockedStatusChange,
  selectBlockedStatus,
  selectConversations,
  selectFetching,
  selectMode,
  selectPartner,
  selectPartnerId,
} from "../../dashboardSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/store";

import ClearIcon from "@mui/icons-material/Clear";
import CustomModal from "../../../../components/common/Modal/Modal";
import { FileList } from "./FileList";
import { SectionTool } from "./SectionTool";
import { selectUser } from "../../../auth/authSlice";
import { useTranslation } from "react-i18next";

export function Section() {
  const dispatch = useAppDispatch();
  const conversation = useAppSelector(selectConversations);
  const fetching = useAppSelector(selectFetching);
  const mode = useAppSelector(selectMode);
  const user = useAppSelector(selectUser);
  const partner = useAppSelector(selectPartner);
  const partnerId = useAppSelector(selectPartnerId);
  const blockedStatus = useAppSelector(selectBlockedStatus);
  const { t } = useTranslation();

  const [msg, setMsg] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  const [isUserBlocked, setIsUserBlocked] = useState(false);
  const [isPartnerBlocked, setIsPartnerBlocked] = useState(false);
  const [openEmoji, setOpenEmoji] = useState(false);

  let [emojies, setEmojies] = useState<string[]>([]);

  useEffect(() => {
    const userBlocked = user?.blocked?.filter(
      (item) => partner?._id === item._id
    );

    const partnerBlocked = partner?.blocked?.filter((id) => user?._id === id);

    if (userBlocked && userBlocked?.length !== 0) {
      setIsUserBlocked(true);
      setIsPartnerBlocked(false);
      dispatch(onBlockedStatusChange("blocked"));
    } else if (partnerBlocked && partnerBlocked?.length !== 0) {
      setIsUserBlocked(false);
      setIsPartnerBlocked(true);
      dispatch(onBlockedStatusChange("blocked"));
    } else {
      setIsUserBlocked(false);
      setIsPartnerBlocked(false);
      dispatch(onBlockedStatusChange("unBlocked"));
    }
  }, [user, partner, dispatch]);

  useEffect(() => {
    if (blockedStatus === "blocked") {
      setIsUserBlocked(true);
      setIsPartnerBlocked(false);
    } else if (conversation?.isGroup) {
      setIsUserBlocked(false);
      setIsPartnerBlocked(false);
    } else {
      setIsUserBlocked(false);
      setIsPartnerBlocked(false);
    }
  }, [blockedStatus, conversation, isPartnerBlocked]);

  const handleSendMessage = () => {
    if (msg) {
      dispatch(
        sendMsg({
          consId: conversation?._id,
          partnerId: partnerId,
          message: msg,
        })
      );
      setMsg("");
    }
  };

  const handleSelectEmoji = (value: Emoji) => {
    emojies = [...emojies, value.native];

    setEmojies(emojies);

    setMsg(emojies.join(""));

    setOpenEmoji(false);
  };

  const handleMsgChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value);

    setEmojies(e.target.value.split(" "));
  };

  const handleSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event) {
      const newFile = event.target.files![0];

      setFiles([...files, newFile]);
    }
  };

  const handleOpenImg = (value: File) => {
    setIsOpen(!isOpen);

    setImg(URL.createObjectURL(value));
  };

  const handleDeleteFile = (item: File) => {
    const file = files.find((val) => val.name === item.name);

    const newFiles = files.filter((val) => val.name !== file?.name);

    setFiles(newFiles);
  };

  const editContact = (type: EditContactType) => {
    dispatch(handleEditContact(partner!._id!, type));
  };

  return (
    <div
      className={`chat-input-section w-full flex items-center justify-between ${
        mode === "dark" ? "dark" : ""
      } ${files.length !== 0 ? "files" : ""}`}
    >
      {isUserBlocked || isPartnerBlocked ? (
        <div className="w-full h-full bg-blue-400">
          <p className="text-center text-white p-2">
            {isPartnerBlocked
              ? "You can't reply to this conversation"
              : "You have blocked this user 🤧"}

            {isUserBlocked ? (
              <Button
                onClick={() => editContact("block")}
                className="block-button"
              >
                Unblock
              </Button>
            ) : null}
          </p>
        </div>
      ) : (
        <>
          <TextField
            id="outlined-basic"
            type="text"
            variant="outlined"
            label={t("Enter Message")}
            placeholder="Your Message..."
            className="textfield"
            autoComplete="off"
            value={msg}
            disabled={fetching.isConversation ? true : false}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleMsgChange(e)
            }
            sx={{
              ".MuiOutlinedInput-root": {
                pb: files.length !== 0 ? "1rem" : 0,
                px: files.length !== 0 ? "1rem" : 0,
                flexDirection: "column",
                alignItems: "flex-start",
              },
            }}
            InputProps={{
              endAdornment:
                files.length === 0 ? null : (
                  <FileList
                    files={files}
                    openImage={handleOpenImg}
                    deleteFile={handleDeleteFile}
                  />
                ),
            }}
          />

          <SectionTool
            files={files}
            msg={msg}
            openEmoji={openEmoji}
            setOpenEmoji={setOpenEmoji}
            selectEmoji={handleSelectEmoji}
            selectFile={handleSelectFile}
            sendMsg={handleSendMessage}
          />

          <CustomModal
            styles={{ backgroundColor: "none", boxShadow: "none" }}
            isOpen={isOpen}
            onClose={setIsOpen}
          >
            <div className="w-[800px] h-[550px] relative">
              <img
                className="rounded-2xl w-full h-full object-contain"
                src={img}
                alt=""
              />

              <IconButton
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  color: "#000",
                  bgcolor: "#fff",
                  ":hover": {
                    bgcolor: "#fff",
                  },
                }}
                onClick={() => setIsOpen(!isOpen)}
              >
                <ClearIcon />
              </IconButton>
            </div>
          </CustomModal>
        </>
      )}
    </div>
  );
}
