import './styles.scss';
import clsx from "clsx";

export type Props = {
 className?: string;
}

export function SelectCityDropdown({className}:Props) {
 return <div className={clsx("select-city-dropdown", className)}>
Select city
 </div>
}
