import "./styles.scss";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import { ReactNode, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper } from "swiper/react";
import clsx from "clsx";

type PropsType = {
   items: ReactNode[];
   loop?: boolean;
   withThumbs?: boolean;
   className?: string;
};

export function Slider({ items, loop = false, withThumbs = true, className }: PropsType) {
   const [thumbsSwiper, setThumbsSwiper] = useState(null);
   const [sliderSwiper, setSliderSwiper] = useState(null);

   const thumbsSlidersPerView = 5;

   return (
      <div className={clsx("slider-wrapper", className)}>
         {withThumbs && (
            <Swiper
               className="thumbs"
               spaceBetween={10}
               onSwiper={setThumbsSwiper}
               modules={[Navigation, Pagination, Thumbs]}
               slidesPerView={thumbsSlidersPerView}
               direction={"vertical"}
               //@ts-ignore
               onNavigationNext={swiper => {
                  //@ts-ignore
                  sliderSwiper?.slideTo(swiper.activeIndex);
                  swiper.slideTo(swiper.activeIndex);
               }}
               //@ts-ignore
               onNavigationPrev={swiper => {
                  //@ts-ignore
                  sliderSwiper?.slideTo(swiper.activeIndex);
                  swiper.slideTo(swiper.activeIndex);
               }}
               navigation={{
                  prevEl: ".thumbs-prev",
                  nextEl: ".thumbs-next",
               }}>
               <div className="swiper-button-prev thumbs-prev"></div>
               <div className="swiper-button-next thumbs-next"></div>
               {items}
            </Swiper>
         )}

         <Swiper
            className="slider"
            onSwiper={setSliderSwiper}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Navigation, Pagination, Thumbs, FreeMode]}
            slidesPerView={1}
            spaceBetween={20}
            loop={loop}
            navigation={{ prevEl: ".slider-prev", nextEl: ".slider-next" }}
            pagination={{
               type: "bullets",
               clickable: true,
               el: ".swiper-pagination",
            }}>
            <div className="swiper-pagination"></div>
            <div className="swiper-button-prev slider-prev"></div>
            <div className="swiper-button-next slider-next"></div>
            {/*TODO key*/}
            {items}
         </Swiper>
      </div>
   );
}
