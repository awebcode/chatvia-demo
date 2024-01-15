import "../Side.scss";

import * as React from "react";

import { selectGroupList, selectMode } from "../../dashboardSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/store";

import { Conversation } from "../../../../models";
import { CreateGroup } from "./CreateGroup";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { GroupList } from "./GroupList";
import { IconButton } from "@mui/material";
import { InputField } from "../../../../components/common/InputField/InputField";
import SearchIcon from "@mui/icons-material/Search";
import { SideWrapper } from "../SideWrapper";
import { handleGetAllUser } from "../../../auth/authThunk";

export function GroupSide() {
  const mode = useAppSelector(selectMode);
  const groupList = useAppSelector(selectGroupList);

  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = React.useState(false);
  const [groups, setGroups] = React.useState<Conversation[]>([]);

  React.useEffect(() => {
    dispatch(handleGetAllUser());
  }, [dispatch]);

  React.useEffect(() => {
    setGroups(groupList);
  }, [groupList]);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGroup = groupList.filter((gr) =>
      gr.groupName.includes(e.target.value)
    );

    setGroups(newGroup);
  };

  return (
    <SideWrapper
      title="groups"
      icon={
        <IconButton
          style={{ color: mode === "dark" ? "#93a7cc" : "" }}
          onClick={() => setIsOpen(true)}
        >
          <GroupAddIcon />
        </IconButton>
      }
      header={
        <InputField
          onChange={handleFieldChange}
          type="email"
          label="Find groups"
          prependIcon={<SearchIcon />}
          autoFocus={false}
        />
      }
    >
      <GroupList groupList={groups} />

      <CreateGroup isOpen={isOpen} setIsOpen={setIsOpen} />
    </SideWrapper>
  );
}
