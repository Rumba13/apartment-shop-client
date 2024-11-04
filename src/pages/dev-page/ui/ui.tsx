import './styles.scss';
import {MinimalLayout} from "../../minimal-layout";
import React from "react";
import {Form, Formik} from "formik";
import {TariffField} from "../../../features/tariff-field";
import {PriceField} from "../../../features/price-field";
import {AmenitiesField} from "../../../features/amenities-field";
import {FieldNumber} from "../../../shared/ui/field-number";
import {AmenitiesGroupField} from "../../../features/amenities-group-field";
import {RangePickerDropdown} from "../../../shared/ui/range-picker";

export function DevPage() {
    return (
        <MinimalLayout className={"dev-page"}>
            <Formik initialValues={{tariff: "", price: null, amenities: [], guests: 0, amenityGroups: {}}}
                    onSubmit={(values) => {
                        const newAmenityGroups = []

                        for (const groupName in values.amenityGroups) {
                            //@ts-ignore
                            newAmenityGroups.push({name: groupName, amenities: values.amenityGroups[groupName]})
                        }
                        console.log(newAmenityGroups);
                    }}>{() =>
                <Form>
                    <TariffField label="Tariff"
                                 name="tariff"/>
                    <PriceField label={"price"}
                                name={"price"}/>
                    <AmenitiesField label={"amenities"}
                                    name={"amenities"}/>
                    <FieldNumber name="guests"
                                 label={"guests"}
                                 min={0}
                                 max={10}/>
                    <AmenitiesGroupField name="amenityGroups"/>
                    <button className="submit-button"
                            type="submit">Submit
                    </button>

                    <RangePickerDropdown renderInId={"a"}/>
                </Form>}
            </Formik>
            <div id="a">
            </div>
        </MinimalLayout>
    )
}
