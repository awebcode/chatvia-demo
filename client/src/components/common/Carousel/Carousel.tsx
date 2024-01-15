import "swiper/css";
import "./Carousel.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  fetchGroupInformationSuccess,
  onOpenConversation,
  onSelectedPartner,
  selectMode,
} from "../../../features/dashboard/dashboardSlice";
import { useAppDispatch, useAppSelector } from "../../../app/store";

import { AvatarBadge } from "../Avatar/AvatarBadge";
import { CarouselItemLoader } from "../Loader/CarouselLoader";
import { UserProfile } from "../../../models";

export interface ICarouselProps {
  option: UserProfile[] | undefined;

  isFetching?: boolean;
}

export function Carousel({ option, isFetching }: ICarouselProps) {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(selectMode);

  const onClick = (id: string) => {
    dispatch(onSelectedPartner(id));
    dispatch(onOpenConversation(true));
    dispatch(fetchGroupInformationSuccess(null));
  };

  return (
    <Swiper
      spaceBetween={15}
      slidesPerView={3}
      onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
      className="carousel"
    >
      {option?.map((user, key) => {
        return (
          <SwiperSlide key={key} onClick={() => onClick(user._id!)}>
            {isFetching ? (
              <CarouselItemLoader isFetching={isFetching} />
            ) : (
              <div
                className={`carousel-item relative rounded-2xl flex-center p-2 flex-col w-[80px] h-[60px] `}
                style={{ background: mode === "dark" ? "#36404a" : "" }}
              >
                <AvatarBadge status="online" avatar={user.avatar!} />
                <h5
                  className={`font-medium text-sm truncate w-full ${mode === "dark" ? "text-white" : ""
                    }`}
                >
                  {user.username}{" "}
                </h5>
              </div>
            )}{" "}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
