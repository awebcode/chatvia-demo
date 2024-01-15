import { FileItem } from "./FileItem";
import { SettingModal } from "../../../../models";
import { files } from "../../../../mock";

export interface IFilesProps {
  openModal: (open: boolean, type: SettingModal, modalName?: string) => void;
}

export default function Files({ openModal }: IFilesProps) {
  return (
    <div className="p-4">
      <div className="flex justify-between w-full mb-2">
        <h3 className="capitalize font-bold">files</h3>

        <button
          className="text-blue-400 capitalize"
          onClick={() => openModal(true, "files", "files")}
        >
          see all
        </button>
      </div>

      <div className="flex justify-between flex-col cursor-pointer">
        {files.slice(0, 3).map((file, key) => {
          return <FileItem key={key} file={file} />;
        })}
      </div>
    </div>
  );
}
