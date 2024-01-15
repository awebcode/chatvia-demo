import * as React from "react";

import {
  Avatar,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  ListItem,
  Paper,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../app/store";

import ClearIcon from "@mui/icons-material/Clear";
import CustomModal from "../../../../components/common/Modal/Modal";
import { InputField } from "../../../../components/common/InputField/InputField";
import { RequestItem } from "../Request/RequestItem";
import { UserProfile } from "../../../../models";
import { handleCreateGroup } from "../../dashboardThunk";
import { selectMode } from "../../dashboardSlice";
import { selectUser } from "../../../auth/authSlice";

export interface ICreateGroupProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export function CreateGroup({ isOpen, setIsOpen }: ICreateGroupProps) {
  const user = useAppSelector(selectUser);
  const mode = useAppSelector(selectMode);
  const dispatch = useAppDispatch();

  const [fetchingUsersList, setFetchingUsersList] = React.useState(false);
  const [groupName, setGroupName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [usersList, setUsersList] = React.useState<UserProfile[]>([]);
  const [participant, setParticipant] = React.useState<UserProfile[]>([]);

  React.useEffect(() => {
    handleFindUser();
  }, [email]);

  const handleDelete = (user: UserProfile) => () => {
    setParticipant((participants) =>
      participants.filter((item) => item._id !== user._id)
    );
  };

  const handleSelectUser = (user: UserProfile) => {
    const newParticipant = [...participant, user];

    setParticipant(newParticipant);

    setEmail("");
  };

  const handleFindUser = () => {
    let timer;

    setFetchingUsersList(true);

    const findUser = user?.friends?.filter((item) =>
      item.email?.includes(email!)
    );

    clearTimeout(timer);

    timer = setTimeout(() => {
      if (!email) {
        setFetchingUsersList(false);
        setUsersList([]);
      } else {
        setFetchingUsersList(false);

        setUsersList(findUser!);
      }
    }, 1000);
  };

  const createGroup = () => {
    dispatch(
      handleCreateGroup(
        participant.map((user) => user._id!),
        groupName
      )
    );
  };

  return (
    <CustomModal
      styles={{
        width: "31rem",
        padding: "1rem 2rem",
      }}
      isOpen={isOpen}
      onClose={() => setIsOpen(!isOpen)}
    >
      <div
        className={`${
          mode === "dark" ? "text-white" : ""
        } modal-header flex justify-between items-center py-4`}
      >
        <h5 className="font-semibold capitalize"> create group </h5>
        <IconButton onClick={() => setIsOpen(false)}>
          <ClearIcon />
        </IconButton>
      </div>

      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          listStyle: "none",
          mb: "1rem",
        }}
        component="ul"
      >
        {participant.length === 0
          ? null
          : participant.map((user, key) => {
              return (
                <ListItem
                  sx={{ width: "auto", p: "0 0.3rem 0 0.3rem" }}
                  key={key}
                >
                  <Chip
                    avatar={<Avatar alt={user.username} src={user.avatar} />}
                    label={user.username}
                    variant="outlined"
                    onDelete={handleDelete(user)}
                  />
                </ListItem>
              );
            })}
      </Paper>

      <InputField
        className="mb-4"
        autoFocus={false}
        value={email}
        type="text"
        label="Enter Email"
        placeholder="Enter your friend email"
        name="message"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />

      <InputField
        className="mb-4"
        autoFocus={false}
        value={groupName}
        type="text"
        label="Enter Group Name"
        name="message"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setGroupName(e.target.value)
        }
      />

      {fetchingUsersList ? (
        <div className="w-full flex justify-center">
          <CircularProgress />
        </div>
      ) : usersList.length === 0 ? null : (
        <div className="w-full h-[110px] overflow-auto">
          {usersList.map((user, key) => {
            return (
              <RequestItem
                key={key}
                user={user}
                status="send"
                onClick={() => handleSelectUser(user)}
              />
            );
          })}
        </div>
      )}

      <div className="moda-footer p-3 w-full flex justify-end">
        <Button
          sx={{
            background: "#7269ef",
            textTransform: "capitalize",
            padding: "0.5rem 1rem",
          }}
          onClick={createGroup}
          type="button"
          variant="contained"
          disabled={participant.length === 0}
        >
          create this group
        </Button>
      </div>
    </CustomModal>
  );
}
