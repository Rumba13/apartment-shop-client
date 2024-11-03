import './styles.scss';
import {MinimalLayout} from "../../minimal-layout";
import React from "react";
import {Form, Formik} from "formik";
import {TariffField} from "../../../features/tariff-field";
import {PriceField} from "../../../features/price-field";
import {AmenitiesField} from "../../../features/amenities-field";

export function DevPage() {
    return (
        <MinimalLayout className={"dev-page"}>
            <Formik initialValues={{tariff: "", price: null, amenities: []}}
                    onSubmit={console.log}>{() =>
                <Form>
                    <TariffField label="Tariff"
                                 name="tariff"/>
                    <PriceField label={"price"}
                                name={"price"}/>
                    <AmenitiesField label={"amenities"}
                                    name={"amenities"}/>
                    <button className="submit-button"
                            type="submit">Submit
                    </button>
                </Form>}</Formik>

        </MinimalLayout>
    )
}
