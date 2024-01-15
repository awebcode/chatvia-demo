import { AlphabetItem } from "./AlphabetItem";
import { BaseItemLoader } from "../../../../components/common/Loader/BaseItemLoader";
import { Images } from "../../../../constants";
import NotFound from "../../../../components/common/NotFound/NotFound";
import { UserProfile } from "../../../../models";
import { selectFetching } from "../../dashboardSlice";
import { selectUser } from "../../../auth/authSlice";
import { useAppSelector } from "../../../../app/store";

export interface ContactListProps {
  userList: UserProfile[];
}

export function ContactList({ userList }: ContactListProps) {
  const fetching = useAppSelector(selectFetching);
  const user = useAppSelector(selectUser);

  const itemsByLetter: UserProfile = {};

  user?.friends?.forEach((item) => {
    const firstLetter = item.username?.charAt(0).toUpperCase();
    if (!itemsByLetter[firstLetter!]) {
      itemsByLetter[firstLetter!] = [];
    }
    itemsByLetter[firstLetter!].push(item);
  });

  return (
    <div className="contacts w-full h-[500px] overflow-auto">
      {user?.friends?.length === 0 ? (
        <div className="w-full h-full ">
          <NotFound title="You don't have any friends!!" icon={Images.users} />
        </div>
      ) : (
        <div className="contact-item">
          {fetching.isContact ? (
            <BaseItemLoader listToRender={5} />
          ) : (
            <AlphabetItem userList={userList} itemsByLetter={itemsByLetter} />
          )}
        </div>
      )}
    </div>
  );
}
