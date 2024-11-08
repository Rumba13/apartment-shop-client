import "./styles.scss"
import {Placemark, Map as YMAP, YMaps, ZoomControl, FullscreenControl, RulerControl} from "@pbe/react-yandex-maps";
import {useEffect, useState} from "react";
import {YMapsApi} from "@pbe/react-yandex-maps/typings/util/typing";

type PropsType = {
    address: string
}

export function Map({address}: PropsType) {
    const [coordinates, setCoordinates] = useState<number[]>([52.430358, 30.99382]);
    const [ymapsApi, setYmapsApi] = useState<YMapsApi | null>(null);

    useEffect(() => {
        ymapsApi?.geocode(address)
            .then((res) => {
                //@ts-ignore
                const coordinates: number[] = res.geoObjects.get(0).geometry.getCoordinates()
                setCoordinates(coordinates)
            })
    }, [address]);

    return <div className="map">
        <YMaps query={{apikey: "20c277cb-5d76-4dbd-9f47-66fd833f5afc"}}>
            <YMAP state={{center: coordinates, zoom: 14,}}
                  options={{suppressMapOpenBlock: true}}
                  style={{width: '100%', aspectRatio: 16 / 9}}
                  modules={["geolocation", "geocode"]}
                  onLoad={(ymaps) => setYmapsApi(ymaps)}
            >
                <Placemark geometry={coordinates}
                           properties={{iconCaption: address}}/>
                <FullscreenControl options={{position: {right: 5, top: 5}}}/>
                <RulerControl options={{position: {left: 5, bottom: 5}}}/>
                <ZoomControl options={{position: {left: 5, top: 5}, size: "small"}}/>
            </YMAP>
        </YMaps>
    </div>
}