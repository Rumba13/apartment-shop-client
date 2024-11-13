import './styles.scss';
import {MinimalLayout} from "../../minimal-layout";
import React from "react";
import {AddApartmentToFavorites} from "../../../features/APARTMENT/add-apartment-to-favorites";
import {TagField} from "../../../features/tag-field";
import {Form, Formik} from "formik";

export function DevPage() {
    return (
        <MinimalLayout className={"dev-page"}>
            DevPage

            <Formik initialValues={{rules:[]}} onSubmit={console.log}>
                <Form>
                    <TagField name={"rules"} label={"Tags"}/>
                </Form>
            </Formik>

        </MinimalLayout>
    )
}
