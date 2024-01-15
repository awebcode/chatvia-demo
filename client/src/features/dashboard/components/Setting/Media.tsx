import { SettingModal } from "../../../../models";
import { friendRequests } from "../../../../mock";

export interface IMediaProps {
  openModal: (open: boolean, type: SettingModal, modalName?: string) => void;
  handleSelectImage: (image: string) => void;
}

export function Media({ openModal, handleSelectImage }: IMediaProps) {
  return (
    <div className="p-4">
      <div className="flex justify-between w-full mb-2">
        <h3 className="capitalize font-bold">media</h3>

        <button
          className="text-blue-400 capitalize"
          onClick={() => openModal(true, "imagesList", "images")}
        >
          see all
        </button>
      </div>

      <div className="flex justify-between ">
        {friendRequests.slice(0, 3).map((user, key) => {
          return (
            <div
              key={key}
              className="w-20 h-20 px-1 cursor-pointer"
              onClick={() => handleSelectImage(user.avatar!)}
            >
              <img
                className="w-full h-full object-contain rounded-xl"
                src={user.avatar}
                alt={user.username}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
