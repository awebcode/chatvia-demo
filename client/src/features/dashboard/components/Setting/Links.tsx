import { Images } from "../../../../constants";
import { SettingModal } from "../../../../models";
import { files } from "../../../../mock";

export interface ILinksProps {
  openModal: (open: boolean, type: SettingModal, modalName?: string) => void;
}

export function Links({ openModal }: ILinksProps) {
  return (
    <div className="p-4">
      <div className="flex justify-between w-full mb-2">
        <h3 className="capitalize font-bold">links</h3>

        <button
          className="text-blue-400 capitalize"
          onClick={() => openModal(true, "links", "links")}
        >
          see all
        </button>
      </div>

      <div className="flex justify-between flex-col">
        {files.slice(0, 3).map((file, key) => {
          return (
            <div
              key={key}
              className="w-full flex justify-between py-2 cursor-pointer hover-gray rounded-lg"
              // onClick={() => handleSelectImage(user.avatar!)}
            >
              <div className="w-[30px] h-10 bg-gray-300 flex-center rounded-lg">
                <img
                  className="w-2/5 h-full object-contain rounded-xl"
                  src={Images.attachments}
                  alt={file.name}
                />
              </div>

              <div className="content w-4/5 flex flex-col justify-between">
                <p className="font-bold w-full truncate text-xs">{file.name}</p>

                <div className="w-full flex justify-between text-xs font-semibold text-gray-400">
                  <p> {file.length} </p>
                  <p> {file.date} </p>
                </div>
              </div>p
            </div>
          );
        })}
      </div>
    </div>
  );
}
