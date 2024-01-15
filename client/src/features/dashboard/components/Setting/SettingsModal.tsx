import * as React from "react";

import { SettingModal, UserProfile } from "../../../../models";

import { AddUser } from "./AddUser";
import ClearIcon from "@mui/icons-material/Clear";
import CustomModal from "../../../../components/common/Modal/Modal";
import { FileList } from "./FileList";
import { IconButton } from "@mui/material";
import { ImageList } from "../Conversation/ImageList";
import { LinksModal } from "./LinksModal";
import { Member } from "../Conversation/Member";
import { selectGroupInfo } from "../../dashboardSlice";
import { selectUser } from "../../../auth/authSlice";
import { useAppSelector } from "../../../../app/store";

export interface ISettingsModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;

  type: SettingModal;

  image?: string;
  modalName: string;
}

export function SettingsModal({
  open,
  setOpen,
  type,
  image,
  modalName,
}: ISettingsModalProps) {
  const groupInfo = useAppSelector(selectGroupInfo);
  const user = useAppSelector(selectUser);

  const [users, setUsers] = React.useState<UserProfile[]>([]);
  const [members, setMembers] = React.useState<UserProfile[]>([]);

  React.useEffect(() => {
    groupInfo?.members?.forEach((item) => {
      const { member } = item;

      const newMember = user?.friends?.filter((friend) => {
        return friend._id === member;
      });

      setMembers(newMember!);
    });
  }, [groupInfo, user]);

  React.useEffect(() => {
    if (user) {
      if (user.friends) {
        setUsers(user.friends);
      }
    }
  }, [user]);

  const findFriend = (e: React.ChangeEvent<HTMLInputElement>) => {
    const friend = user?.friends?.filter((friend) =>
      friend.username?.includes(e.target.value)
    );

    setUsers(friend!);
  };

  const selectFriend = (friend: UserProfile) => {
    const findFriend = users?.filter((item) => item._id === friend._id);

    if (findFriend?.length !== 0) {
      const deleteFriend = users?.filter((item) => item._id !== friend._id);

      setUsers(deleteFriend);
    } else {
      const newFriend = [...users, friend];

      setUsers(newFriend);
    }
  };

  return (
    <>
      <CustomModal
        styles={{ width: "500px", position: "relative" }}
        isOpen={open}
        onClose={() => setOpen(!open)}
      >
        <h2 className="w-full text-center p-4 text-white capitalize">
          {modalName}
        </h2>

        <IconButton
          sx={{ position: "absolute", top: "0.5rem", right: "1rem" }}
          onClick={() => setOpen(!open)}
        >
          <ClearIcon />
        </IconButton>

        {type === "members" ? (
          <Member />
        ) : type === "imagesList" ? (
          <ImageList />
        ) : type === "image" ? (
          <div className="w-[500px] h-[500px]">
            <img className="w-full h-full object-cover" src={image} alt="" />
          </div>
        ) : type === "files" ? (
          <FileList />
        ) : type === "links" ? (
          <LinksModal />
        ) : (
          <AddUser
            findFriend={findFriend}
            selectFriend={selectFriend}
            members={members}
            users={users}
          />
        )}
      </CustomModal>
    </>
  );
}
