import {makeAutoObservable} from "mobx";

class FilterByAreaStore {
    constructor() {
        makeAutoObservable(this)
    }

    public minAreaBound = 0;
    public maxAreaBound = 0;

    public setAreaBounds = (minAreaBound: number, maxAreaBound: number) => {
        this.minAreaBound = minAreaBound;
        this.maxAreaBound = maxAreaBound;
        this.removeFilter()
    }

    public minArea = this.minAreaBound;
    public maxArea = this.maxAreaBound;

    public setMaxArea = (maxArea: number) => {this.maxArea = maxArea}
    public setMinArea = (minArea: number) => {this.minArea = minArea}

    public removeFilter() {
        this.setMaxArea(this.maxAreaBound);
        this.setMinArea(this.minAreaBound);
    }
}

export const areaFilterStore= new FilterByAreaStore()