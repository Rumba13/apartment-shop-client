import "./styles.scss";
import { SelectOption } from "../../../shared/api/types/select-option";
import { observer } from "mobx-react";
import { SortBy as SortByType } from "../../../shared/api/types/sort-by";
import { useTypedTranslation } from "../../../app/i18n/use-typed-translation";
import { Select } from "antd";
import { sortByStore } from "../model/sort-by-store";

export const SortBy = observer(() => {
   const { t } = useTypedTranslation();

   const options: SelectOption<SortByType>[] = [
      { value: "price:asc", label: t("Price Low To High") },
      { value: "price:desc", label: t("Price High To Low") },
      { value: "popularity:asc", label: t("Popularity Low To High") },
      { value: "popularity:desc", label: t("Popularity High To Low") },
   ];

   return <Select className="sort-by" onChange={sortBy => sortByStore.setSelectedSortBy(sortBy)} defaultValue={options[0].value} options={options} />;
});
