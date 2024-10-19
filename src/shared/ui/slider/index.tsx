import "./styles.scss"
import {Navigation, Pagination} from "swiper/modules";
import {ReactNode} from "react";
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination';
import {Swiper, SwiperSlide} from "swiper/react";


type PropsType = {
    items: ReactNode[];
    loop?:boolean
}

export function Slider({items, loop = false}: PropsType) {
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            loop
            navigation={{prevEl: ".swiper-button-prev", nextEl: ".swiper-button-next"}}
            pagination={{type: "bullets", clickable: true, el: ".swiper-pagination"}}
        >
            <div className="swiper-pagination"></div>
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
            {/*TODO key*/}
            {items}
        </Swiper>
    )
}