import { Avatar, Skeleton } from "@mui/material";

export interface IChatItemLoaderProps {
  listToRender: number;
}

export function ChatItemLoader({ listToRender }: IChatItemLoaderProps) {
  const loader = new Array(listToRender).fill(null);

  return (
    <>
      {loader.map((_items, key) => {
        return (
          <div key={key} className="relative w-full flex items-end p-2">
            <div className="relative">
              <Skeleton animation="wave" variant="circular">
                <Avatar />
              </Skeleton>
            </div>

            <div className="ml-4">
              <Skeleton
                animation="wave"
                variant="rounded"
                width={500}
                height={50}
              />
              <Skeleton
                animation="wave"
                sx={{ mt: "1rem" }}
                variant="rounded"
                width={100}
                height={10}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}
