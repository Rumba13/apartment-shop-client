import "./styles.scss";
import ImageNotFound from "../../../../assets/images/no-image.jpg";
import React from "react";
import { Slider } from "../../../../shared/ui/slider";
import { SwiperSlide } from "swiper/react";

type PropsType = {
   images: string[];
};

export function ApartmentDetailsSlider({ images }: PropsType) {
   const slides = (!images[0] ? [ImageNotFound] : images).map(image => (
      <SwiperSlide key={image}>
         <img src={image} alt=""></img>
      </SwiperSlide>
   ));

   return <Slider className="apartment-details-slider" loop items={slides} />;
}
