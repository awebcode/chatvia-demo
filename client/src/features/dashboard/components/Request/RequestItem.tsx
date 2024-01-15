import "./Request.scss";

import { Avatar, Card } from "@mui/material";
import { selectMode, selectSubmit } from "../../dashboardSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/store";

import LoadingButton from "@mui/lab/LoadingButton";
import { UserProfile } from "../../../../models";
import { handleUpdateRequest } from "../../dashboardThunk";
import { useTranslation } from "react-i18next";

export interface IRequestItemProps {
  user: UserProfile;

  status: "send" | "receive";

  onClick?: (user: UserProfile) => void;

  requestId?: string;
}

export function RequestItem({
  user,
  status,
  onClick,
  requestId,
}: IRequestItemProps) {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(selectMode);
  const { t } = useTranslation();
  const submitting = useAppSelector(selectSubmit);

  const handleChooseItem = (user: UserProfile) => {
    if (onClick) {
      onClick(user);
    }
  };

  const onUpdateRequestStt = (status: "accepted" | "deny") => {
    dispatch(handleUpdateRequest(requestId!, status));
  };

  return (
    <Card
      className={`request-wrapper cursor-pointer ${
        mode === "dark" ? "dark" : ""
      }`}
    >
      <div
        onClick={() => handleChooseItem(user)}
        className="w-full p-4 flex justify-between items-center"
      >
        <div className="w-20 h-16">
          <Avatar
            sx={{ width: "100%", height: "100%", objectFit: "contain" }}
            src={user.avatar}
            alt="avt"
          />
        </div>

        <div className="w-full px-4 ">
          <div className="w-full py-2 flex justify-between">
            <h5 className="truncate  font-semibold">{user.username}</h5>{" "}
            {status === "receive" && <h5 className="text-gray-400">11:30pm</h5>}
          </div>

          {status === "receive" && (
            <div className="w-full">
              <LoadingButton
                onClick={() => onUpdateRequestStt("accepted")}
                className="w-2/5"
                size="small"
                variant="contained"
                loading={submitting.isAccepting}
                disabled={
                  submitting.isAccepting || submitting.isDenying ? true : false
                }
              >
                {t("Accept")}
              </LoadingButton>

              <LoadingButton
                className="w-2/5"
                size="small"
                sx={{ ml: "1rem" }}
                color="error"
                variant="outlined"
                onClick={() => onUpdateRequestStt("deny")}
                loading={submitting.isDenying}
                disabled={
                  submitting.isAccepting || submitting.isDenying ? true : false
                }
              >
                {t("Deny")}
              </LoadingButton>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
