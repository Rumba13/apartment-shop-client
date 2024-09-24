import {makeAutoObservable} from "mobx";

class FilterByAreaStore {
    constructor() {
        makeAutoObservable(this)
    }

    public readonly lowerAreaBound = 25;
    public readonly upperAreaBound = 175;

    public minArea = this.lowerAreaBound;
    public maxArea = this.upperAreaBound;

    public setMaxArea = (maxArea: number) => {this.maxArea = maxArea}
    public setMinArea = (minArea: number) => {this.minArea = minArea}

    public removeFilter() {
        this.setMaxArea(this.upperAreaBound);
        this.setMinArea(this.lowerAreaBound);
    }
}

export const areaFilterStore= new FilterByAreaStore()