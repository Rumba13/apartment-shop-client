import {CONSTANTS} from "./constants";

export function setPhotosAbsolutePath(photos: string[]) {
    for (let i = 0; i < photos.length; i++) {
        photos[i] = CONSTANTS.IMAGE_SERVER_URL + photos[i];
    }
}