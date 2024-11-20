import "./styles.scss";
import { SvgIcon } from "../svg-icon";

type PropsType = {
   icon: any;
   title: string | number;
   subTitle: string;
};

export function IconWithTwoTitles({ icon, subTitle, title }: PropsType) {
   return (
      <div className="icon-with-two-titles">
         <SvgIcon icon={icon} asImage />

         <div className="titles-wrapper">
            <h3 className="title">{title}</h3>
            <h4 className="sub-title">{subTitle}</h4>
         </div>
      </div>
   );
}
