import {Tag} from "./types/tag";
import {serverConnection} from "./server-connection";

class TagsService {
    constructor() {


    }

    public async loadTags(): Promise<Tag[]> {
        return (await serverConnection.get("apartments/amenities")).data
    }
    public async loadTagGroups(): Promise<string[]> {
        return (await serverConnection.get("apartments/amenity-groups")).data
    }
}

export const tagsService = new TagsService()