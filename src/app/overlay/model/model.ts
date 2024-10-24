import {makeAutoObservable} from 'mobx';

class OverlayStore {
    public isOverlayOpened = false;

    constructor() {
        makeAutoObservable(this);
    }

    public isAnimating: boolean = false;
    private setIsAnimating = (isAnimating: boolean) => {
        this.isAnimating = isAnimating
        document.body.classList.toggle('animating-scroll', this.isOverlayOpened);
    }

    public onAnimationEnd = () => {
        this.setIsAnimating(true)
        document.body.classList.toggle('hide-scroll', this.isOverlayOpened);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }

    public setIsOverlayOpened(isOverlayOpened: boolean) {
        this.isOverlayOpened = isOverlayOpened;
        this.setIsAnimating(isOverlayOpened);
    }
}

export const overlayStore = new OverlayStore();
