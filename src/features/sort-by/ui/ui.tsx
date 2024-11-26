import "./styles.scss";
import { SelectOption } from "../../../shared/api/types/select-option";
import { observer } from "mobx-react";
import { SortBy as SortByType } from "../../../shared/api/types/sort-by";
import { Select } from "antd";
import { sortByStore } from "../model/sort-by-store";
import { useTranslation } from "react-i18next";

export const SortBy = observer(() => {
   const { t } = useTranslation();

   const options: SelectOption<SortByType>[] = [
      { value: "price:asc", label: t("Price Low To High") },
      { value: "price:desc", label: t("Price High To Low") },
   ];

   return <Select className="sort-by" onChange={sortBy => sortByStore.setSelectedSortBy(sortBy)} defaultValue={options[0].value} options={options} />;
});
