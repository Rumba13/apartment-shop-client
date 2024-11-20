import "./styles.scss";
import { Skeleton } from "antd";

export function ApartmentDetailsSkeleton() {
   return (
      <div className="apartment-details-skeleton">
         <div className="skeleton-top">
            <div className="skeleton-slider">
               <div className="thumbs">
                  <Skeleton.Input active />
                  <Skeleton.Input active />
                  <Skeleton.Input active />
                  <Skeleton.Input active />
                  <Skeleton.Input active />
               </div>

               <Skeleton.Input className="skeleton-slides" active />
            </div>
            <Skeleton.Input className="skeleton-block" active />
         </div>
         <Skeleton.Input className="skeleton-tab" active />

         <Skeleton active />
      </div>
   );
}
