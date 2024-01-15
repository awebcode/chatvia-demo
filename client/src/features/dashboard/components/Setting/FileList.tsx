import { FileItem } from "./FileItem";
import { files } from "../../../../mock";

export interface IFileListProps {}

export function FileList() {
  return (
    <div className="py-4 px-2">
      <div className="flex items-center flex-col cursor-pointer">
        {files.slice(0, 3).map((file, key) => {
          return <FileItem key={key} file={file} />;
        })}
      </div>
    </div>
  );
}
