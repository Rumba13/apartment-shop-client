import {Tag} from "./types/tag";
import {serverConnection} from "./server-connection";

class TagsService {
    constructor() {


    }

    public async loadTags(): Promise<Tag[]> {
        return (await serverConnection.get("apartments/amenities")).data
    }
}

    export
    const
    tagsService = new TagsService()