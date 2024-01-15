import "./Loader.scss";

import * as React from "react";

export interface ILoaderProps {
  style?: React.CSSProperties;

  dotsStyle?: React.CSSProperties;
}

export function Loader({ style, dotsStyle }: ILoaderProps) {
  return (
    <div className="load" style={style}>
      <div style={dotsStyle} className="progress"></div>
      <div style={dotsStyle} className="progress"></div>
      <div style={dotsStyle} className="progress"></div>
    </div>
  );
}
