import "./styles.scss";
import { Skeleton } from "antd";

type PropsType = {}

export function OrderApartmentFormSkeleton({}: PropsType) {
   return <div className="order-apartment-form-skeleton">
      <div className="container">
         <Skeleton.Input active style={{height: 126}} />
         <Skeleton.Input active style={{height: 153}} />
         <Skeleton.Input active style={{height: 230}} />
         <Skeleton.Input active style={{height: 116}} />
         <Skeleton.Input active style={{height: 158}} />
      </div>
      <div className="aside-skeleton">
         <Skeleton.Input active />
      </div>

   </div>;
}
