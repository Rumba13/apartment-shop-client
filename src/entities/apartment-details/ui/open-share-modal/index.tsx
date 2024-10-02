import "./styles.scss";
import {Button} from "../../../../shared/ui/button";
import ShareIcon from "../../../../assets/images/share.svg";
import {useTypedTranslation} from "../../../../app/i18n/use-typed-translation";

export function OpenShareModal() {
    const {t} = useTypedTranslation();

    return <Button className="open-share-modal" icon={ShareIcon} onClick={() => {}} title={t("Share")}/>
}