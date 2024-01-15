import * as React from "react";

import { Button, CircularProgress, IconButton } from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";
import CustomModal from "../../../../components/common/Modal/Modal";
import { Images } from "../../../../constants";
import { InputField } from "../../../../components/common/InputField/InputField";
import NotFound from "../../../../components/common/NotFound/NotFound";
import { RequestItem } from "../Request/RequestItem";
import { UserProfile } from "../../../../models";
import { handleSendInvitation } from "../../../dashboard/dashboardThunk";
import { useAppDispatch } from "../../../../app/store";

export interface IAddContactProps {
  setIsOpen: (value: boolean) => void;

  isOpen: boolean;

  userList: UserProfile[];
}

export function AddContact({ userList, setIsOpen, isOpen }: IAddContactProps) {
  const dispatch = useAppDispatch();

  const [email, setEmail] = React.useState<string | undefined>("");
  const [message, setMessage] = React.useState("");
  const [isSelected, setIsSelected] = React.useState<UserProfile | null>(null);
  const [fetchingUsersList, setFetchingUsersList] = React.useState(false);

  let [usersList, setUsersList] = React.useState<UserProfile[]>([]);

  React.useEffect(() => {
    handleFindUser();

    if (!isOpen) {
      setEmail("");
    }
  }, [email, isOpen]);

  const handleSelectUser = (user: UserProfile) => {
    const index = userList.find((item) => item._id === user._id);

    setEmail(index!.email!);
    setIsSelected(user);
  };

  const handleFindUser = () => {
    let timer;

    setFetchingUsersList(true);

    const findUser = userList.filter((user) => user.email?.includes(email!));

    clearTimeout(timer);

    timer = setTimeout(() => {
      if (!email) {
        setFetchingUsersList(false);
        setUsersList([]);
      } else {
        setFetchingUsersList(false);

        usersList = findUser;

        setUsersList(usersList);
      }
    }, 1000);
  };

  return (
    <CustomModal
      styles={{
        width: "31rem",
      }}
      isOpen={isOpen}
      onClose={setIsOpen}
    >
      <div className="modal-header flex justify-between items-center p-4">
        <h5 className="font-semibold capitalize"> add contact </h5>
        <IconButton onClick={() => setIsOpen(false)}>
          <ClearIcon />
        </IconButton>
      </div>

      <div className="modal-body p-6">
        <InputField
          value={email}
          className="mb-4"
          autoFocus={false}
          type="email"
          label="Enter Email"
          name="email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />

        <InputField
          className="mb-4"
          autoFocus={false}
          value={message}
          type="text"
          label="Enter Message"
          name="message"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMessage(e.target.value)
          }
        />

        {fetchingUsersList ? (
          <div className="w-full flex justify-center">
            <CircularProgress />
          </div>
        ) : usersList.length === 0 ? (
          <NotFound
            icon={Images.noresult}
            title="Please enter your friend email 🤔"
          />
        ) : (
          <div className="w-full h-[110px] overflow-auto">
            {usersList.map((user, key) => {
              return (
                <RequestItem
                  key={key}
                  user={user}
                  status="send"
                  onClick={handleSelectUser}
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
            onClick={() => dispatch(handleSendInvitation(isSelected!._id!))}
            type="button"
            variant="contained"
            disabled={!email}
          >
            add this contact
          </Button>
        </div>
      </div>
    </CustomModal>
  );
}
