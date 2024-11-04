import "./styles.scss";
import {observer} from "mobx-react";
import {useEffect, useState} from "react";
import {tagsService} from "../../../shared/api/tags-service";
import {AmenitiesField} from "../../amenities-field";

type PropsType = {
    name: string
}

export const SelectAmenitiesGroupForm = observer(({name}:PropsType) => {
    const [amenityGroups, setAmenityGroups] = useState<string[] | null>(null);

    useEffect(() => {
        tagsService.loadTagGroups().then(tagGroups => setAmenityGroups(tagGroups))
    }, []);

    if (amenityGroups === null) return <></>

    return <>
        {amenityGroups.map(group => <AmenitiesField name={`${name}.` + group}
                                                    label={group}/>)}
    </>
})