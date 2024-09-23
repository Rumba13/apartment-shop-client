import {makeAutoObservable} from "mobx";
import {Tag} from "../../../shared/api/types/tag";

class SelectTagsStore {
    constructor() {
        makeAutoObservable(this)
    }

    public selectedTags: { [key in string]: boolean } = {}

    public tags: Tag[] = []

    public setTags = (tags: Tag[]) => {
        this.tags = tags

        this.selectedTags = {};

        for (let i = 0; i < tags.length; i++) {
            this.selectedTags[tags[i]] = false;
        }
    };

    public toggleIsTagSelected = (tagName: string) => {
        this.selectedTags = {...this.selectedTags}
        this.selectedTags[tagName] = !this.selectedTags[tagName];
    };
    public getSelectedTagsNames() {
        const selectedTagsNames:string[] = []

        for (const selectedTagName in this.selectedTags) {

            if(this.selectedTags[selectedTagName]) {
                selectedTagsNames.push(selectedTagName);
            }
        }

        return selectedTagsNames;
    }
}

export const tagsStore = new SelectTagsStore()