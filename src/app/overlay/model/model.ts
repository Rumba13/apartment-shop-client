import {makeAutoObservable} from 'mobx';
import {getScrollWidth} from "../../../shared/ui/get-scroll-width";

class OverlayStore {
    public isOverlayOpened = false;
    private scrollWidth: number = getScrollWidth();

    constructor() {
        makeAutoObservable(this);
    }

    public isAnimating: boolean = false;
    private setIsAnimating = (isAnimating: boolean) => {
        this.isAnimating = isAnimating
        document.body.classList.toggle('animating-scroll', this.isOverlayOpened);
    }
    public updateScrollWidth = () => {
        this.scrollWidth = getScrollWidth()
        document.body.style.setProperty('--scroll-width', this.scrollWidth + "px");
    };

    public onAnimationEnd = () => {
        this.setIsAnimating(true)
        this.updateScrollWidth()
        document.body.classList.toggle('hide-scroll', this.isOverlayOpened);
    }

    public setIsOverlayOpened(isOverlayOpened: boolean) {
        this.isOverlayOpened = isOverlayOpened;
        this.setIsAnimating(isOverlayOpened);
    }
}

export const overlayStore = new OverlayStore();
