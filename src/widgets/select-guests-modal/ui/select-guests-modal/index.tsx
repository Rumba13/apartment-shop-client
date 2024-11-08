import "./styles.scss";
import {Modal} from "../../../../shared/ui/modal";
import {selectGuestModalStore} from "../../model/select-guest-modal-store";
import {SelectGuestsForm} from "../../../../features/select-guests";
import {useState} from "react";
import {GuestsCountByCategory} from "../../../../shared/api/types/guests-count-by-category";
import {Form, Formik} from "formik";

type PropsType = {
    onNextButtonClick?: (guests: GuestsCountByCategory) => void
}

type ValuesType = GuestsCountByCategory;

const initialValues: ValuesType = {
    babyCount: 0,
    teenCount: 0,
    kidCount: 0,
    adultCount: 1,
    petCount: 0
}

export function SelectGuestsModal({onNextButtonClick}: PropsType) {

    return <Modal title=""
                  className={"select-guest-modal"}
                  modalStore={selectGuestModalStore}
    >
        <Formik initialValues={initialValues}
                onSubmit={() => {
                }}>
            {({values}) => <Form>
                <SelectGuestsForm values={values}
                                  noPrice
                                  maxGuestCount={Infinity}
                                  onNextButtonClick={() => {
                                      selectGuestModalStore.setIsOpened(false)
                                      onNextButtonClick?.(values)
                                  }}/>
            </Form>}
        </Formik>


    </Modal>
}