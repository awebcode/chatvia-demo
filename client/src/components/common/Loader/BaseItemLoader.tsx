import { Avatar, Skeleton } from "@mui/material";

export interface IBaseItemLoaderProps {
  listToRender: number;
}

export function BaseItemLoader({ listToRender }: IBaseItemLoaderProps) {
  const loader = new Array(listToRender).fill(null);

  return (
    <>
      {loader.map((_item, index) => {
        return (
          <div className="p-3 w-full flex items-center" key={index}>
            <Skeleton variant="circular">
              <Avatar />
            </Skeleton>

            <div className="ml-4">
              <Skeleton variant="rounded" width={210} height={30} />
            </div>
          </div>
        );
      })}
    </>
  );
}
