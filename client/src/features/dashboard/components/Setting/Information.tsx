import { Group, SettingModal, UserProfile } from "../../../../models";

import { IconButton } from "@mui/material";
import { Images } from "../../../../constants";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export interface IInformationProps {
  groupInfo: Group;
  partner: UserProfile;

  openModal: (open: boolean, type: SettingModal, modalName?: string) => void;
}

export function Information({
  groupInfo,
  openModal,
  partner,
}: IInformationProps) {
  return (
    <div className="flex justify-center items-center flex-col p-4">
      <div className="w-24 h-24 mb-4">
        <img
          className="w-full h-full object-contain rounded-full"
          src={
            groupInfo && groupInfo?.avatar
              ? groupInfo.avatar
              : partner && partner.avatar
              ? partner.avatar
              : Images.avatar1
          }
          alt=""
        />
      </div>

      <h2 className="font-semibold mb-4">
        {" "}
        {groupInfo ? groupInfo?.name : partner?.username}{" "}
      </h2>

      <div className="flex w-full justify-between px-10">
        {groupInfo && (
          <div className="capitalize flex flex-col font-semibold items-center">
            <IconButton onClick={() => openModal(true, "addUser", "add user")}>
              <PersonAddIcon />
            </IconButton>
            add
          </div>
        )}

        <div className="capitalize flex flex-col font-semibold items-center mx-auto">
          <IconButton>
            <NotificationsOffIcon />
          </IconButton>
          mute
        </div>
      </div>

      {/* <div className="flex w-full justify-between px-10">
          <div className="capitalize flex flex-col font-semibold items-center">
            <IconButton>
              <NotificationsOffIcon />
            </IconButton>
            mute
          </div>
        </div> */}
    </div>
  );
}
