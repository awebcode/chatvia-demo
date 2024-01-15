import * as React from "react";

import { Images } from "../../../../constants";
import { Link } from "../../../../models";

export interface ILinkProps {
  link: Link;

  style?: React.CSSProperties;
}

export function LinkItem({ link }: ILinkProps) {
  return (
    <a
      href=""
      target="_blank"
      rel="noopener noreferrer"
      className="w-full flex justify-between py-2 cursor-pointer hover-gray rounded-lg"
      // onClick={() => handleSelectImage(user.avatar!)}
    >
      <div className="w-[30px] h-10 bg-gray-300 flex-center rounded-lg">
        <img
          className="w-2/5 h-full object-contain rounded-xl"
          src={Images.attachments}
          alt={link.name}
        />
      </div>

      <div className="content w-4/5 flex flex-col justify-between">
        <p className="font-bold w-full truncate text-xs">{link.name}</p>

        <div className="w-full flex justify-between text-xs font-semibold text-gray-400">
          {/* <p> {link.length} </p> */}
          <p> {link.date} </p>
        </div>
      </div>
    </a>
  );
}
