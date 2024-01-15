import "./Badge.scss";

import { selectMode } from "../../../features/dashboard/dashboardSlice";
import { useAppSelector } from "../../../app/store";

export interface IBadgeProps {
  content: string | number;
}

export function Badge({ content }: IBadgeProps) {
  const mode = useAppSelector(selectMode);

  return (
    <div
      className={`badge-container flex justify-center items-center w-6 h-6 radius-circle text-xs ${
        mode === "dark" ? "dark" : ""
      }`}
    >
      {content}
    </div>
  );
}
