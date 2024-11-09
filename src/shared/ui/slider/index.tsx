import "./styles.scss"
import {FreeMode, Navigation, Pagination, Thumbs} from "swiper/modules";
import {ReactNode, useState} from "react";
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination';
import {Swiper} from "swiper/react";

type PropsType = {
    items: ReactNode[];
    loop?: boolean,
    withThumbs?: boolean
}

export function Slider({items, loop = false, withThumbs = true}: PropsType) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return <div className="slider-wrapper">
        {withThumbs && <Swiper className="thumbs"
                               spaceBetween={10}
                               onSwiper={setThumbsSwiper}
                               modules={[Navigation, Pagination, Thumbs]}
                               direction={"vertical"}
                               slidesPerView={5}>
            {items}
        </Swiper>}


        <Swiper className="slider"
                thumbs={{swiper: thumbsSwiper}}
                modules={[Navigation, Pagination, Thumbs, FreeMode]}
                slidesPerView={1}
                spaceBetween={20}
                loop={loop}
                navigation={{prevEl: ".swiper-button-prev", nextEl: ".swiper-button-next"}}
                pagination={{type: "bullets", clickable: true, el: ".swiper-pagination"}}
        >
            <div className="swiper-pagination"></div>
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
            {/*TODO key*/}
            {items}
        </Swiper>
    </div>
}