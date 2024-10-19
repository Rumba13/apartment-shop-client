import {makeAutoObservable, runInAction} from "mobx";
import {Tag} from "../../../shared/api/types/tag";
import {tagsService} from "../../../shared/api/tags-service";

class SelectTagsStore {
    constructor() {
        makeAutoObservable(this)
    }

    public selectedTags: { [key in string]: boolean } = {}

    public tags: Tag[] = []

    private _setTags = (tags: Tag[]) => this.tags = tags;
    private _setSelectedTags = (tags: { [key in string]: boolean }) => this.selectedTags = tags;
    public isLoading: boolean = false;
    public setIsLoading = (isLoading: boolean) => this.isLoading = isLoading;

    public async loadTags() {
        this.setIsLoading(true);

        try {
            let tags = await tagsService.loadTags();
            tags = tags.filter(tag => tag != "")
            this._setTags(tags)
        } catch (err) {
            console.log(err)
        } finally {
            this.setIsLoading(false);
        }
    }

    public setTags = (tags: Tag[]) => {
        this._setTags(tags);
        this._setSelectedTags({})

        for (let i = 0; i < tags.length; i++) {
            this.selectedTags[tags[i]] = false;
        }
    };

    public toggleIsTagSelected = (tagName: string) => {
        this._setSelectedTags({...this.selectedTags})
        this.selectedTags[tagName] = !this.selectedTags[tagName];
    };

    public getSelectedTagsNames() {
        const selectedTagsNames: string[] = []

        for (const selectedTagName in this.selectedTags) {
            if (this.selectedTags[selectedTagName]) {
                selectedTagsNames.push(selectedTagName);
            }
        }

        return selectedTagsNames;
    }

    public removeFilter() {
        runInAction(() => {
            this.selectedTags = {};
        })
    }

}

export const tagsFilterStore = new SelectTagsStore()