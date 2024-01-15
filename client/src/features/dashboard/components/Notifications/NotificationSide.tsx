import { NotifyItem } from "./NotifyItem";
import { SideWrapper } from "../SideWrapper";
import { notifications } from "../../../../mock";

export interface INotificationSideProps {}

export function NotificationSide() {
  return (
    <SideWrapper title="Notifications">
      <div className="notification">
        {notifications.map((notify, key) => {
          return <NotifyItem notify={notify} key={key} />;
        })}
      </div>
    </SideWrapper>
  );
}
