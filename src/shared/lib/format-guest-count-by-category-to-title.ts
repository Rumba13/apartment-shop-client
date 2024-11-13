import {GuestsCountByCategory} from "../api/types/guests-count-by-category";
import {t} from "i18next";

export function formatGuestCountByCategoryToTitle({adultCount, kidCount, babyCount, teenCount}: GuestsCountByCategory) {
    const totalChildrenCount = kidCount + babyCount + teenCount

    let title = `${adultCount} ${t("Adult", {count: adultCount})}`;

    title += `, ${totalChildrenCount} ${t("Kid", {count: totalChildrenCount})}`

    return title;
}