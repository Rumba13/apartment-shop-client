import "./styles.scss"
import {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker, reactify} from '../../../app/ymap';
import type {YMapLocationRequest} from 'ymaps3';

const LOCATION: YMapLocationRequest = {
    center: [37.588144, 55.733842],
    zoom: 9
};

export function Map() {
    return <YMap location={reactify.useDefault(LOCATION)}>
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />

        <YMapMarker coordinates={reactify.useDefault([37.588144, 55.733842])} draggable={true}>
            <section>
                <h1>You can drag this header</h1>
            </section>
        </YMapMarker>
    </YMap>
}