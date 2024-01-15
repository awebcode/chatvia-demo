import { handleEditContact, leaveGroup } from "../../dashboardThunk";
import {
  onSubmitting,
  selectBlockedStatus,
  selectGroupInfo,
  selectPartner,
  selectSubmit,
} from "../../dashboardSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/store";

import { Divider } from "@mui/material";
import Files from "./File";
import { GroupMember } from "./GroupMember";
import { Information } from "./Information";
import { Links } from "./Links";
import LoadingButton from "@mui/lab/LoadingButton";
import LogoutIcon from "@mui/icons-material/Logout";
import { Media } from "./Media";
import { SettingModal } from "../../../../models";
import { SettingsModal } from "./SettingsModal";
import { useState } from "react";

export function Settings() {
  const dispatch = useAppDispatch();
  const groupInfo = useAppSelector(selectGroupInfo);
  const partner = useAppSelector(selectPartner);
  const submitStatus = useAppSelector(selectSubmit);
  const blockStatus = useAppSelector(selectBlockedStatus);

  const [modalName, setModalName] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<SettingModal>("addUser");

  const openModal = (open: boolean, type: SettingModal, modalName?: string) => {
    setIsOpen(open);

    setModalType(type);

    setModalName(modalName!);
  };
  const [img, setImg] = useState<string>("");

  const handleSelectImage = (image: string) => {
    setImg(image);

    openModal(true, "image");
  };

  const editContact = (type: "block" | "leave") => {
    dispatch(onSubmitting({ type: "isBlocking", status: true }));

    if (type === "block") {
      dispatch(handleEditContact(partner!._id!, "block"));
    } else {
      dispatch(leaveGroup(groupInfo!._id!));
    }
  };

  return (
    <div>
      <Information
        openModal={openModal}
        partner={partner!}
        groupInfo={groupInfo!}
      />

      <Divider />

      {groupInfo && <GroupMember groupInfo={groupInfo} openModal={openModal} />}

      <Divider />

      <Media openModal={openModal} handleSelectImage={handleSelectImage} />

      <Divider />

      <Links openModal={openModal} />

      <Divider />

      <Files openModal={openModal} />

      <Divider />

      <div className="w-full flex justify-center p-4">
        <LoadingButton
          onClick={() => editContact(groupInfo ? "leave" : "block")}
          className="w-full"
          color="error"
          variant="text"
          disabled={submitStatus.isBlocking}
          loading={submitStatus.isBlocking}
        >
          <div className="w-full h-full flex justify-start capitalize">
            <LogoutIcon className="mr-2" />
            {groupInfo
              ? "leave chat"
              : blockStatus === "blocked"
              ? "unblock this user"
              : "block this user"}
          </div>
        </LoadingButton>
      </div>

      <SettingsModal
        setOpen={setIsOpen}
        open={isOpen}
        type={modalType}
        image={img!}
        modalName={modalName}
      />
    </div>
  );
}
