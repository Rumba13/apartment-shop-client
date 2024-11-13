import "./styles.scss";
import {observer} from "mobx-react";
import React, {useEffect, useState} from "react";
import {tagsService} from "../../../shared/api/tags-service";
import {AmenitiesField} from "../../amenities-field";
import {Button} from "../../../shared/ui/button";
import {AdminButton} from "../../../shared/ui/admin-button";
import {ButtonCool} from "../../../shared/ui/button-cool";
import {Field} from "../../../shared/ui/field/ui";

type PropsType = {
    name: string,
    _newAmenityGroup: string

}

export const SelectAmenitiesGroupForm = observer(({name, _newAmenityGroup}: PropsType) => {
    const [amenityGroups, setAmenityGroups] = useState<string[] | null>(null);

    useEffect(() => {
        tagsService.loadTagGroups().then(tagGroups => setAmenityGroups(tagGroups))
    }, []);

    if (amenityGroups === null) return <></>

    return <>
        {amenityGroups.map(group => <AmenitiesField name={`${name}.` + group}
                                                    label={group}/>)}

        <div className="wrapper">

            <Field className="add-amenities-field" name="_newAmenityGroup" placeholder="Добавить новую группу"
                   button={<ButtonCool onClick={() => {
                       setAmenityGroups([...amenityGroups, _newAmenityGroup])
                   }}>Добавить</ButtonCool>}
                   label="Название группы"/>
            {/*<ButtonCool className="add-amenities-group-button">*/}
            {/*    +*/}
            {/*</ButtonCool>*/}
        </div>
    </>
})