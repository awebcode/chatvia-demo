import * as React from "react";

import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";
import { Images } from "../../../../constants";
import NotFound from "../../../../components/common/NotFound/NotFound";
import { UserProfile } from "../../../../models";

export interface IAddUserProps {
  users: UserProfile[];
  members: UserProfile[];

  findFriend: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectFriend: (friend: UserProfile) => void;
}

export function AddUser({
  users,
  members,
  findFriend,
  selectFriend,
}: IAddUserProps) {
  console.log("🚀 ~ file: AddUser.tsx:32 ~ users:", users);
  return (
    <div className="p-4">
      <TextField
        placeholder="Nguyen Van A..."
        label="Search User"
        fullWidth
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => findFriend(e)}
      />

      <div className="flex">
        {users?.length === 0 ? (
          <NotFound
            title="You have no friend to add to this group😢"
            icon={Images.whatever}
          />
        ) : (
          users?.map((item, key) => {
            return (
              <div
                key={key}
                className="flex items-center flex-col p-4 relative"
              >
                <IconButton
                  sx={{
                    position: "absolute",
                    width: "1.2rem",
                    height: "1.2rem",
                    right: "2.2rem",
                    top: "0.6rem",
                    background: "#fff",

                    ":hover": {
                      background: "#fff",
                    },
                  }}
                  onClick={() => selectFriend(item)}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>

                <div className="w-12 h-12">
                  <img
                    className="h-full w-full object-cover rounded-full"
                    src={item.avatar}
                    alt=""
                  />
                </div>
                <p className="w-1/2 truncate">{item.username}</p>
              </div>
            );
          })
        )}
      </div>

      <div className="h-[300px] overflow-auto">
        {members.map((friend, key) => {
          return (
            <Paper
              elevation={5}
              sx={{ backgroundColor: "transparent", margin: "0.5rem 0" }}
              key={key}
            >
              <FormControlLabel
                value="start"
                control={<Checkbox sx={{ ml: "15rem" }} />}
                sx={{ color: "#fff", py: "0.5rem" }}
                label={
                  <div className="flex justify-between items-center py-3">
                    <div className="w-12 h-10">
                      <img
                        className="w-full h-full object-cover rounded-full"
                        src={friend.avatar ? friend.avatar : Images.avatar1}
                        alt={friend.username}
                      />
                    </div>

                    <p className="w-full px-3"> {friend.username} </p>
                  </div>
                }
                labelPlacement="start"
                onChange={() => selectFriend(friend)}
              />

              <Divider />
            </Paper>
          );
        })}
      </div>

      <Button className="w-full" color="info" variant="contained">
        Add User
      </Button>
    </div>
  );
}
