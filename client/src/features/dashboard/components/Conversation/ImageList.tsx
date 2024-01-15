import { images } from "../../../../mock";

export interface IImageListProps {}

export function ImageList() {
  return (
    <div className="flex flex-wrap px-4 h-[300px] overflow-auto">
      {images.map((img, key) => {
        return (
          <div key={key} className="w-28 h-28 mb-4 p-2 cursor-pointer">
            <img
              className="w-full h-full object-contain rounded-xl"
              src={img.image}
              alt=""
            />
          </div>
        );
      })}
    </div>
  );
}
