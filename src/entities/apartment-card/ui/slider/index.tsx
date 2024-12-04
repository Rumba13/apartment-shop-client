import "./styles.scss";
import ImageNotFound from "../../../../assets/images/no-image.jpg";
import { Link } from "react-router-dom";
import React from "react";
import { UUID } from "../../../../shared/api/types/uuid";
import { Slider } from "../../../../shared/ui/slider";
import { SwiperSlide } from "swiper/react";
import { ROUTES } from "../../../../shared/lib/routes";

type PropsType = {
   images: string[];
   apartmentId: UUID;
};

export function ApartmentCardSlider({ images, apartmentId }: PropsType) {
   const slides = (!images[0] ? [ImageNotFound] : images).map(image => (
      <SwiperSlide key={image}>
         <Link to={`${ROUTES.APARTMENT_DETAILS}/${apartmentId}`}>
            <img src={image} alt=""></img>
         </Link>
      </SwiperSlide>
   ));
   return <Slider withThumbs={false} items={slides} />;
}
