import {Tag} from "./types/tag";

class TagsService {
    constructor() {


    }

    public async loadTags():Promise<Tag[]> {
        return [
            "Холодильник",
            "Газовая плита",
            "Электроплита",
            "Электрочайник",
            "Блендер",
            "Кофеварка",
            "Микроволновая печь",
            "Столовые приборы",
            "Тостер",
            "Посудомоечная машина",
        ]
    }
}

export const tagsService= new TagsService()