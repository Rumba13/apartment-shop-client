import "./styles.scss";
import {Modal} from "../../../shared/ui/modal";
import {observer} from "mobx-react";
import {selectAmenitiesGroupModalStore} from "../model/select-amenities-group-modal-store";
import {SelectAmenitiesGroupForm} from "../../select-amenities-group-form";

type PropsType = {
    name: string
}

export const SelectAmenitiesGroupModal = observer(({name}: PropsType) => {
    return <Modal title={"Select Amenities Group Modal"}
                  className="select-amenities-group-modal"
        modalStore={selectAmenitiesGroupModalStore}
    >

        <SelectAmenitiesGroupForm name={name}/>
    </Modal>
})