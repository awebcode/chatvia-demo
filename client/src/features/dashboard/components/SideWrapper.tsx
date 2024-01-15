import "./Side.scss";

import * as React from "react";

import { selectMode } from "../dashboardSlice";
import { useAppSelector } from "../../../app/store";
import { useTranslation } from "react-i18next";

export interface ISidesProps {
  title: string;
  className?: string;

  icon?: React.ReactNode;
  header?: React.ReactNode;
  children?: React.ReactNode;

  style?: React.CSSProperties;
}

export function SideWrapper({
  title,
  icon,
  children,
  header,
  className,
  style,
}: ISidesProps) {
  const mode = useAppSelector(selectMode);
  const { t } = useTranslation();

  return (
    <div
      style={style}
      className={`side-info ${className} ${mode === "dark" ? "dark" : ""} `}
    >
      <div className="side-header">
        <h4 className="mb-4 font-semibold flex justify-between">
          {" "}
          {t(title)} {icon}{" "}
        </h4>

        {header}
      </div>

      <div
        style={{ color: mode === "dark" ? "#93a7cc" : "" }}
        className="side-content"
      >
        {children}
      </div>
    </div>
  );
}
