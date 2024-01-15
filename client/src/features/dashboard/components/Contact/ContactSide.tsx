import * as React from "react";

import { useAppDispatch, useAppSelector } from "../../../../app/store";

import { AddContact } from "./AddContact";
import { ContactList } from "./ContactList";
import { IconButton } from "@mui/material";
import { InputField } from "../../../../components/common/InputField/InputField";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import { SideWrapper } from "../SideWrapper";
import { UserProfile } from "../../../../models";
import { handleGetAllUser } from "../../../auth/authThunk";
import { selectMode } from "../../dashboardSlice";
import { selectUserList } from "../../../auth/authSlice";

export interface IContactSideProps {
  friendId: string;
}

export function ContactSide() {
  const dispatch = useAppDispatch();
  const userList = useAppSelector(selectUserList);
  const mode = useAppSelector(selectMode);

  const [isOpen, setIsOpen] = React.useState(false);
  const [users, setUsers] = React.useState<UserProfile[]>([]);

  React.useEffect(() => {
    dispatch(handleGetAllUser());
  }, [dispatch]);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const contact = userList.filter((user) =>
      user.username?.includes(e.target.value)
    );

    if (!e.target.value) {
      setUsers([]);
    } else {
      setUsers(contact);
    }
  };

  return (
    <SideWrapper
      title="contacts"
      icon={
        <IconButton
          style={{ color: mode === "dark" ? "#93a7cc" : "" }}
          onClick={() => setIsOpen(true)}
        >
          <PersonAddIcon />
        </IconButton>
      }
      header={
        <InputField
          onChange={handleFieldChange}
          type="email"
          label="Find users"
          prependIcon={<SearchIcon />}
          autoFocus={false}
        />
      }
    >
      <AddContact isOpen={isOpen} setIsOpen={setIsOpen} userList={userList} />

      <ContactList userList={users} />
    </SideWrapper>
  );
}
