import {serverConnection} from "./server-connection";

class DescriptionItemService {

    public async loadAllDescriptionIcons() {
        return (await serverConnection.get("/apartments/rule-icons")).data;
    }
}

export const descriptionItemService = new DescriptionItemService();