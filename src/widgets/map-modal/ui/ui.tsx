import "./styles.scss";
import { Map } from "../../../shared/ui/map";
import React from "react";
import { Modal } from "../../../shared/ui/modal";
import { mapModalStore } from "../model/map-modal-store";
import { observer } from "mobx-react";
import { useTypedTranslation } from "../../../app/i18n/use-typed-translation";

type PropsType = {};

export const MapModal = observer(({}: PropsType) => {
   const { t } = useTypedTranslation();

   return (
      <Modal title={t("On Map")} className="map-modal" modalStore={mapModalStore}>
         <Map address={mapModalStore.address} />
      </Modal>
   );
});
