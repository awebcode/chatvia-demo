import * as React from "react";

import DownloadIcon from "@mui/icons-material/Download";
import { File } from "../../../../models";
import { IconButton } from "@mui/material";
import { Images } from "../../../../constants";

export interface IFileProps {
  file: File;

  style?: React.CSSProperties;
}

export function FileItem({ file, style }: IFileProps) {
  return (
    <div
      style={style}
      className="w-4/5 flex justify-between py-2 px-2 mb-4 hover-gray rounded-lg"
      // onClick={() => handleSelectImage(user.avatar!)}
    >
      <div className="w-[30px] mr-1 h-10 bg-gray-300 flex-center rounded-lg">
        <img
          className="w-2/5 h-full object-contain rounded-xl"
          src={Images.document}
          alt={file.name}
        />
      </div>

      <div className="w-4/5 flex flex-col justify-between ">
        <p className="font-bold w-full truncate text-xs">{file.name}</p>

        <div className="w-full flex justify-between text-xs font-semibold text-gray-400">
          <p> {file.length}MB </p>
          <p> {file.date} </p>
        </div>
      </div>

      <div className="h-full ">
        <a href={Images.attachments} download="Attachment.png">
          <IconButton>
            <DownloadIcon />
          </IconButton>
        </a>
      </div>
    </div>
  );
}
