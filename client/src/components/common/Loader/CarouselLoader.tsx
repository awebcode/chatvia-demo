import { Avatar, Skeleton } from "@mui/material";

export interface ICarouselItemLoaderProps {
  isFetching: boolean;
}

export function CarouselItemLoader({ isFetching }: ICarouselItemLoaderProps) {
  return (
    <div
      className={`carousel-item relative rounded-2xl flex-center p-2 flex-col w-[80px] h-[60px] ${
        isFetching ? "bg-none" : ""
      }`}
      // style={{ background: mode === "dark" ? "#36404a" : "" }}
    >
      <Skeleton variant="circular" sx={{ position: "absolute", top: "0" }}>
        <Avatar />
      </Skeleton>

      <Skeleton
        variant="rectangular"
        sx={{ py: "1.5rem", px: "2rem", borderRadius: "0.5rem" }}
      >
        <div></div>
      </Skeleton>
    </div>
  );
}
