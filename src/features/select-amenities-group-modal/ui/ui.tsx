import "./styles.scss";
import {Modal} from "../../../shared/ui/modal";
import {observer} from "mobx-react";
import {selectAmenitiesGroupModalStore} from "../model/select-amenities-group-modal-store";
import {SelectAmenitiesGroupForm} from "../../select-amenities-group-form";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";

type PropsType = {
    name: string,
    _newAmenityGroup:string
}

export const SelectAmenitiesGroupModal = observer(({name,_newAmenityGroup}: PropsType) => {
    const {t} = useTypedTranslation()

    return <Modal title={t("Select Amenities")} className="select-amenities-group-modal"
        modalStore={selectAmenitiesGroupModalStore}
    >
        <SelectAmenitiesGroupForm name={name} _newAmenityGroup={_newAmenityGroup}/>
    </Modal>
})