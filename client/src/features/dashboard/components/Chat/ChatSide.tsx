import "./Chat.scss";

import {
  onSelectedPartner,
  selectFetching,
  selectMode,
  selectRecentList,
} from "../../dashboardSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/store";

import { BaseItemLoader } from "../../../../components/common/Loader/BaseItemLoader";
import { Carousel } from "../../../../components/common/Carousel/Carousel";
import ChatIcon from "@mui/icons-material/Chat";
import { Images } from "../../../../constants";
import { InputField } from "../../../../components/common/InputField/InputField";
import { Messages } from "../../../../mock";
import NotFound from "../../../../components/common/NotFound/NotFound";
import { RecentChatItem } from "./RecentChatItem";
import SearchIcon from "@mui/icons-material/Search";
import { SideWrapper } from "../SideWrapper";
import { selectUser } from "../../../auth/authSlice";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function ChatSide() {
  const dispatch = useAppDispatch();
  const fetching = useAppSelector(selectFetching);
  const mode = useAppSelector(selectMode);
  const recentList = useAppSelector(selectRecentList);
  const user = useAppSelector(selectUser);
  const { t } = useTranslation();

  const [isSelected, setIsSelected] = useState("");

  const handleFieldChange = (value: React.ChangeEvent<HTMLInputElement>) => {
    console.log(
      "🚀 ~ file: ChatSide.tsx:12 ~ handleFieldChange ~ value:",
      value
    );
  };

  const onItemChange = (id: string, partnerId: string) => {
    setIsSelected(id);

    dispatch(onSelectedPartner(String(partnerId)));
  };

  return (
    <SideWrapper
      title="chats"
      icon={<ChatIcon />}
      header={
        <InputField
          onChange={handleFieldChange}
          type="email"
          label="Find users"
          prependIcon={
            <SearchIcon sx={{ color: mode === "dark" ? "#93a7cc" : "" }} />
          }
          autoFocus={false}
        />
      }
    >
      {Messages.length !== 0 && (
        <div className="chat-user-onine mb-3">
          <Carousel isFetching={fetching.isFriendList} option={user?.friends} />
        </div>
      )}

      <div className="chat-recent w-full">
        <h5
          className={`mb-4 font-semibold ${
            mode === "dark" ? "text-white" : ""
          }`}
        >
          {t("Recent")}
        </h5>

        <div className="chat-recent-list overflow-auto py-2 w-full">
          {fetching.isRecentList ? (
            <BaseItemLoader listToRender={4} />
          ) : recentList?.length === 0 ? (
            <NotFound
              icon={Images.conversation}
              title="You don't have any conversation recently!!"
            />
          ) : (
            recentList?.map((msg, key) => {
              return (
                <RecentChatItem
                  onClick={onItemChange}
                  isSelected={msg._id === isSelected}
                  key={key}
                  message={msg.messages}
                />
              );
            })
          )}
        </div>
      </div>
    </SideWrapper>
  );
}
