import "./Request.scss";

import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Images } from "../../../../constants";
import NotFound from "../../../../components/common/NotFound/NotFound";
import { RequestItem } from "./RequestItem";
import { SideWrapper } from "../SideWrapper";
import { selectFriendRequest } from "../../dashboardSlice";
import { useAppSelector } from "../../../../app/store";

export function RequestSide() {
  const friendRequest = useAppSelector(selectFriendRequest);

  return (
    <SideWrapper title="friend request" icon={<GroupAddIcon />}>
      <div className="h-[550px] overflow-auto">
        {friendRequest.length === 0 ? (
          <NotFound
            icon={Images.users}
            title="There is no friend request for you!!"
          />
        ) : (
          friendRequest.map((req, key) => {
            return (
              <RequestItem
                requestId={req._id}
                status="receive"
                user={req.sender}
                key={key}
              />
            );
          })
        )}
      </div>
    </SideWrapper>
  );
}
