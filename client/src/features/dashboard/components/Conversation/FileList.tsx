import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

export interface IFileListProps {
  files: File[];

  openImage: (value: File) => void;
  deleteFile: (value: File) => void;
}

export function FileList({ files, deleteFile, openImage }: IFileListProps) {
  return (
    <div className="flex w-full overflow-x-auto">
      {files.map((item, key) => {
        return !item ? null : (
          <div
            key={key}
            className="relative mr-4 w-20 h-20 flex justify-center items-center border-4 border-current rounded-lg"
          >
            <div className="absolute z-10 right-0 top-0">
              <IconButton
                sx={{
                  background: "#fff",
                  width: "1.2rem",
                  height: "1.2rem",
                  ":hover": {
                    background: "#fff",
                  },
                }}
                onClick={() => deleteFile(item)}
              >
                <CloseIcon
                  fontSize="small"
                  sx={{
                    width: "1rem",
                    height: "1rem",
                    color: "#000",
                  }}
                />
              </IconButton>
            </div>
            <div
              onClick={() => openImage(item)}
              className="w-full h-full cursor-pointer"
            >
              <img
                src={item ? URL.createObjectURL(item) : ""}
                alt={item ? item.name : ""}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
