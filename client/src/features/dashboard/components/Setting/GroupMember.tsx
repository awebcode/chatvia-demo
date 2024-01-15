import { Group, SettingModal } from "../../../../models";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { IconButton } from "@mui/material";
import { Images } from "../../../../constants";
import { selectConversations } from "../../dashboardSlice";
import { useAppSelector } from "../../../../app/store";

export interface IGroupMemberProps {
  groupInfo: Group;
  openModal: (open: boolean, type: SettingModal, modalName?: string) => void;
}

export function GroupMember({ groupInfo, openModal }: IGroupMemberProps) {
  const conversation = useAppSelector(selectConversations);

  return (
    <div className="flex items-center justify-between p-4">
      <div className="w-6 h-6">
        <img
          className="w-full h-full object-cover rounded-full"
          src={groupInfo?.avatar ? groupInfo.avatar : Images.avatar1}
          alt=""
        />
      </div>

      <div className="flex flex-col text-sm">
        <h2 className="w-full font-semibold">
          {groupInfo?.members?.length} chat members{" "}
        </h2>
        <div className="w-40 flex flex-row truncate">
          {conversation?.participant.map((user, key) => {
            return <p key={key}> {user.username}, &nbsp; </p>;
          })}
        </div>
      </div>

      <div className="" onClick={() => openModal(true, "members", "members")}>
        <IconButton>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
}
