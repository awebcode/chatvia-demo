import { Button, Divider, IconButton } from "@mui/material";

import { Images } from "../../../../constants";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { selectConversations } from "../../dashboardSlice";
import { useAppSelector } from "../../../../app/store";

export function Member() {
  const conversation = useAppSelector(selectConversations);

  return (
    <div className="p-4">
      <div className="w-full h-[300px] overflow-auto px-10 text-white">
        {conversation?.participant.map((member, key) => {
          return (
            <div className="flex justify-between items-center py-3" key={key}>
              <div className="w-12 h-10">
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={member.avatar ? member.avatar : Images.avatar1}
                  alt={member.username}
                />
              </div>

              <p className="w-full px-3"> {member.username} </p>

              <IconButton>
                <MoreHorizIcon />
              </IconButton>

              <Divider />
            </div>
          );
        })}
      </div>

      <Button className="w-full" color="info" variant="contained">
        Add User
      </Button>
    </div>
  );
}
